const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  customerName: String,    
  roomNo: String,
  roomType: String,
  dinner: Number,
  price: Number,
  tax: Number,
  total: Number,
  bookingDate: String,      
  bookingId: Number,        
  status: {
    type: String,
    default: "Available"    
  }
});

module.exports = mongoose.model("Room", roomSchema);