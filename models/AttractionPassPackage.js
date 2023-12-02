const mongoose = require("mongoose");

const attractionPassPackageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "A attraction pass package must have a package type!"],
      enum: ["Attraction Pass"], // Choose from available types
      trim: true,
    },
    tag: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      required: [true, "A attraction pass package must have a image!"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "A attraction pass package must have a title!"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "A attraction pass package must have a price!"],
      trim: true,
    },
    perDayPrice: {
      type: String,
      trim: true,
    },
    dealPercentage: {
      type: String,
      required: [
        true,
        "A attraction pass package must have a deal percentage!",
      ],
      trim: true,
    },
    dealPrice: {
      type: String,
      required: [true, "A attraction pass package must have a deal price!"],
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
    isSolomonRGuggenheimMuseumVisible: {
      type: Boolean,
      default: true,
    },
    solomonRGuggenheimMuseum: {
      type: Boolean,
      default: true,
    },
    isIntrepidSeaAirAndSpaceMuseumVisible: {
      type: Boolean,
      default: true,
    },
    intrepidSeaAirAndSpaceMuseum: {
      type: Boolean,
      default: true,
    },
    isCentralParkBikeRentalAndTourVisible: {
      type: Boolean,
      default: true,
    },
    centralParkBikeRentalAndTour: {
      type: Boolean,
      default: true,
    },
    isNightTourwithEntertainingHostVisible: {
      type: Boolean,
      default: true,
    },
    nightTourwithEntertainingHost: {
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
    isManyMoreinclWalkingToursPartyCruisesVisible: {
      type: Boolean,
      default: true,
    },
    manyMoreinclWalkingToursPartyCruises: {
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

module.exports = mongoose.model(
  "AttractionPassPackage",
  attractionPassPackageSchema
);
