const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const Order = require("./../models/Order");

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
    const { package, date, firstName, lastName, email } = req.body;

    // Validate fields
    if (!package || !date || !firstName || !lastName || !email) {
      res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
      return;
    }

    const newOrder = await Order.create(req.body);

    newOrder &&
      res.status(201).json({
        status: "success",
        message: "Your order has been placed successfully.",
      });
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
