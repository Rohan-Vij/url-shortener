const express = require("express");

const router = express.Router();

const Url = require("../models/UrlModel");

router.get("/return/:id", async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);
    if (url) {
      res.json(url);
    } else {
      res.status(404).json("No URL Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
