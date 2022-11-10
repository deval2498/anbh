const { ProjectRepository } = require("../database");
const { FormatData } = require("../utils");
var PDFDocument = require("pdfkit");
var fs = require("fs");
class ProjectService {
  constructor() {
    this.repository = new ProjectRepository();
  }
  async saveAndDownload(userInputs) {
    const { ProjectID, ProjectName, Budget, EndDate } = userInputs;
    const projectData = await this.repository.CreateProject({
      ProjectID,
      ProjectName,
      Budget,
      EndDate,
    });
    return FormatData(projectData);
  }
  async getProjectPayload(data, event) {
    if (data) {
      const payload = {
        event: event,
        data: { data },
      };
      return payload;
    } else {
      return FormatData({ error: "No Order Available" });
    }
  }
  //   async getStudentInfo(studentId) {
  //     const student = this.repository.findStudentRecord(studentId);
  //     return student;
  //   }
  async testpdf(userInputs, dataCallBack, endCallBack) {
    var doc = new PDFDocument();
    //line to the middle
    const { ProjectID, ProjectName, Budget, EndDate } = userInputs;
    doc.on("data", dataCallBack);
    doc.on("end", endCallBack);
    doc.lineCap("butt").moveTo(270, 90).lineTo(270, 170).stroke();

    row(doc, 90);
    row(doc, 110);
    row(doc, 130);
    row(doc, 150);

    textInRowFirst(doc, "ProjectID", 100);
    textInRowFirst(doc, "ProjectName", 120);
    textInRowFirst(doc, "Budget", 140);
    textInRowFirst(doc, "EndDate", 160);
    textInRowSecond(doc, ProjectID, 100);
    textInRowSecond(doc, ProjectName, 120);
    textInRowSecond(doc, Budget, 140);
    textInRowSecond(doc, EndDate, 160);
    doc.end();

    function textInRowFirst(doc, text, heigth) {
      doc.y = heigth;
      doc.x = 30;
      doc.fillColor("black");
      doc.text(text, {
        paragraphGap: 5,
        indent: 5,
        align: "justify",
        columns: 2,
      });
      return doc;
    }
    function textInRowSecond(doc, text, heigth) {
      doc.y = heigth;
      doc.x = 350;
      doc.fillColor("black");
      doc.text(text, {
        paragraphGap: 5,
        indent: 5,
        align: "justify",
        columns: 1,
      });
      return doc;
    }

    function row(doc, heigth) {
      doc.lineJoin("miter").rect(30, heigth, 500, 20).stroke();
      return doc;
    }
  }
}
module.exports = ProjectService;
