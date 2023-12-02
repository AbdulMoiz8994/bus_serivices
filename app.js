const cors = require("cors");
const createHttpError = require("http-errors");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

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

// Setup for file uploading
app.use(
  fileUpload({
    // debug: true,
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "./tmp"),
  })
);

// Default route and handler
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello From Express App...",
  });
});

// Setup routes
app.use("/api/v1/contacts", require("./routes/contactRoutes"));
app.use("/api/v1/cruisePackages", require("./routes/cruisePackageRoutes"));
app.use(
  "/api/v1/northPoleExpressPackages",
  require("./routes/northPoleExpressPackageRoutes")
);
app.use(
  "/api/v1/groupsAndCharters",
  require("./routes/groupsAndChartersRoutes")
);
app.use("/api/v1/packages", require("./routes/packageRoutes"));
app.use(
  "/api/v1/attractionPassPackages",
  require("./routes/attractionPassPackageRoutes")
);

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
