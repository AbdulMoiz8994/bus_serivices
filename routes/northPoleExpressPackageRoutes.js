const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const NorthPoleExpressPackage = require("./../models/NorthPoleExpressPackage");
const mongoose = require("mongoose");

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

// Upload package image
router.post(
  "/upload/media",
  asyncHandler(async (req, res) => {
    const packageImage = req?.files?.packageImage;

    // Validate Image
    const fileSize = packageImage?.size / 10000;
    // const fileExt = packageImage?.name
    //   ?.split(".")[1]
    //   .toLowerCase();
    const fileExt = path.extname(packageImage?.name);

    const validExtensions = /\.(jpg|jpeg|png)$/i;

    if (!validExtensions.test(fileExt)) {
      res.status(400).json({
        status: "error",
        message: "File extension must be jpg, jpeg, or png",
      });
      return;
    }

    if (fileSize > 10000) {
      res.status(400).json({
        status: "error",
        message: "File size must be lower than 10mb",
      });
      return;
    }

    const packageImageId = new mongoose.Types.ObjectId();

    cloudinary.uploader.upload(
      packageImage?.tempFilePath,
      {
        // use_filename: true,
        // unique_filename: false,
        folder: "newyorkbuses/packages",
        public_id: packageImageId,
      },
      async (err, image) => {
        if (err) {
          console.error("async (err, image) => {", err);
          return res
            .status(400)
            .json({ status: "error", message: err.message });
        }

        console.log("File Uploaded");

        fs.unlink(packageImage?.tempFilePath, (err) => {
          if (err) {
            console.error(
              "fs.unlink(packageImage.tempFilePath, (err) => {",
              err
            );
            return res
              .status(400)
              .json({ status: "error", message: err.message });
          }
        });

        res.status(200).json({
          status: "success",
          data: {
            productImage: image?.url,
          },
        });
      }
    );
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
