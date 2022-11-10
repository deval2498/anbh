const express = require("express");
const cors = require("cors");
const { student } = require("./api");
const { CreateChannel } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());

  //api
  // appEvents(app);
  const channel = await CreateChannel();
  student(app, channel);
};
