const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// ADD ROOM
router.post("/", async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ROOMS
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNo: 1 }); 
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;