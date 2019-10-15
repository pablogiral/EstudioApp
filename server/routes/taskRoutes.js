const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Project = require("../models/Projects");

router.post("/newTask", (req, res, next) => {
  // console.log("ESTA",req.body)
  Task.create({
    name: req.body.name
  }).then(newTask => {
    Project.findByIdAndUpdate(
      req.body.projectID,
      { $push: { tasks: newTask._id } },
      { new: true }
    )
      // .populate("tasks")
      .then(updatedProject => {
        // console.log(updatedProject)
        res.redirect(`/api/taskRoutes/projectTasks/${req.body.projectID}`);
      });
    // .then(newTask => {
    // res.json(newTask);
  });
});

router.get("/task/:id/done/:done/project/:projectID", (req, res, next) => {
  let payload;

  if (req.params.done === "false") {
    payload = { done: false };
  } else {
    payload = { done: true };
  }

  Task.findByIdAndUpdate(req.params.id, payload)
    .then(() => {
      res.redirect("/api/taskRoutes/projectTasks/" + req.params.projectID);
    })
    .catch(e => next(e));
});

router.get("/allTasks", (req, res, next) => {
  Task.find()
    .select({
      __v: 0
    })
    .sort({
      createdAt: -1
    })
    .then(allTasks => {
      // console.log(allTasks);
      res.json(allTasks);
    });
});

router.get("/projectTasks/:id", (req, res, next) => {
  Project.findById(req.params.id)
    .populate("tasks")
    .then(foundProject => {
      res.json(foundProject);
    });
});

router.get("/deleteTask/:id", (req, res, next) => {
  Task.findByIdAndDelete(req.params.id)
    .then(res.status(200).json({}))
    .catch(e => next(e));
});

router.get("/tasks/done/:done", (req, res, next) => {
  Task.find({ done: req.params.done })
    .select({
      __v: 0
    })
    .sort({
      createdAt: -1
    })
    .then(allTasks => res.json(allTasks));
});

module.exports = router;
