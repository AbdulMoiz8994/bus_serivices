const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const AttractionPassPackage = require("./../models/AttractionPassPackage");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");

const router = Router();

// Get all attraction pass packages
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const attractionPassPackages = await AttractionPassPackage.find();

    res.status(200).json({
      status: "success",
      results: attractionPassPackages.length,
      data: { attractionPassPackages },
    });
  })
);

// Get attraction pass package
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const attractionPassPackage = await AttractionPassPackage.findById(
      req.params.id
    );

    if (!attractionPassPackage) {
      res.status(400).json({
        status: "error",
        message: "Attraction Pass Package not found!",
      });
      return;
    }

    res
      .status(200)
      .json({ status: "success", data: { attractionPassPackage } });
  })
);

// Upload attraction pass package image
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

// Create attraction pass package
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { type, image, title, price, dealPercentage, dealPrice } = req.body;

    // Validate fields
    if (!type || !image || !title || !price || !dealPercentage || !dealPrice) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
    }

    const newAttractionPassPackage = await AttractionPassPackage.create(
      req.body
    );

    newAttractionPassPackage &&
      res.status(201).json({
        status: "success",
        message: "Attraction Pass Package created successfully.",
      });
  })
);

// Update attraction pass package
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { type, image, title, price, dealPercentage, dealPrice } = req.body;

    // Validate fields
    if (!type || !image || !title || !price || !dealPercentage || !dealPrice) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
    }

    const updatedAttractionPassPackage =
      await AttractionPassPackage.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

    if (!updatedAttractionPassPackage) {
      return res.status(404).json({
        status: "error",
        message: "Attraction Pass Package not found!",
      });
    }

    res.status(200).json({
      status: "success",
      data: { attractionPassPackage: updatedAttractionPassPackage },
    });
  })
);

// Delete attraction pass package
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const attractionPassPackage = await AttractionPassPackage.findByIdAndDelete(
      req.params.id
    );

    if (!attractionPassPackage) {
      res.status(400).json({
        status: "error",
        message: "Attraction Pass Package not found!",
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
