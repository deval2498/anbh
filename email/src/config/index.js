const dotenv = require("dotenv");
dotenv.config({ path: ".././.env" });
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  STUDENT_SERVICE: "student_service",
  EMAIL_SERVICE: "email_service",
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  QUEUE_NAME: "EMAIL_QUEUE",
};
