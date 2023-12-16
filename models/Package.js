const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "A package must have a package type!"],
      enum: [
        "Attraction Pass",
        "City Lights Cruise",
        "Hop-On Hop-Off Sightseeing Passes",
        "Liberty Cruises",
        "Night Tours",
        "North Pole Express",
        "NYC Sightseeing",
        "Sunset Cruise",
      ], // Choose from available types
      trim: true,
    },
    tag: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      required: [true, "A package must have a image!"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "A package must have a title!"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "A package must have a price!"],
    },
    perDayPrice: {
      type: String,
      default: 0,
    },
    dealPercentage: {
      type: String,
      trim: true,
    },
    dealPrice: {
      type: String,
    },
    ticketSold: {
      type: Number,
      default: 0,
    },
    details: [
      {
        fieldName: {
          type: String,
          required: [true, "A package must have a package details!"],
          trim: true,
        },
        fieldValue: {
          type: Boolean,
          required: [true, "A package must have a package details!"],
        },
      },
    ],
    extras: [
      {
        fieldName: {
          type: String,
          required: [true, "A package must have a package extras!"],
          trim: true,
        },
        fieldValue: {
          type: Boolean,
          required: [true, "A package must have a package extras!"],
          default: true,
        },
      },
    ],
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);
