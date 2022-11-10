const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailStudentSchema = new Schema({
  StudentID: String,
  StudentName: String,
  Grade: String,
  Marks: String,
});
module.exports = mongoose.model("emails", emailStudentSchema);
