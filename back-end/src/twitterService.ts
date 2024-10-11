import Twit from 'twit';
import dotenv from 'dotenv';

dotenv.config();

const T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
    access_token: process.env.TWITTER_ACCESS_TOKEN as string,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
});


export function sendTweet(status: string) {
    return new Promise((resolve, reject) => {
        T.post('statuses/update', {status}, (err: any, data: any, response: any) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}
