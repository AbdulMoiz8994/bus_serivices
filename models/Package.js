const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "A package must have a package type!"],
      enum: ["Hop-On Hop-Off Sightseeing Passes", "Liberty Cruises"], // Choose from available types
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
      trim: true,
    },
    perDayPrice: {
      type: String,
      trim: true,
    },
    dealPercentage: {
      type: String,
      required: [true, "A package must have a deal percentage!"],
      trim: true,
    },
    dealPrice: {
      type: String,
      required: [true, "A package must have a deal price!"],
      trim: true,
    },
    ticketSold: {
      type: Number,
      default: 0,
    },
    isHopOnHopOffDowntownVisible: {
      type: Boolean,
      default: true,
    },
    hopOnHopOffDowntown: {
      type: Boolean,
      default: true,
    },
    isHopOnHopOffUptownVisible: {
      type: Boolean,
      default: true,
    },
    hopOnHopOffUptown: {
      type: Boolean,
      default: true,
    },
    isStatueofLibertyCruiseVisible: {
      type: Boolean,
      default: true,
    },
    statueofLibertyCruise: {
      type: Boolean,
      default: true,
    },
    isLibertyCruisePremiumVisible: {
      type: Boolean,
      default: false,
    },
    libertyCruisePremium: {
      type: Boolean,
      default: false,
    },
    isLibertyCruiseStandardVisible: {
      type: Boolean,
      default: false,
    },
    libertyCruiseStandard: {
      type: Boolean,
      default: false,
    },
    isHolidayLightsTourwithEntertainingHostVisible: {
      type: Boolean,
      default: true,
    },
    holidayLightsTourwithEntertainingHost: {
      type: Boolean,
      default: true,
    },
    isCentralParkBikeRentalVisible: {
      type: Boolean,
      default: true,
    },
    centralParkBikeRental: {
      type: Boolean,
      default: true,
    },
    isBrooklynTourVisible: {
      type: Boolean,
      default: true,
    },
    brooklynTour: {
      type: Boolean,
      default: true,
    },
    isMuseumoftheCityofNewYorkVisible: {
      type: Boolean,
      default: true,
    },
    museumoftheCityofNewYork: {
      type: Boolean,
      default: true,
    },
    isSkyscraperMuseumVisible: {
      type: Boolean,
      default: true,
    },
    skyscraperMuseum: {
      type: Boolean,
      default: true,
    },
    isHarryPotterStoreFreeTankardofButterbeerVisible: {
      type: Boolean,
      default: true,
    },
    harryPotterStoreFreeTankardofButterbeer: {
      type: Boolean,
      default: true,
    },
    isMobileboardingVisible: {
      type: Boolean,
      default: true,
    },
    mobileboarding: {
      type: Boolean,
      default: true,
    },
    isMoviesCelebritiesaudiochannelVisible: {
      type: Boolean,
      default: true,
    },
    moviesCelebritiesaudiochannel: {
      type: Boolean,
      default: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);
