const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const GroupsAndCharter = require("./../models/GroupsAndCharter");

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
