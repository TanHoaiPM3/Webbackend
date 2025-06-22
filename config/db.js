const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed', err);
    process.exit(1);
  }
};

module.exports = connectDB;


//Cluster0
//tanhoai2013
//oJGNuT36NPTr3KHq
//mongosh "mongodb+srv://cluster0.bghgs48.mongodb.net/" --apiVersion 1 --username tanhoai2013 --password oJGNuT36NPTr3KHq
//mongodb+srv://tanhoai2013:oJGNuT36NPTr3KHq@cluster0.bghgs48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



