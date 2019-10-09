const express = require("express");
// const passport = require('passport');
const router = express.Router();
const Projects = require("../models/Projects");

router.post("/newProject", (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    next(new Error("You must provide a name"));
  }

  Projects.create({
    name: name,
    musicians: req.body.musicians
  })
    .then(saveProject => res.json(saveProject))
    .catch(e => next(e));
});

router.get("/allProjects", (req, res, next) => {
  Projects.find()
    .then(allProjects => res.json(allProjects))
    .catch(e => next(e));
});

router.get("/singleProject/:id", (req, res, next) => {
  const id = req.params.id;
  Projects.findById(id)
    .then(singleProject => res.json(singleProject))
    .catch(e => next(e));
});

router.post("/editProject/:projectID", (req, res, next) => {
  const id = req.params.projectID;
  Projects.findByIdAndUpdate(
    id,
    { name: req.body.name, bandname: req.body.bandname },
    { new: true }
  )
    .then(editedProject => res.json(editedProject))
    .catch(e => next(e));
});

router.post("/deleteProject/:projectID", (req, res, next) => {
  const id = req.params.projectID;
  Projects.findByIdAndDelete(id)
    .then(deletedProject => {
      console.log(deletedProject);
      res.json(deletedProject);
    })
    .catch(e => next(e));
});

module.exports = router;
