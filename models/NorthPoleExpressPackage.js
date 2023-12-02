const mongoose = require("mongoose");

const northPoleExpressPackageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [
        true,
        "A north pole express package must have a package type!",
      ],
      enum: ["NYC holiday lights"], // Choose from available types
      trim: true,
    },
    tag: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      required: [true, "A north pole express package must have a image!"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "A north pole express package must have a title!"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "A north pole express package must have a price!"],
      trim: true,
    },
    dealPercentage: {
      type: String,
      required: [
        true,
        "A north pole express package must have a deal percentage!",
      ],
      trim: true,
    },
    dealPrice: {
      type: String,
      required: [true, "A north pole express package must have a deal price!"],
      trim: true,
    },
    ticketSold: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      required: [true, "A north pole express package must have a location!"],
      trim: true,
    },
    bus: {
      type: String,
      required: [true, "A north pole express package must have a bus!"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "A north pole express package must have a duration!"],
      trim: true,
    },
    features: {
      type: String,
      required: [true, "A north pole express package must have a features!"],
      trim: true,
    },
    isGoldenTicketToTheNorthPoleVisible: {
      type: Boolean,
      default: false,
    },
    goldenTicketToTheNorthPole: {
      type: Boolean,
      default: false,
    },
    isChristmasWishesVisible: {
      type: Boolean,
      default: false,
    },
    christmasWishes: {
      type: Boolean,
      default: false,
    },
    isStorytellingAndCarolSingingVisible: {
      type: Boolean,
      default: false,
    },
    storytellingAndCarolSinging: {
      type: Boolean,
      default: false,
    },
    isHotCocoaAndCookiesVisible: {
      type: Boolean,
      default: false,
    },
    hotCocoaAndCookies: {
      type: Boolean,
      default: false,
    },
    isHolidayLightsNarrationAndFunFactsVisible: {
      type: Boolean,
      default: false,
    },
    holidayLightsNarrationAndFunFacts: {
      type: Boolean,
      default: false,
    },
    isRockefellerCenterChristmasTreeVisible: {
      type: Boolean,
      default: false,
    },
    rockefellerCenterChristmasTree: {
      type: Boolean,
      default: false,
    },
    isWinterBlanketAndHatVisible: {
      type: Boolean,
      default: false,
    },
    winterBlanketAndHat: {
      type: Boolean,
      default: false,
    },
    isHotCocoaAndChristmasCookieVisible: {
      type: Boolean,
      default: false,
    },
    hotCocoaAndChristmasCookie: {
      type: Boolean,
      default: false,
    },
    isRoundTripTicketToTheNorthPoleVisible: {
      type: Boolean,
      default: false,
    },
    roundTripTicketToTheNorthPole: {
      type: Boolean,
      default: false,
    },
    isChristmasCarolSingingAndWishWritingVisible: {
      type: Boolean,
      default: false,
    },
    christmasCarolSingingAndWishWriting: {
      type: Boolean,
      default: false,
    },
    isStorytellingOnboardVisible: {
      type: Boolean,
      default: false,
    },
    storytellingOnboard: {
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

module.exports = mongoose.model(
  "NorthPoleExpressPackage",
  northPoleExpressPackageSchema
);
