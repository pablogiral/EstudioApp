const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/newTask", (req, res, next) => {
  Task.create({
    name: req.body.name
  }).then(() => {
    res.redirect("/api/taskRoutes/allTasks");
    // .then(newTask => {
    // res.json(newTask);
  });
});

router.get("/task/:id/done/:done", (req, res, next) => {
  let payload;

  if (req.params.done === "false") {
    payload = { done: false };
  } else {
    payload = { done: true };
  }

  Task.findByIdAndUpdate(req.params.id, payload)
  .then(() => {
    res.redirect("/api/taskRoutes/allTasks");
  })
  .catch(e=>next(e))
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
      console.log(allTasks);
      res.json(allTasks);
    });
});

// router.post("/deleteTask/:id", (req, res, next) => {
//   Task.findByIdAndDelete(req.body._id)

// })

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
