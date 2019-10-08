const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studioModelSchema = new Schema({
  studioname: String,
  studioimage: {
    type: String,
    default: "http://fr.cavernestudio.com/pics/caverne_01.jpg"
  },
  projects: [String]
});

const StudioModelSchema = mongoose.model("StudioModel", studioModelSchema);
module.exports = StudioModelSchema;
