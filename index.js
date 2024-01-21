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
  origin: 'https://travelapp-m1iq.vercel.app/',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options('*', cors(corsConfig));


app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "https://travelapp-m1iq.vercel.app/");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});


// app.all("/*", function (req, res, next) {
//   const allowedOrigins = ['http://localhost:3000', 'https://travelapp-m1iq.vercel.app'];
//   const origin = req.headers.origin;

//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }

//   res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//   res.header("Access-Control-Allow-Credentials", true);

//   next();

// });

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
  console.log("pathpathpath",path);
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      console.log("errerrerrerr",err);
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

const sendEmail = (template, replacements, form, subject, email) => {
  console.log("replacements", replacements, "template");

  // readHTMLFile(
  //   `./ticket.html`,
  //   function (err, html) {
  //     console.log('HTML Content:', html);

  //     if (err) {
  //       console.error('Error reading HTML file:', err);
  //       // Handle error (e.g., log, return, etc.)
  //       return;
  //     }
  //     var template = handlebars.compile(html);
  //     //   var replacements = {
  //     //     username: "ghous ahmed",
  //     //     locationDescription: "test",
  //     //   };
  //     var htmlToSend = template(replacements);


  //   }
  // );

  const mailOptions = {
    form: `${form} <${process.env.MAIL_USER}>`,
    to: email,
    subject: subject, //"Awaiting Admin Approval",
    html: `<!DOCTYPE HTML
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <style type="text/css">
        table,
        td {
            color: #555555;
        }

        a {
            color: #008ba4;
            text-decoration: underline;
        }
        .main-img{
            width: 600px;
        }

        @media only screen and (min-width: 620px) {
            .u-row {
                width: 600px !important;
            }

            .u-row .u-col {
                vertical-align: top;
            }

            .u-row .u-col-100 {
                width: 600px !important;
            }
        }
  
        @media (max-width: 620px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }

            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .u-row {
                width: calc(100% - 40px) !important;
            }

            .u-col {
                width: 100% !important;
            }

            .u-col>div {
                margin: 0 auto;
            }
            .main-img{
                width: 100%;
            }
            p{
                padding: 4px 0px !important;
            }
        }

        body {
            margin: 0;
            padding: 0;
        }

        table,
        tr,
        td {
            vertical-align: top;
            border-collapse: collapse;
        }

        p {
            margin: 0;
        }

        .ie-container table,
        .mso-container table {
            table-layout: fixed;
        }

        * {
            line-height: inherit;
        }

        a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
        }
    </style>
</head>

<body class="clean-body"
    style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #555555">
    <table
        style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%"
        cellpadding="0" cellspacing="0">
        <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <!-- <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <div
                                            style="padding: 0px;border-top: 1px solid #dfdfdf;border-left: 1px solid #dfdfdf;border-right: 1px solid #dfdfdf;border-bottom: 0px solid transparent;">
                                            <table style="font-family:helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:helvetica,sans-serif;"
                                                            align="left">
                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tr>
                                                                    <td style="padding-right: 0px;padding-left: 0px;"
                                                                        align="center"> <img align="center" border="0"
                                                                            src="https://firebasestorage.googleapis.com/v0/b/healthcare-rapid.appspot.com/o/Email-banner.png?alt=media&token=23eb957a-3bf1-475f-aa53-6b765769af88"
                                                                            alt="banner image"
                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 600px;"
                                                                            width="600" /> </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="background-color: #ffffff;width: 100% !important;">
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 1px solid #dfdfdf;border-right: 1px solid #dfdfdf;border-bottom: 0px solid transparent;">
                                            <table style="font-family:helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;"
                                                            align="left">
                                                            <div
                                                                style="color: #383f51; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p
                                                                    style="font-size: 14px; line-height: 140%; text-align: center;">
                                                                    <span
                                                                        style="font-size: 26px; line-height: 36.4px;"><strong>OTP Email</strong></span>
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                     <img class="main-img" src="https://res.cloudinary.com/dc1181txe/image/upload/v1705589363/helsinki_bus_1_ay2ml1.jpg" alt="hop-on hop-off">
                    </div>
                    </div>
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                    
                        <table style="font-family:helvetica,sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                            <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;"
                                    align="left">
                                    <div
                                        style="color: #383f51; line-height: 140%; text-align: left; word-wrap: break-word;">
                                        <p style="font-size: 14px; line-height: 140%; padding: 10px 20px;">
                                            <strong><span
                                                    style="font-size: 16px; line-height: 36.4px;">Hello ${replacements.FirtName} ${replacements.LastName},</span></strong>
                                        </p>


                                        <p style="font-size: 14px; line-height: 140%; padding: 4px 20px;">
                                            Awesome! You've successfully booked your ticket. 🙌 We are thrilled to have you join us on this journey.
                                        </p>


                                        <p style="font-size: 14px; line-height: 140%; padding: 4px 20px;">
                                            Your Ticket ID is <strong>${replacements.TicketId}</strong>   and  Ticket Number is  <strong> ${replacements.TicketNub} </strong>. Keep them safe and handy.
                                        </p>

                                        
                                        <p style="font-size: 14px; line-height: 140%; padding: 4px 20px;">
                                            <strong>                                        
                                                Important Information:
                                            </strong>
                                            <br/>
                                            Please make sure to arrive at the designated pickup location at least 15 minutes before the scheduled departure time. Our friendly staff will be there to assist you and ensure a smooth boarding process.
                                        </p>



                                        <p style="font-size: 14px; line-height: 140%; padding: 4px 20px;">
                                            We hope this journey brings you joy and memorable experiences. Hop-on Hop-off and let's get started!

Safe travels.
                                        </p>

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                      </div>
                    </div>

                    <!-- <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 1px solid #dfdfdf;border-right: 1px solid #dfdfdf;border-bottom: 0px solid transparent;">
                                            <table style="font-family:helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;"
                                                            align="left">
                                                            <div
                                                                style="color: #383f51; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                    <strong><span
                                                                            style="font-size: 26px; line-height: 36.4px;">{{Message}}</span></strong>
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 1px solid #dfdfdf;border-right: 1px solid #dfdfdf;border-bottom: 0px solid transparent;">
                                            <table style="font-family:helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;"
                                                            align="left">
                                                            <div
                                                                style="color: #383f51; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                    <strong><span
                                                                            style="font-size: 26px; line-height: 36.4px;">This is your Ticket ID: {{TicketId}}</span></strong>
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 1px solid #dfdfdf;border-right: 1px solid #dfdfdf;border-bottom: 0px solid transparent;">
                                            <table style="font-family:helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;"
                                                            align="left">
                                                            <div
                                                                style="color: #383f51; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                    <strong><span
                                                                            style="font-size: 26px; line-height: 36.4px;">This is your Ticket Number: {{TicketNub}}</span></strong>
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <div
                                            style="padding: 6px 10px;border-top: 0px solid transparent;border-left: 1px solid #dfdfdf;border-right: 1px solid #dfdfdf;border-bottom: 0px solid transparent;">
                                            <table style="font-family:helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 0px;font-family:helvetica,sans-serif;"
                                                            align="left">
                                                            <div style="margin-top: -20px;">
                                                                <img style="width: 200px;" src="https://res.cloudinary.com/dc1181txe/image/upload/v1705622791/QR_code_for_mobile_English_Wikipedia_ose4l8_jam4fv.jpg" alt="qr code"/>
                                                            </div>
                                                            <div
                                                                style="color: #383f51; line-height: 200%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%; padding: 0px 20px;">
                                                                    Safe travels!
                                                                </p>

                                                                <p style="font-size: 14px; line-height: 140%; padding: 0px 20px;">
                                                                    Best regards,

                                                                </p>
                                                                <p style="font-size: 14px; line-height: 140%; padding: 0px 20px;">
                                                                    Hop-on Hop-off
                                                                </p>
                                                                <!-- <p
                                                                    style="line-height: 200%; text-align: center; font-size: 14px;">
                                                                    <strong><span
                                                                            style="font-size: 16px; line-height: 32px;">Another User subscribe for news letter for Blokflic
                                                                        </span></strong>
                                                                </p> -->
                                                                <!-- <p
                                                                    style="line-height: 200%; text-align: center; font-size: 14px;">
                                                                    <strong><span
                                                                            style="font-size: 16px; line-height: 32px;">An
                                                                            amazing admin will be looking over your
                                                                            account shortly and providing you with
                                                                            access in no time.</span></strong>
                                                                </p>
                                                                <p
                                                                    style="line-height: 200%; text-align: center; font-size: 14px;">
                                                                    &nbsp;</p>
                                                                <p
                                                                    style="font-size: 14px; line-height: 200%; text-align: center;">
                                                                    <span
                                                                        style="font-size: 16px; line-height: 32px;">And
                                                                        since you&rsquo;re here, we want to congratulate
                                                                        on joining our A-list team of American Specialty
                                                                        Lab's
                                                                        professionals.</span>
                                                                </p>
                                                                <p
                                                                    style="font-size: 14px; line-height: 200%; text-align: center;">
                                                                    &nbsp;</p>
                                                                <p
                                                                    style="font-size: 14px; line-height: 200%; text-align: center;">
                                                                    <span
                                                                        style="font-size: 26px; line-height: 52px;">Need
                                                                        Help?</span>
                                                                </p> -->
                                                            </div>
                                                        
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- <table style="font-family:helvetica,sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;"
                                                            align="left">
                                                            <div
                                                                style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p
                                                                    style="font-size: 14px; line-height: 140%; text-align: center;">
                                                                    <span
                                                                        style="font-size: 16px; line-height: 22.4px;">If
                                                                        you have any further questions feel free to
                                                                        reach us at:</span>
                                                                </p>
                                                                <p
                                                                    style="font-size: 14px; line-height: 140%; text-align: center;">
                                                                    <span
                                                                        style="font-size: 16px; line-height: 22.4px;"><a
                                                                            href="tel:+1 (702) 233-1793" target="_blank"
                                                                            rel="noopener">
                                                                            +1 (702) 233-1793
                                                                        </a>&nbsp; | &nbsp;<a
                                                                            href="tel:+1 (702) 233-1791" target="_blank"
                                                                            rel="noopener">+1 (702)
                                                                            233-1791</a></span>
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 1px solid #dfdfdf;border-right: 1px solid #dfdfdf;border-bottom: 1px solid #dfdfdf;">
                                                <table style="font-family:helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;"
                                                                align="left">
                                                                <div style=" text-align: left; word-wrap: break-word;">
                                                                    <p
                                                                        style="font-size: 14px; line-height: 140%; text-align: center;">
                                                                        <strong><span
                                                                                style="font-size: 16px; line-height: 22.4px;">
                                                                                {{location}}
                                                                            </span></strong>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="font-family:helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:helvetica,sans-serif;"
                                                                align="left">
                                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                                    border="0">
                                                                    <tr>
                                                                        <td style="padding-right: 0px;padding-left: 0px;"
                                                                            align="center"> <img align="center"
                                                                                border="0"
                                                                                src="https://firebasestorage.googleapis.com/v0/b/healthcare-rapid.appspot.com/o/footer%20graphic.png?alt=media&token=d1aa1367-c926-4c11-9eaf-1117a62524cf"
                                                                                alt="" title=""
                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 598px;"
                                                                                width="598" /> </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  -->



                        
                    </div>
                
                </td>
            </tr>
        </tbody>
    </table>
    <!-- <div style="margin: 0 auto;line-height: 12px; text-align: center; padding: 10px;"> <span
            style="font-size: 12px; line-height: 1px;">
            This email may contain confidential patient information intended only for the use of the addressee(s) named
            above. Per HIPAA requirements, the authorized recipient of this information is prohibited from disclosing
            this information to any other unauthorized party and is required to maintain privacy/security of the
            information or to destroy the information after its stated need has been fulfilled. If you have received
            this email in error, please IMMEDIATELY notify us so we may remedy the situation. <br />

        </span>
        <hr />
        <div style="font-size: 16px; line-height: 32px; text-align: center; color: green;"> ---- Secured by HTP -
            HITRUST CSF Certified ---- </div> -->
    </div>
</body>

</html>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error.message);
    } else {
      console.log("Email sent:", info.response);
    }
  });


};

app.post("/pay", async (request, res) => {
  try {
    let body = request.body;
    console.log("Body", body);
    let { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: body.sourceId,
      amountMoney: {
        currency: "USD",
        amount: body.amount,
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
        "ticket",
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
      )
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
