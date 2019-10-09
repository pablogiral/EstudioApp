const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema(
  {
    name: String,
    done: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Model = mongoose.model("Task", schemaName);
module.exports = Model;