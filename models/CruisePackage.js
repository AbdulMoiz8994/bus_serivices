const mongoose = require("mongoose");

const cruisePackageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "A cruise package must have a package type!"],
      enum: ["Sunset Cruise", "City Lights Cruise", "Others"], // Choose from available types
      trim: true,
    },
    image: {
      type: String,
      required: [true, "A cruise package must have a image!"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "A cruise package must have a title!"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "A cruise package must have a price!"],
      trim: true,
    },
    dealPercentage: {
      type: String,
      required: [true, "A cruise package must have a deal percentage!"],
      trim: true,
    },
    dealPrice: {
      type: String,
      required: [true, "A cruise package must have a deal price!"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "A cruise package must have a location!"],
      trim: true,
    },
    ship: {
      type: String,
      required: [true, "A cruise package must have a ship!"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "A cruise package must have a duration!"],
      trim: true,
    },
    dateAndTime: {
      type: String,
      required: [true, "A cruise package must have a date and time!"],
      trim: true,
    },
    features: {
      type: String,
      required: [true, "A cruise package must have a features!"],
      trim: true,
    },
    isPriorityBoardingVisible: {
      type: Boolean,
      default: true,
    },
    priorityBoarding: {
      type: Boolean,
      default: true,
    },
    isSkyDeckAccessAndSeatingVisible: {
      type: Boolean,
      default: true,
    },
    skyDeckAccessAndSeating: {
      type: Boolean,
      default: true,
    },
    isSkyDeckAccessVisible: {
      type: Boolean,
      default: false,
    },
    skyDeckAccess: {
      type: Boolean,
      default: false,
    },
    isSeatingAvailableVisible: {
      type: Boolean,
      default: false,
    },
    seatingAvailable: {
      type: Boolean,
      default: false,
    },
    isLowerDeckAccessAndSeatingVisible: {
      type: Boolean,
      default: true,
    },
    lowerDeckAccessAndSeating: {
      type: Boolean,
      default: true,
    },
    isTemperatureControlledIndoorVisible: {
      type: Boolean,
      default: true,
    },
    temperatureControlledIndoor: {
      type: Boolean,
      default: true,
    },
    isFoodAndDrinksForPurchaseVisible: {
      type: Boolean,
      default: true,
    },
    foodAndDrinksForPurchase: {
      type: Boolean,
      default: true,
    },
    isPanoramicViewsOnFirstDeckVisible: {
      type: Boolean,
      default: false,
    },
    panoramicViewsOnFirstDeck: {
      type: Boolean,
      default: false,
    },
    isCelebratingMusicEntertainmentVisible: {
      type: Boolean,
      default: false,
    },
    celebratingMusicEntertainment: {
      type: Boolean,
      default: false,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CruisePackage", cruisePackageSchema);
