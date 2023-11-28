const { Router } = require("express");

const router = Router();

// Get all contacts
router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Get All Contacts",
  });
});

// Get contact
router.get("/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    message: `Get contact by id: ${req.params.id}`,
  });
});

// Create new contact
router.post("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: `Create contact successfully.`,
  });
});

// Update contact
router.patch("/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    message: `Update contact by id: ${req.params.id}`,
  });
});

// Delete contact
router.delete("/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    message: `Delete contact by id: ${req.params.id}`,
  });
});

module.exports = router;
