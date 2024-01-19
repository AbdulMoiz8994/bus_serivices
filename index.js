const http = require("http");
const logger = require("morgan");
const cors = require("cors");
const createHttpError = require("http-errors");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const { Client, Environment } = require("square");
const { randomUUID } = require("crypto");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");




const app = express();

// Load environment variables
dotenv.config();
const server = http.createServer(app);

// console.log("process.env >>>>>", process.env);

app.use(express.json({ limit: "10mb" }));

// Middleware to parse URL-encoded data from form submissions
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Setup Cors
const corsConfig = {
  origin: 'https://travelapp-m1iq.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsConfig));




// const app = require("./app");
const { connectDB } = require("./config/db");


const runningEnvironment = process.env.NODE_ENV;

if (runningEnvironment === "development") {
  app.use(logger("dev"));
}


const { paymentsApi } = new Client({
  accessToken: process.env.ACCESS_TOKEN,
  environment: "production",
});

app.all("/*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://travelapp-m1iq.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
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

const generateSecureRandomNumber = (length) => {
  if (length % 2 !== 0) {
    throw new Error("Length must be an even number");
  }

  const uuid = uuidv4();
  const randomNumber = parseInt(uuid.slice(0, length), 16);

  return randomNumber;
};

const generateSecureTicket = () => {
  const ticketId = generateSecureRandomNumber(4);
  const ticketNumber = generateSecureRandomNumber(10);

  return {
    ticketId: String(ticketId).padStart(4, "0"),
    ticketNumber: String(ticketNumber).padStart(10, "0"),
  };
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  // tls: {
  //   rejectUnauthorized: false,
  // },
});

const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

const sendEmail = (template, replacements, form, subject, email) => {
  console.log("replacements", replacements);

  readHTMLFile(
    `./public/confirm-ticket/${template}.html`,
    function (err, html) {
      var template = handlebars.compile(html);
      //   var replacements = {
      //     username: "ghous ahmed",
      //     locationDescription: "test",
      //   };
      var htmlToSend = template(replacements);

      const mailOptions = {
        form: `${form} <${process.env.MAIL_USER}>`,
        to: email,
        subject: subject, //"Awaiting Admin Approval",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error:", error.message);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }
  );
};

app.post("/pay", async (request, res) => {
  try {
    let body = request.body;
    console.log("Body", body);


    const { amount } = body;

    // Convert cents to dollars
    const amountInDollars = amount / 100;
      let realAmount=amountInDollars.toFixed(2);
      const numericAmount = Number(realAmount);

    let { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: body.sourceId,
      amountMoney: {
        currency: "USD",
        amount: numericAmount,
      },
    });
    const resultWithStrings = JSON.parse(
      JSON.stringify(result, (key, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      })
    );

    console.log("paymentsApi", resultWithStrings);
    if (resultWithStrings.payment.status == "COMPLETED") {
      const { ticketId, ticketNumber } = generateSecureTicket();
      // console.log("ticketId", ticketId, "ticketNumber", ticketNumber);
      sendEmail(
        "ticket-confirmation",
        {
          Message: "Congratulations, This is your Ticket ID and Ticket Number",
          TicketId: ticketId,
          TicketNub: ticketNumber,
          FirtName: body.formData.firstName,
          LastName: body.formData.lastName,
        },
        "Hop-on Hop-off",
        "Ticket Confirmation Status",
        body.formData.email
      );
    }
    return res
      .status(200)
      .json({ status: "Success", result: resultWithStrings });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// Setup routes
app.use("/api/v1/contacts", require("./routes/contactRoutes"));
app.use(
  "/api/v1/groupsAndCharters",
  require("./routes/groupsAndCharterRoutes")
);

app.use("/api/v1/packages", require("./routes/packageRoutes"));
app.use("/api/v1/orders", require("./routes/orderRoutes"));

app.use("/api/v1/password", require("./routes/auth"));

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









// Run server
const PORT = Number(process.env.PORT) || 8001;

// Connect to database
connectDB().then(() =>
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
);
