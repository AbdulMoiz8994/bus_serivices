const mongoose = require("mongoose");

const cruisePackageSchema = new mongoose.Schema(
  {
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
      required: [
        true,
        "A cruise package must have a is priority boarding visible!",
      ],
      default: false,
    },
    priorityBoarding: {
      type: Boolean,
      required: [true, "A cruise package must have a priority boarding!"],
    },
    isSkyDeckAccessAndSeatingVisible: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a is Sky deck access and seating visible!",
      ],
      default: false,
    },
    skyDeckAccessAndSeating: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a sky deck access and seating!",
      ],
    },
    isSkyDeckAccessVisible: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a is sky deck access visible!",
      ],
      default: false,
    },
    skyDeckAccess: {
      type: Boolean,
      required: [true, "A cruise package must have a sky deck access!"],
    },
    isSeatingAvailableVisible: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a is seating available visible!",
      ],
      default: false,
    },
    seatingAvailable: {
      type: Boolean,
      required: [true, "A cruise package must have a seating available!"],
    },
    isLowerDeckAccessAndSeatingVisible: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a is lower deck access and seating visible!",
      ],
      default: false,
    },
    lowerDeckAccessAndSeating: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a lower deck access and seating!",
      ],
    },
    isTemperatureControlledIndoorVisible: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a is temperature controlled indoor visible!",
      ],
      default: false,
    },
    temperatureControlledIndoor: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a temperature controlled indoor!",
      ],
    },
    isFoodAndDrinksForPurchaseVisible: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a is food and drinks for purchase visible!",
      ],
      default: false,
    },
    foodAndDrinksForPurchase: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a food and drinks for purchase!",
      ],
    },
    isPanoramicViewsOnFirstDeckVisible: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a is panoramic views on first deck visible!",
      ],
      default: false,
    },
    panoramicViewsOnFirstDeck: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a panoramic views on first deck!",
      ],
    },
    isCelebratingMusicEntertainmentVisible: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a is celebrating music entertainment visible!",
      ],
      default: false,
    },
    celebratingMusicEntertainment: {
      type: Boolean,
      required: [
        true,
        "A cruise package must have a celebrating music entertainment!",
      ],
    },
    isVisible: {
      type: Boolean,
      required: [true, "A cruise package must have a iss Visible!"],
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CruisePackage", cruisePackageSchema);
