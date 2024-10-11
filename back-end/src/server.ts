import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import  dotenv from 'dotenv';
import {PythonShell, Options} from 'python-shell';
import {Request, Response} from 'express';
import path from 'path';
import { authenticateToken } from './auth';
import { NextFunction } from 'express';
import { registerUser, loginUser } from './userService';
import { sendTweet } from './twitterService';
import { cacheData, getcacheData } from './cacheService';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;
app.use(express.json());

interface TweetAnalysis {
    original_tweet: string;
    analysis: string;
    screening: string;
    suggested_reply: string | null;
}

app.post('/api/register', async (req: Request, res: Response) => {
    try{
    const { username, password } = req.body;
    const token = await registerUser(username, password);
    res.json({ token });
    }
    catch(error){
        res.status(400).json({ error: (error as Error).message });
    }
})

async function analyzeTweetAndGenerateReply(tweetContent: string): Promise<TweetAnalysis>{
    try{
        const options: Options={
            mode: "text",
            pythonPath: "python",
            args: [tweetContent],
        };
        const scriptPath = path.join(__dirname, '..', 'autogen_services.py');
        const result = await PythonShell.run(scriptPath, options);
        return JSON.parse(result[0]) as TweetAnalysis;
    }
    catch(error){
        throw new Error('Failed to analyze tweet');
    }
}

async function fetchTweetsFromDatabase(){
    return Array.from({length: 100}, (_, i)=> ({
        id: i,
        text: `Sample tweet ${i}`,
        user: {
            name: `User${i}`,
            screen_name: `user${i}`,
        },
        created_at: new Date().toISOString(),
    }));
}

app.post('/api/login', async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body;
        const token = await loginUser(username, password);
        res.json({ token });
    }
    catch(error){
        res.status(400).json({ error: (error as Error).message });
    }
})

app.get('/api/tweets', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    const page= parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const cachedTweets = await getcacheData(`tweets_${page}_${limit}`);
    if (cachedTweets){
        return res.json(cachedTweets);
    }
    const allTweets = await fetchTweetsFromDatabase();
    const paginatedTweets= allTweets.slice(startIndex, endIndex);
    const result = {
        tweets: paginatedTweets,
        currentPage: page,
        totalPages: Math.ceil(allTweets.length / limit),

    }
    await cacheData(`tweets_${page}_${limit}`, result, 300);
    res.json(result);
});

app.post('/api/reply', authenticateToken, async (req: Request, res: Response) => {
const {tweetId, replyContent} = req.body;
try{
    const result= await sendTweet(replyContent);
    res.json({success: true, message: 'Reply sent successfully', result});

    }
    catch(error){
        res.status(500).json({error: (error as Error).message});
    }
});

app.post('/api/analyze-tweet', authenticateToken, async (req: Request, res: Response) => {
    const { tweetContent } = req.body;
    try{
        const analysis = await analyzeTweetAndGenerateReply(tweetContent);
        res.json({success: true, analysis});
    }
    catch(error){
        res.status(500).json({error: (error as Error).message});
    }
});

io.on('connection', (socket:any) => {
    console.log('New user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use('/api/tweets', authenticateToken);
app.use('/api/reply', authenticateToken);
app.use('/api/analyze-tweet', authenticateToken);


