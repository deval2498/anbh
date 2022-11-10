const { StudentRepository } = require("../database");
const { FormatData } = require("../utils");
var PDFDocument = require("pdfkit");
var fs = require("fs");
class StudentService {
  constructor() {
    this.repository = new StudentRepository();
  }
  async saveAndDownload(userInputs) {
    const { StudentID, StudentName, Grade, Marks } = userInputs;
    const studentData = await this.repository.CreateStudent({
      StudentID,
      StudentName,
      Grade,
      Marks,
    });
    return FormatData(studentData);
  }
  async getStudentPayload(data, event) {
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
    const { StudentID, StudentName, Grade, Marks } = userInputs;
    doc.on("data", dataCallBack);
    doc.on("end", endCallBack);
    doc.lineCap("butt").moveTo(270, 90).lineTo(270, 170).stroke();

    row(doc, 90);
    row(doc, 110);
    row(doc, 130);
    row(doc, 150);

    textInRowFirst(doc, "StudentID", 100);
    textInRowFirst(doc, "StudentName", 120);
    textInRowFirst(doc, "Grade", 140);
    textInRowFirst(doc, "Marks", 160);
    textInRowSecond(doc, StudentID, 100);
    textInRowSecond(doc, StudentName, 120);
    textInRowSecond(doc, Grade, 140);
    textInRowSecond(doc, Marks, 160);
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
module.exports = StudentService;
