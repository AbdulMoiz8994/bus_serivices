const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const GroupsAndCharter = require("../models/GroupsAndCharter");
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");

const router = Router();

// Get all groups and charters
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const groupsAndCharters = await GroupsAndCharter.find();

    res.status(200).json({
      status: "success",
      results: groupsAndCharters.length,
      data: { groupsAndCharters },
    });
  })
);

// Get groups and charter
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const groupsAndCharter = await GroupsAndCharter.findById(req.params.id);

    if (!groupsAndCharter) {
      res
        .status(400)
        .json({ status: "error", message: "Groups And Charters not found!" });
      return;
    }

    res.status(200).json({ status: "success", data: { groupsAndCharter } });
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

// Create groups and charter
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      comment,
      noOfGuests,
      pickupLocation,
      pickupDate,
      pickupTime,
      dropOffLocation,
      dropOffDate,
      dropOffTime,
    } = req.body;

    // Validate fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !company ||
      !comment ||
      !noOfGuests ||
      !pickupLocation ||
      !pickupDate ||
      !pickupTime ||
      !dropOffLocation ||
      !dropOffDate ||
      !dropOffTime
    ) {
      res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
      return;
    }

    const newGroupsAndCharter = await GroupsAndCharter.create(req.body);

    newGroupsAndCharter &&
      res.status(201).json({
        status: "success",
        message: "Your request submitted successfully.",
      });
  })
);

// Update groups and charter
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      comment,
      noOfGuests,
      pickupLocation,
      pickupDate,
      pickupTime,
      dropOffLocation,
      dropOffDate,
      dropOffTime,
    } = req.body;

    // Validate fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !company ||
      !comment ||
      !noOfGuests ||
      !pickupLocation ||
      !pickupDate ||
      !pickupTime ||
      !dropOffLocation ||
      !dropOffDate ||
      !dropOffTime
    ) {
      res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
      return;
    }

    const updatedGroupsAndCharter = await GroupsAndCharter.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedGroupsAndCharter) {
      return res
        .status(404)
        .json({ status: "error", message: "Groups And Charters not found!" });
    }

    res.status(200).json({
      status: "success",
      data: { groupsAndCharter: updatedGroupsAndCharter },
    });
  })
);

// Delete groups and charter
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const groupsAndCharter = await GroupsAndCharter.findByIdAndDelete(
      req.params.id
    );

    if (!groupsAndCharter) {
      res
        .status(400)
        .json({ status: "error", message: "Groups And Charters not found!" });
      return;
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  })
);

module.exports = router;
