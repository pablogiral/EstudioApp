const express = require("express");
// const passport = require('passport');
const router = express.Router();
const StudioModel = require('../models/StudioModel');

router.post('/studiocreate', (req, res, next) => {
  const {studioname} = req.body;

  if (!studioname){
    next(new Error('You must provide a name'));
  }

  StudioModel.findOne({studioname})
  .then(foundStudio => {
    if (foundStudio) throw new Error ('Studio already exists')

    return new StudioModel({
      studioname,
      projects: []
    }).save();
  })
  .then(savedStudio => res.json({savedStudio}))
  .catch(e => next(e));
})