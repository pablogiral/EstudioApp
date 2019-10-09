const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const musicianSchema = new Schema({
  name: String,
  instrument: String
});

const projectSchema = new Schema({
  name: String,
  bandname: String,
  musicians: [musicianSchema],
  // studio: [{ type: Schema.Types.ObjectId, ref: "studios" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
});

const projectModel = mongoose.model("projects", projectSchema);
module.exports = projectModel;
