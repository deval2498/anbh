const mongoose = require("mongoose");
const { StudentModel } = require("../models");
class StudentRepository {
  async CreateStudent({ StudentID, StudentName, Grade, Marks }) {
    const student = new StudentModel({ StudentID, StudentName, Grade, Marks });
    const studentResult = await student.save();
    return studentResult;
  }
  async findStudentRecord(userInput) {
    const student = await StudentModel.findOne({ StudentID: userInput });
    return student;
  }
}
module.exports = StudentRepository;
