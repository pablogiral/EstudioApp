const express = require("express");
const router = express.Router();
const Projects = require("../models/Projects");
// const Task = require("../models/Task");
const StudioModel = require("../models/StudioModel");

router.post("/newProject", (req, res, next) => {
  const { projectname, bandname, belongsTo, comments } = req.body.projectName;
  if (!projectname) {
    next(new Error("You must provide a name"));
  }

  Projects.create({
    name: projectname,
    bandname: bandname,
    belongsTo: belongsTo,
    comments: comments
  })
    // .populate("tasks")
    .then(saveProject => {
      StudioModel.findByIdAndUpdate(
        belongsTo,
        { $push: { projects: saveProject._id } },
        { new: true }
      ).then(() => res.json({ saveProject }));
    })
    .catch(e => next(e));
});

router.get("/allProjects/:id", (req, res, next) => {
  Projects.find({
    belongsTo: req.params.id
  })
    .then(allProjects => {
      res.json({ allProjects });
    })
    .catch(e => next(e));
});

router.get("/singleProject/:id", (req, res, next) => {
  const id = req.params.id;
  Projects.findById(id)
    .then(singleProject => res.json(singleProject))
    .catch(e => next(e));
});

router.post("/editProject/:projectID", (req, res, next) => {
  console.log(req.params);
  const id = req.params.projectID;
  Projects.findByIdAndUpdate(
    id,
    {
      name: req.body.projectname,
      bandname: req.body.bandname,
      comments: req.body.comments,
      projectimage: req.body.image
    },
    { new: true }
  )
    .then(editedProject => res.json(editedProject))
    .catch(e => next(e));
});

router.post("/deleteProject/:projectID", (req, res, next) => {
  const id = req.params.projectID;
  Projects.findByIdAndDelete(id)
    .then(deletedProject => {
      res.json(deletedProject);
    })
    .catch(e => next(e));
});

module.exports = router;
