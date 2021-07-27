// packages needed in this file
const express = require("express");
const validUrl = require("valid-url");
const connection = require("../config/db.config");
// creating express route handler
const router = express.Router();

// import the Url database model
const Url = require("../models/UrlModel");

// @route    POST /api/url/shorten
// @description     Create short URL

// The API base Url endpoint
const baseUrl = "localhost:4000";

router.post("/shorten", async (req, res) => {
  const longUrl = req.body.longUrl;
  const nameUrl = req.body.name;
  console.log(req.body);

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({
        longUrl,
      });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + nameUrl;

        url = new Url({
          longUrl,
          shortUrl,
          nameUrl,
          date: new Date(),
        });
        await url.save();
        console.log(url);
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid longUrl");
  }
});

module.exports = router;
