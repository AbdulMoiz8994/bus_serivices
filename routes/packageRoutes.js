const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const mongoose = require("mongoose");
const Package = require("./../models/Package");
const path = require("path");

const router = Router();

// Get all packages
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const packages = await Package.find();

    res.status(200).json({
      status: "success",
      results: packages.length,
      data: { packages },
    });
  })
);

// Get package
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const package = await Package.findById(req.params.id);

    if (!package) {
      res.status(400).json({ status: "error", message: "Package not found!" });
      return;
    }

    res.status(200).json({ status: "success", data: { package } });
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

// Create package
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
      details,
      extras,
    } = req.body;

    // Validate fields
    if (
      !type ||
      !image ||
      !title ||
      !price ||
      !dealPercentage ||
      !dealPrice ||
      !details.length ||
      !extras.length
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
    }

    const newPackage = await Package.create(req.body);

    newPackage &&
      res.status(201).json({
        status: "success",
        message: "Package created successfully.",
      });
  })
);

// Update package
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
      details,
      extras,
    } = req.body;

    // Validate fields
    if (
      !type ||
      !image ||
      !title ||
      !price ||
      !dealPercentage ||
      !dealPrice ||
      !details.length ||
      !extras.length
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPackage) {
      return res
        .status(404)
        .json({ status: "error", message: "Package not found!" });
    }

    res.status(200).json({
      status: "success",
      data: { package: updatedPackage },
    });
  })
);

// Delete package
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const package = await Package.findByIdAndDelete(req.params.id);

    if (!package) {
      res.status(400).json({ status: "error", message: "Package not found!" });
      return;
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  })
);

module.exports = router;
