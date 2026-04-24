const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email: email.trim().toLowerCase(),
    password: password.trim()
  });

  await user.save();
  res.json({ message: "User Registered" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
    password: password.trim()
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  res.json({ message: "Login Successful" });
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    user.password = password.trim();
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;