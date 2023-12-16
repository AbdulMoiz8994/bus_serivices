const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const Order = require("./../models/Order");
const nodemailer = require("nodemailer");

const router = Router();

// Get all orders
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const orders = await Order.find();

    res.status(200).json({
      status: "success",
      results: orders.length,
      data: { orders },
    });
  })
);

// Get order
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(400).json({ status: "error", message: "Order not found!" });
      return;
    }

    res.status(200).json({ status: "success", data: { order } });
  })
);

// Create new order
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      title,
      date,
      time,
      adults,
      adultsPrice,
      kids,
      kidsPrice,
      totalPrice,
      firstName,
      lastName,
      email,
    } = req.body;

    // Validate fields
    if (
      !title ||
      !date ||
      !time ||
      !totalPrice ||
      !firstName ||
      !lastName ||
      !email
    ) {
      res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
      return;
    }

    const newOrder = await Order.create(req.body);

    if (newOrder) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASS,
        },
      });

      // Send mail via nodemailer
      const mailOptions = {
        from: process.env.USER_EMAIL, // sender email
        to: email, // receiver email
        subject: "Order Confirmation",
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bus Booking Confirmation</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f1f1f1;
                }
        
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                }
        
                h2 {
                    color: #007BFF;
                }
        
                p {
                    margin: 0 0 20px;
                }
        
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
        
                table,
                th,
                td {
                    border: 1px solid #ddd;
                }
        
                th,
                td {
                    padding: 15px;
                    text-align: left;
                }
        
                th {
                    background-color: #007BFF;
                    color: #fff;
                }
        
                .footer {
                    margin-top: 20px;
                    text-align: center;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <h2>Bus Booking Confirmation</h2>
                <p>Dear ${firstName} ${lastName},</p>
        
                <p>Your bus booking details are confirmed. Please find the booking details below:</p>
        
                <table>
                    <tr>
                        <th>Package</th>
                        <td>${title}</td>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <td>${date}</td>
                    </tr>
                    <tr>
                        <th>Time</th>
                        <td>${time}</td>
                    </tr>
                    <tr>
                        <th>Adults</th>
                        <td>${adults} - $${adultsPrice}</td>
                    </tr>
                    <tr>
                        <th>Kids</th>
                        <td>${kids} - $${kidsPrice}</td>
                    </tr>
                    <tr>
                        <th>Total Price</th>
                        <td>$${totalPrice}</td>
                    </tr>
                </table>
        
                <p style="margin-top: 20px;">Thank you for choosing our bus service. We look forward to serving you!</p>
        
                <div class="footer">
                    <p>If you have any questions, please contact us at ....</p>
                </div>
            </div>
        </body>
        
        </html>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("error >>>>>>>>>>>>>", error);
        } else {
          console.log("info >>>>>>", info);
          console.info("Email sent: " + info.response);
        }
      });

      res.status(201).json({
        status: "success",
        message: "Your order has been placed successfully.",
      });
    }
  })
);

// Update order
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { package, date, firstName, lastName, email } = req.body;

    // Validate fields
    if (!package || !date || !firstName || !lastName || !email) {
      res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
      return;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ status: "error", message: "Order not found!" });
    }

    res.status(200).json({ status: "success", data: { order: updatedOrder } });
  })
);

// Delete order
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      res.status(400).json({ status: "error", message: "Order not found!" });
      return;
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  })
);

module.exports = router;
