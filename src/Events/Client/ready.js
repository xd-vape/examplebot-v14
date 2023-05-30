require("dotenv").config();
const { version } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const ConsoleLogger = require("../../Structures/Classes/consoleLogger");
const logger = new ConsoleLogger();

const mongoose = require("mongoose");
const manager = require("../../Structures/Classes/giveawayClient");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    loadCommands(client);

    connectMongoDB();

    setTimeout(async () => {
      logger.success(`Client • ready to use (v.${version})\n---`);
    }, 1000);
  },
};

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.DATABASEURL);
    logger.success("Mongoose Database • connected");
  } catch (err) {
    logger.error(err);
  }
}
