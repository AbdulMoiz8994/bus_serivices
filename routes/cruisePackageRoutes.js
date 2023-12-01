const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const CruisePackage = require("./../models/CruisePackage");

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const cruisePackages = await CruisePackage.find();

    res.status(200).json({
      status: "success",
      results: cruisePackages.length,
      data: { cruisePackages },
    });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const cruisePackage = await CruisePackage.findById(req.params.id);

    if (!cruisePackage) {
      res
        .status(400)
        .json({ status: "error", message: "Cruise Package not found!" });
      return;
    }

    res.status(200).json({ status: "success", data: { cruisePackage } });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      type,
      image,
      title,
      price,
      dealPercentage,
      dealPrice,
      location,
      ship,
      duration,
      dateAndTime,
      features,
    } = req.body;

    // Validate fields
    if (
      !type ||
      !image ||
      !title ||
      !price ||
      !dealPercentage ||
      !dealPrice ||
      !location ||
      !ship ||
      !duration ||
      !dateAndTime ||
      !features
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
    }

    const newCruisePackage = await CruisePackage.create(req.body);

    newCruisePackage &&
      res.status(201).json({
        status: "success",
        message: "Cruise Package created successfully.",
      });
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const {
      type,
      image,
      title,
      price,
      dealPercentage,
      dealPrice,
      location,
      ship,
      duration,
      dateAndTime,
      features,
    } = req.body;

    // Validate fields
    if (
      !type ||
      !image ||
      !title ||
      !price ||
      !dealPercentage ||
      !dealPrice ||
      !location ||
      !ship ||
      !duration ||
      !dateAndTime ||
      !features
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
    }

    const cruisePackage = await CruisePackage.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!cruisePackage) {
      return res
        .status(404)
        .json({ status: "error", message: "Cruise Package not found!" });
    }

    res.status(200).json({ status: "success", data: { cruisePackage } });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const cruisePackage = await CruisePackage.findByIdAndDelete(req.params.id);

    if (!cruisePackage) {
      res
        .status(400)
        .json({ status: "error", message: "Cruise Package not found!" });
      return;
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  })
);

module.exports = router;
