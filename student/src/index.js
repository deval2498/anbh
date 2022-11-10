const express = require("express");
const { PORT } = require("./config");
const expressApp = require("./express-app");
const { databaseConnection } = require("./database");
const StartServer = async () => {
  const app = express();
  await databaseConnection();
  await expressApp(app);
  app.listen(PORT, () => {
    console.log(`Listening to Port:${PORT}`);
  });
};
StartServer();
