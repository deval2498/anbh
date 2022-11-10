const EmailService = require("../services/email-service");
const { SubscribeMessage } = require("../utils");
module.exports = (app, channel) => {
  const service = new EmailService();
  SubscribeMessage(channel, service);
  app.post("/saveStudent", async (req, res, next) => {
    const { StudentID, StudentName, Grade, Marks } = req.body;

    const { data } = await service.saveStudent({
      StudentID,
      StudentName,
      Grade,
      Marks,
    });
    res.json(data);
  });
  app.get("/whoami", async (req, res, next) => {
    return res.status(200).json({ msg: "/email I am email service" });
  });
  app.post("/testEmailStudent", async (req, res, next) => {
    const { StudentID, sendTo } = req.body;
    console.log(StudentID, sendTo);
    const pdf = await service.generatePdf(StudentID, sendTo);
    return res.status(200).json({ msg: "/email I am Student email sender" });
  });
  app.post("/testEmailProject", async (req, res, next) => {
    const { ProjectID, sendTo } = req.body;
    const pdf = await service.generateProjectPdf(ProjectID, sendTo);
    return res.status(200).json({ msg: "/email I am Project email sender" });
  });
};
