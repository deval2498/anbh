const express = require("express");
const cors = require("cors");
const { email } = require("./api");
const { CreateChannel } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());

  //api
  //   appEvents(app);
  const channel = await CreateChannel();
  email(app, channel);
};
