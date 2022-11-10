const mongoose = require("mongoose");
const { ProjectModel } = require("../models");
class ProjectRepository {
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
module.exports = ProjectRepository;
