const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const NorthPoleExpressPackage = require("./../models/NorthPoleExpressPackage");

const router = Router();

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
      !bus ||
      !duration ||
      !dateAndTime ||
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
      !bus ||
      !duration ||
      !dateAndTime ||
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
