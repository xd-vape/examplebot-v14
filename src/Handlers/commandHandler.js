const { loadFiles } = require("../Functions/fileLoader");
const ConsoleLogger = require("../Structures/Classes/consoleLogger");
require("dotenv").config();

const logger = new ConsoleLogger();

async function loadCommands(client) {
  // console.time("Commands Loaded");

  await client.commands.clear();
  await client.subCommands.clear();

  const commands = [];
  const commandsArray = [];
  const files = await loadFiles("Commands");

  for (const file of files) {
    try {
      const command = require(file);

      if (command.subCommand) {
        client.subCommands.set(command.subCommand, command);
      } else {
        const { name } = command.data;
        command.cooldown = command.cooldown ?? 5;
        client.commands.set(name, command);
        commands.push({
          Command: name,
          Status: "✅",
        });
        commandsArray.push(command.data.toJSON());
      }
    } catch (error) {
      const commandName = file.split("/").pop().slice(0, -3);
      commands.push({
        Command: commandName,
        Status: "🛑",
        Error: error.toString(),
      });
      console.log(error);
    }
  }

  client.application.commands.set(commandsArray);
  console.table(commands, ["Command", "Status", "Error"]);
  logger.info(`\x1b[36mLoaded ${commands.length} commands.\x1b[0m`);
  // logger.timeEnd("Commands Loaded");
}

module.exports = { loadCommands };
