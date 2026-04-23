const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// ADD CUSTOMER
router.post("/", async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json(customer);
});


router.get("/", async (req, res) => {
  const data = await Customer.find();
  res.json(data);
});


router.put("/:id", async (req, res) => {
  await Customer.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});


router.delete("/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;