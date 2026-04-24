const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser) {
      existingUser.name = name;
      existingUser.password = cleanPassword;
      await existingUser.save();

      return res.json({ message: "User Updated Successfully" });
    }

    const user = new User({
      name,
      email: cleanEmail,
      password: cleanPassword,
    });

    await user.save();

    res.json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const user = await User.findOne({
      email: cleanEmail,
      password: cleanPassword,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.json({ message: "Login Successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    user.password = cleanPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;