const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A order must have a package title!"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "A order must have a date!"],
      trim: true,
    },
    time: {
      type: String,
      required: [true, "A order must have a time!"],
      trim: true,
    },
    adults: {
      type: Number,
      default: 0,
    },
    adultsPrice: {
      type: Number,
      default: 0,
    },
    kids: {
      type: Number,
      default: 0,
    },
    kidsPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    firstName: {
      type: String,
      required: [true, "A order must have a first name!"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "A order must have a last name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "A order must have a email address!"],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "A order must have a status!"],
      enum: ["Processing", "Confirmed", "Canceled"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
