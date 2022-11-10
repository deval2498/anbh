const dotenv = require("dotenv");
dotenv.config({ path: ".././.env" });
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  STUDENT_SERVICE: "student_service",
  EMAIL_SERVICE: "email_service",
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
};
