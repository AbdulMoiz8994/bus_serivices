const dotenv = require("dotenv");
const http = require("http");
const logger = require("morgan");

// Load environment variables
dotenv.config();

// console.log("process.env >>>>>", process.env);

const app = require("./app");
const { connectDB } = require("./config/db");

const server = http.createServer(app);

const runningEnvironment = process.env.NODE_ENV;

if (runningEnvironment === "development") {
  app.use(logger("dev"));
}

// Run server
const PORT = Number(process.env.PORT) || 8001;

// Connect to database
connectDB().then(() =>
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
);
