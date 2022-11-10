const mongoose = require("mongoose");
const { EmailModel, ProjectModel } = require("../models");
class EmailRepository {
  async CreateStudent({ StudentID, StudentName, Grade, Marks }) {
    const email = new EmailModel({ StudentID, StudentName, Grade, Marks });
    const emailResult = await email.save();
    return emailResult;
  }
  async findStudentRecord(userInput) {
    const student = await EmailModel.findOne({ StudentID: userInput });
    return student;
  }
  async CreateProject({ ProjectID, ProjectName, Budget, EndDate }) {
    const project = new ProjectModel({
      ProjectID,
      ProjectName,
      Budget,
      EndDate,
    });
    const projectResult = await project.save();
    return projectResult;
  }
  async findProjectRecord(userInput) {
    const project = await ProjectModel.findOne({ ProjectID: userInput });
    return project;
  }
}
module.exports = EmailRepository;
