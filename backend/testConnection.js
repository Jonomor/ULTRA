import mongoose from 'mongoose';

const uri = "mongodb+srv://Jonomor:00000000@ultraplus-cluster.molqpdy.mongodb.net/ultraplus?retryWrites=true&w=majority&appName=ultraplus-cluster";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await mongoose.disconnect();
  }
}

run().catch(console.dir);
