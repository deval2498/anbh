const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  StudentID: String,
  StudentName: String,
  Grade: String,
  Marks: String,
});
module.exports = mongoose.model("student", StudentSchema);
