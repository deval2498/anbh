const StudentService = require("../services/student-service");
const { PublishMessage } = require("../utils");
const { EMAIL_SERVICE } = require("../config");
module.exports = (app, channel) => {
  const service = new StudentService();
  app.post("/saveAndDownload", async (req, res, next) => {
    const { StudentID, StudentName, Grade, Marks } = req.body;

    const { data } = await service.saveAndDownload({
      StudentID,
      StudentName,
      Grade,
      Marks,
    });
    const payload = await service.getStudentPayload(data, "CREATE_STUDENT");
    PublishMessage(channel, EMAIL_SERVICE, JSON.stringify(payload));
    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment;filename=testpdf.pdf",
    });
    const downloadStream = await service.testpdf(
      {
        StudentID,
        StudentName,
        Grade,
        Marks,
      },
      (chunk) => stream.write(chunk),
      () => stream.end()
    );
  });
  app.get("/whoami", async (req, res, next) => {
    service.getStudentInfo("1");
    return res.status(200).json({ msg: "/student I am Student service" });
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
