const mongoose = require("mongoose");

const groupsAndCharterSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: [true, "A groups and charters must have a first name!"],
      trim: true,
    },
    lastName: {
      type: String,
      // required: [true, "A groups and charters must have a last name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "A groups and charters must have a email address!"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "A groups and charters must have a phone number!"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "A groups and charters must have a company!"],
      trim: true,
    },
    comment: {
      type: String,
      required: [true, "A groups and charters must have a comment!"],
      trim: true,
    },
    noOfGuests: {
      type: String,
      required: [true, "A groups and charters must have a number of guests!"],
      trim: true,
    },
    pickupLocation: {
      type: String,
      // required: [true, "A groups and charters must have a pick up location!"],
      trim: true,
    },
    pickupDate: {
      type: String,
      required: [true, "A groups and charters must have a pick up date!"],
      trim: true,
    },
    pickupTime: {
      type: String,
      required: [true, "A groups and charters must have a pick up time!"],
      trim: true,
    },
    dropOffLocation: {
      type: String,
      // required: [true, "A groups and charters must have a drop Off location!"],
      // trim: true,
    },
    dropOffDate: {
      type: String,
      // required: [true, "A groups and charters must have a drop Off date!"],
      // trim: true,
    },
    dropOffTime: {
      type: String,
      // required: [true, "A groups and charters must have a drop Off time!"],
      // trim: true,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("GroupsAndCharter", groupsAndCharterSchema);
