// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // const uri = "mongodb+srv://Ineuron:522595725@cluster0.noqizbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   }
// // });
// // async function run() {
// //   try {
// //     // Connect the client to the server	(optional starting in v4.7)
// //     await client.connect();
// //     // Send a ping to confirm a successful connection
// //     // await client.db("SourcingDB").command({ ping: 1 });
// //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //   } finally {
// //     // Ensures that the client will close when you finish/error
// //     await client.close();
// //   }

// //   try {
// //           await client.connect();
// //           const database = client.db('SourcingDB');
// //           const collection = database.collection('Recruiter A'); // Make sure this matches your collection name
  
// //           // Fetch the latest candidates
// //           const latestReport = await collection.findOne({}, { sort: { _id: -1 } });
// //          // Fetch multiple candidates
// //           if (latestReport) {
// //             console.log(latestReport);
// //           } else {
// //             console.log('No candidates found');
// //           }
// //         } catch (err) {
// //           console.error('Failed to fetch data from MongoDB', err);
// //           console.log('Error fetching candidates');
// //         } finally {
// //           await client.close();
// //         }
  
// // }
// // run().catch(console.dir);
const mongoose = require('mongoose');
const uri = "mongodb+srv://Ineuron:522595725@cluster0.noqizbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
  
}
run().catch(console.dir);