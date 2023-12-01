const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const NorthPoleExpressPackage = require("./../models/NorthPoleExpressPackage");

const router = Router();

// Get all north pole express packages
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const northPoleExpressPackages = await NorthPoleExpressPackage.find();

    res.status(200).json({
      status: "success",
      results: northPoleExpressPackages.length,
      data: { northPoleExpressPackages },
    });
  })
);

// Get north pole express package
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const northPoleExpressPackage = await NorthPoleExpressPackage.findById(
      req.params.id
    );

    if (!northPoleExpressPackage) {
      res.status(400).json({
        status: "error",
        message: "North Pole Express Package not found!",
      });
      return;
    }

    res
      .status(200)
      .json({ status: "success", data: { northPoleExpressPackage } });
  })
);

// Create north pole express package
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
      bus,
      duration,
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
      !bus ||
      !duration ||
      !features
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
    }

    const newNorthPoleExpressPackage = await NorthPoleExpressPackage.create(
      req.body
    );

    newNorthPoleExpressPackage &&
      res.status(201).json({
        status: "success",
        message: "North Pole Express Package created successfully.",
      });
  })
);

// Update north pole express package
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
      bus,
      duration,
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
      !bus ||
      !duration ||
      !features
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
    }

    const updatedNorthPoleExpressPackage =
      await NorthPoleExpressPackage.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

    if (!updatedNorthPoleExpressPackage) {
      return res.status(404).json({
        status: "error",
        message: "North Pole Express Package not found!",
      });
    }

    res.status(200).json({
      status: "success",
      data: { northPoleExpressPackage: updatedNorthPoleExpressPackage },
    });
  })
);

// Delete north pole express package
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const northPoleExpressPackage =
      await NorthPoleExpressPackage.findByIdAndDelete(req.params.id);

    if (!northPoleExpressPackage) {
      res.status(400).json({
        status: "error",
        message: "North Pole Express Package not found!",
      });
      return;
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  })
);

module.exports = router;
