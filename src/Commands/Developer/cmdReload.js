const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
} = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler");
const ConsoleLogger = require("../../Structures/Classes/consoleLogger");
const logger = new ConsoleLogger();

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload your commands/events")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options.setName("events").setDescription("Reload your Events")
    )
    .addSubcommand((options) =>
      options.setName("commands").setDescription("Reload your Commands")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case "events":
        for (const [key, value] of client.events)
          client.removeListener(`${key}`, value, true);
        loadEvents(client);
        interaction.reply({ content: "Reloaded Events", ephemeral: true });
        logger.info("Reloaded Events");
        break;

      case "commands":
        loadCommands(client);
        interaction.reply({ content: "Reloaded Commands", ephemeral: true });
        logger.info("Reloaded Commands");
        break;
    }
  },
};
