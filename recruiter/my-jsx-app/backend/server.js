// backend/server.js

const express = require('express');
const http = require('http');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { error } = require('console');
// const socketIo = require('socket.io');

const app = express();
// const server = http.createServer(app);
const port = 5000; 
// const io = socketIo(server,{
//     cors: {
//         origin: '*',  // Allow all origins for simplicity; adjust as needed
//         methods: ['GET', 'POST'],
//         allowedHeaders: ['Content-Type'],
//         credentials: true
//     }  
//     }
// );

// You can choose any available port


// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const uri = "mongodb+srv://Ineuron:522595725@cluster0.noqizbf.mongodb.net/SourcingDB?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectToMongoDB();

// Define API routes
app.get('/api/candidates', async (req, res) => {
  try {
    const collection = client.db('SourcingDB').collection('Recruiter A');
    // Fetch the latest report (document) from the collection
    const latestReport = await collection.findOne({}, { sort: { _id: -1 } });
    if (latestReport && latestReport.candidates) {
        // Return the list of candidates from the latest report
        res.json(latestReport.candidates);
        // io.emit('newCandidates', latestReport.candidates);
      } else {
        // If no report or no candidates, send an appropriate message
        res.status(404).json({ error: 'No candidates found in the latest report.' });
      }
 
} catch (error) {
  console.error('Error fetching candidates:', error);
  res.status(500).json({ error: 'Failed to fetch candidates' });

    
   
  } 
  
});

// io.on('connection', (socket) => {
//     console.log('A user connected');
    
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
