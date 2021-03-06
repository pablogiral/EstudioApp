const express = require("express");
const passport = require("passport");
const router = express.Router();
const StudioModel = require("../models/StudioModel");
// const mongoose = require("mongoose");

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
        owner: req.session.passport.user
      });
    })
    .then(savedStudio => res.json(savedStudio))
    .catch(e => next(e));
});

router.post("/associateStudioProject", (req, res, next) => {
  StudioModel.findOneAndUpdate(
    req.body.studioID,
    { $push: { projects: req.body.projectID } },
    { new: true }
  )
    .populate("projects")
    .then(updatedStudio => res.json(updatedStudio))
    .catch(e => next(e));
});

router.get("/allStudios", (req, res, next) => {
  
  StudioModel.find({
    owner: req.session.passport.user
  })
    .populate("projects")
    .populate({
      path: "owner",
      model: "users"
    })
    .then(data => res.status(200).json(data));
});

router.get("/getStudio/:studioID", (req, res, next) => {
  const id = req.params.studioID;
  StudioModel.findById(id)
    .populate("projects")
    .then(studio => res.json(studio))
    .catch(e => next(e));
});

router.post("/editStudio/:studioID", (req, res, next) => {
  const id = req.params.studioID;
  StudioModel.findByIdAndUpdate(
    id,
    {
      studioname: req.body.studioname,
      studioimage: req.body.image
    },
    { new: true }
  )
    .then(updatedStudio => res.json(updatedStudio))
    .catch(e => next(e));
});

router.post("/deleteStudio/:studioID", (req, res, next) => {
  const id = req.params.studioID;
  StudioModel.findByIdAndDelete(id)
    .then(deletedStudio => {
      
      res.json(deletedStudio);
    })
    .catch(e => next(e));
});

module.exports = router;
