const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
  ProjectID: String,
  ProjectName: String,
  Budget: String,
  EndDate: String,
});
module.exports = mongoose.model("projects", ProjectSchema);
