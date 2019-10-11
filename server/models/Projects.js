const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const musicianSchema = new Schema({
  name: String,
  instrument: String
});

const projectSchema = new Schema({
  name: String,
  bandname: String,
  belongsTo: String,
  projectimage: {type:String, default: "https://dt7v1i9vyp3mf.cloudfront.net/styles/news_large/s3/imagelibrary/m/micsheader-48SvWKzNIVwKt_u_8Pg_tImF81R5QYaG.jpg"},
  musicians: [musicianSchema],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
});

const projectModel = mongoose.model("projects", projectSchema);
module.exports = projectModel;
