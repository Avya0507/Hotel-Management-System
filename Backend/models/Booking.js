const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerName: String,
  roomNo: String,
  roomType: String,
  bookingDate: String,
  checkIn: String,
  checkOut: String,
  status: {
    type: String,
    default: "Checked-In"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);