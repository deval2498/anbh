const ProjectService = require("../services/project-service");
const { PublishMessage } = require("../utils");
const { EMAIL_SERVICE } = require("../config");
module.exports = (app, channel) => {
  const service = new ProjectService();
  app.post("/saveAndDownload", async (req, res, next) => {
    const { ProjectID, ProjectName, Budget, EndDate } = req.body;

    const { data } = await service.saveAndDownload({
      ProjectID,
      ProjectName,
      Budget,
      EndDate,
    });
    const payload = await service.getProjectPayload(data, "CREATE_PROJECT");
    PublishMessage(channel, EMAIL_SERVICE, JSON.stringify(payload));
    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment;filename=testpdf.pdf",
    });
    const downloadStream = await service.testpdf(
      { ProjectID, ProjectName, Budget, EndDate },
      (chunk) => stream.write(chunk),
      () => stream.end()
    );
  });
  app.get("/whoami", async (req, res, next) => {
    return res.status(200).json({ msg: "/project I am Project service" });
  });
  app.get("/testpdf", async (req, res, next) => {
    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment;filename=testpdf.pdf",
    });
    const data = await service.testpdf(
      (chunk) => stream.write(chunk),
      () => stream.end()
    );
  });
};
