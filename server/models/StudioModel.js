const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studioModelSchema = new Schema({
  studioname: String,
  studioimage: {
    type: String,
    default: "http://fr.cavernestudio.com/pics/caverne_01.jpg"
  },
  projects: [{type: Schema.Types.ObjectId, ref: "projects"}]
});

const StudioModelSchema = mongoose.model("studios", studioModelSchema);
module.exports = StudioModelSchema;
