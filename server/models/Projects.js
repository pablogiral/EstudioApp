const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  studio: [{type: Schema.Types.ObjectId, ref: "studios"}]
});

const projectModel = mongoose.model("projects", projectSchema);
module.exports = projectModel;