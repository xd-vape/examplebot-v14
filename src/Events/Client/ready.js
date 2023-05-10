const { version } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const ConsoleLogger = require("../../Structures/Classes/consoleLogger");
const logger = new ConsoleLogger();

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    loadCommands(client);

    setTimeout(async () => {
      logger.success(`Client • ready to use (v.${version})\n---`);
    }, 1000);
  },
};
