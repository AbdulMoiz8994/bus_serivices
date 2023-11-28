const mongoose = require("mongoose");

const runningEnvironment = process.env.NODE_ENV;

const MONGO_URI = `${
  runningEnvironment === "development"
    ? process.env.DEV_DB_STRING
    : process.env.DB_STRING || ""
}`;

exports.connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI);

    runningEnvironment === "development"
      ? console.log(`Connected to database`)
      : console.log(`Connected to database: ${connection.connections[0].host}`);
  } catch (error) {
    console.error("connectDB error", error);
    process.exit(1);
  }
};
