const express = require("express");
// const passport = require('passport');
const router = express.Router();
const StudioModel = require("../models/StudioModel");
const mongoose = require("mongoose");

router.post("/studiocreate", (req, res, next) => {
  const { studioname } = req.body;

  if (!studioname) {
    next(new Error("You must provide a name"));
  }

  StudioModel.findOne({ studioname })
    .then(foundStudio => {
      if (foundStudio) res.status(500).json({ msg: "Studio already exists" });

      return StudioModel.create({
        studioname: studioname,
        projects: ["5d9c9dbf28edd167d63a1cc0", "5d9ca49f7966ed66328c87ad"]
      });
    })
    .then(savedStudio => {
      StudioModel.findById(savedStudio._id)
        .populate("projects")
        .then(studioPopulated => {
          res.json(studioPopulated);
        });
    })
    .catch(e => next(e));
});

router.get("/allStudios", (req, res, next) => {
  StudioModel.find().then(data => res.status(200).json({ data }));
});

module.exports = router;
