import { config as configDotenv } from 'dotenv';
configDotenv(); // phải gọi ngay sau khi import dotenv

import mongoose from 'mongoose';
import scriptDB from './scriptDB.js';

const DB_CONNECT_STRING = process.env.DB_CONNECT_STRING;

const connectDB = async () => {
  mongoose
    .connect(DB_CONNECT_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      scriptDB(); 
      console.log("💻 MongoDB Connected");
    })
    .catch(err => console.error("❌ MongoDB connection error:", err));
};

export default connectDB;
