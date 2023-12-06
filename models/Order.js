const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    package: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A order must have a package!"],
      ref: "Package",
      trim: true,
    },
    date: {
      type: String,
      required: [true, "A order must have a date!"],
      trim: true,
    },
    adults: {
      type: Number,
      default: 0,
    },
    kids: {
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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
