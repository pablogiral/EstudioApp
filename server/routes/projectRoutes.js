const express = require("express");
// const passport = require('passport');
const router = express.Router();
const Projects = require("../models/Projects");

router.post("/project", (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    next(new Error("You must provide a name"));
  }

  Projects.create({
    name: name
  })
    .then(saveProject => res.json(saveProject))
    .catch(e => next(e));
});

router.get("/projects", (req, res, next) => {
  Projects.find()
    .then(allProjects => res.json(allProjects))
    .catch(e => next(e));
});

module.exports = router;
