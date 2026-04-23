const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// ================= CHECK-IN =================
router.post("/checkin", async (req, res) => {
  try {
    const {
      customerName,
      roomNo,
      roomType,
      bookingDate,
      checkIn
    } = req.body;

    // Basic validation
    if (!customerName || !roomNo) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newBooking = new Booking({
      customerName,
      roomNo,
      roomType,
      bookingDate,
      checkIn,
      status: "Checked-In"
    });

    await newBooking.save();

    res.json(newBooking);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET ALL BOOKINGS =================
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ _id: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= CHECK-OUT =================
router.put("/checkout/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: req.params.id },
      {
        checkOut: new Date().toLocaleString(),
        status: "Checked-Out"
      },
      {
        returnDocument: "after" 
      }
    );

    res.json(updatedBooking);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;