const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A contact must have a full name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "A contact must have a email address!"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "A contact must have a phone number!"],
    },
    subject: {
      type: String,
      required: [true, "A contact must have a subject!"],
    },
    category: {
      type: String,
      required: [true, "A contact must have a category!"],
      enum: [
        "groups_and_charters",
        "become_reseller",
        "become_affiliate",
        "customer_service",
        "feedback",
        "press_inquiry",
        "others",
      ],
    },
    message: {
      type: String,
      required: [true, "A contact must have a message!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
