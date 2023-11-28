const cors = require("cors");
const express = require("express");
const createHttpError = require("http-errors");

const app = express();

// Middleware to parse incoming requests as JSON
app.use(express.json({ limit: "10mb" }));

// Middleware to parse URL-encoded data from form submissions
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Setup Cors
const corsOption = {
  origin: "*",
  methods: "GET,OPTIONS,POST,PUT,PATCH,DELETE",
  credentials: true,
};

app.use(cors(corsOption));

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Default route and handler
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello From Express App...",
  });
});

// Setup routes

// Error handling for unknown routes
app.use(() => {
  throw createHttpError(404, "Route not found!");
});

const errorHandler = (err, req, res, next) => {
  console.error("err.message", err?.message);
  // console.error("err.statusCode", err?.statusCode);

  if (res.headersSent) return next(err);

  res
    .status(500)
    .json({ status: "error", message: err.message || "An Unknown Error!" });
};

app.use(errorHandler);

module.exports = app;
