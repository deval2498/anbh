const { EmailRepository } = require("../database");
const { FormatData } = require("../utils");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const { student } = require("../../../Save Student Data/src/api");

class EmailService {
  constructor() {
    this.repository = new EmailRepository();
  }
  async saveStudent(studentInputs) {
    const { StudentID, StudentName, Grade, Marks } = studentInputs;
    const studentData = await this.repository.CreateStudent({
      StudentID,
      StudentName,
      Grade,
      Marks,
    });
    return FormatData(studentData);
  }
  async saveProject(projectInputs) {
    const { ProjectID, ProjectName, Budget, EndDate } = projectInputs;
    const projectData = await this.repository.CreateProject({
      ProjectID,
      ProjectName,
      Budget,
      EndDate,
    });
    return FormatData(projectData);
  }
  async SubscribeEvents(payload) {
    console.log("Triggering.... Email Events");

    payload = JSON.parse(payload);

    const { event, data } = payload;

    switch (event) {
      case "CREATE_STUDENT":
        this.saveStudent(data.data);
        break;
      case "CREATE_PROJECT":
        this.saveProject(data.data);
        break;
      // case 'ADD_TO_CART':
      //     this.ManageCart(userId,product, qty, false);
      //     break;
      // case 'REMOVE_FROM_CART':
      //     this.ManageCart(userId,product,qty, true);
      //     break;
      // case 'CREATE_ORDER':
      //     this.ManageOrder(userId,order);
      //     break;
      default:
        break;
    }
  }

  async generatePdf(StudentID, sendTo) {
    const doc = new PDFDocument();
    const studentData = await this.repository.findStudentRecord(StudentID);
    let mailTransport = nodemailer.createTransport({
      sendMail: true,
      service: "gmail",
      auth: {
        user: "devtest2498@gmail.com", // generated ethereal user
        pass: "rkmutjbzmdshsihl", // generated ethereal password
      },
    });
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);

      const mailOptions = {
        from: "devtest2498@gmail.com",
        to: sendTo,
        attachments: [
          {
            filename: "attachment.pdf",
            content: pdfData,
          },
        ],
      };

      mailOptions.subject = "PFA";
      mailOptions.text = "PDF attached";

      return mailTransport
        .sendMail(mailOptions)
        .then(() => {
          console.log("email sent:");
        })
        .catch((error) => {
          console.error("There was an error while sending the email:", error);
        });
    });
    doc.lineCap("butt").moveTo(270, 90).lineTo(270, 170).stroke();

    row(doc, 90);
    row(doc, 110);
    row(doc, 130);
    row(doc, 150);

    textInRowFirst(doc, "StudentID", 100);
    textInRowFirst(doc, "StudentName", 120);
    textInRowFirst(doc, "Grade", 140);
    textInRowFirst(doc, "Marks", 160);
    textInRowSecond(doc, studentData.StudentID, 100);
    textInRowSecond(doc, studentData.StudentName, 120);
    textInRowSecond(doc, studentData.Grade, 140);
    textInRowSecond(doc, studentData.Marks, 160);
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
  async generateProjectPdf(ProjectID, sendTo) {
    const doc = new PDFDocument();
    const projectData = await this.repository.findProjectRecord(ProjectID);
    console.log(projectData);
    let mailTransport = nodemailer.createTransport({
      sendMail: true,
      service: "gmail",
      auth: {
        user: "devtest2498@gmail.com", // generated ethereal user
        pass: "rkmutjbzmdshsihl", // generated ethereal password
      },
    });
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);

      const mailOptions = {
        from: "devtest2498@gmail.com",
        to: sendTo,
        attachments: [
          {
            filename: "attachment.pdf",
            content: pdfData,
          },
        ],
      };

      mailOptions.subject = "PFA";
      mailOptions.text = "PDF attached";

      return mailTransport
        .sendMail(mailOptions)
        .then(() => {
          console.log("email sent:");
        })
        .catch((error) => {
          console.error("There was an error while sending the email:", error);
        });
    });
    doc.lineCap("butt").moveTo(270, 90).lineTo(270, 170).stroke();

    row(doc, 90);
    row(doc, 110);
    row(doc, 130);
    row(doc, 150);

    textInRowFirst(doc, "ProjectID", 100);
    textInRowFirst(doc, "ProjectName", 120);
    textInRowFirst(doc, "Budget", 140);
    textInRowFirst(doc, "EndDate", 160);
    textInRowSecond(doc, projectData.ProjectID, 100);
    textInRowSecond(doc, projectData.ProjectName, 120);
    textInRowSecond(doc, projectData.Budget, 140);
    textInRowSecond(doc, projectData.EndDate, 160);
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

module.exports = EmailService;
