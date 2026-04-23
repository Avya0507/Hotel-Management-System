const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  address: String,
  nationality: String,
   gender: String,
    idProof: String,
    idNumber: String
});

module.exports = mongoose.model("Customer", customerSchema);