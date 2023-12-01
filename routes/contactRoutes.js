const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const Contact = require("./../models/Contact");

const router = Router();

// Get all contacts
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const contacts = await Contact.find();

    res.status(200).json({
      status: "success",
      results: contacts.length,
      data: { contacts },
    });
  })
);

// Get contact
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(400).json({ status: "error", message: "Contact not found!" });
      return;
    }

    res.status(200).json({ status: "success", data: { contact } });
  })
);

// Create new contact
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, phone, subject, category, message } = req.body;

    // Validate fields
    if (!name || !email || !phone || !subject || !category || !message) {
      res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
      return;
    }

    if (
      ![
        "groups_and_charters",
        "become_reseller",
        "become_affiliate",
        "customer_service",
        "feedback",
        "press_inquiry",
        "others",
      ].includes(category)
    ) {
      res.status(400).json({ status: "error", message: "Invalid category!" });
      return;
    }

    const newContact = await Contact.create(req.body);

    newContact &&
      res.status(201).json({
        status: "success",
        message: "Thanks for your message.",
      });
  })
);

// Update contact
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { name, email, phone, subject, category, message } = req.body;

    // Validate fields
    if (!name || !email || !phone || !subject || !category || !message) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields must be filled!" });
    }

    if (
      ![
        "groups_and_charters",
        "become_reseller",
        "become_affiliate",
        "customer_service",
        "feedback",
        "press_inquiry",
        "others",
      ].includes(category)
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid category!" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedContact) {
      return res
        .status(404)
        .json({ status: "error", message: "Contact not found!" });
    }

    res
      .status(200)
      .json({ status: "success", data: { contact: updatedContact } });
  })
);

// Delete contact
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      res.status(400).json({ status: "error", message: "Contact not found!" });
      return;
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  })
);

module.exports = router;
