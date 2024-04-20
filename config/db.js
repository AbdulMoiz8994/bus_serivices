const mongoose = require("mongoose");
require("dotenv").config();

const runningEnvironment = process.env.NODE_ENV;

const MONGO_URI = process.env.DB_STRING;

exports.connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
     console.log(runningEnvironment);
     console.log(`Connected to database: ${connection.connections[0].host}`);
  } catch (error) {
    console.error("connectDB error", error);
    process.exit(1);
  }
};
