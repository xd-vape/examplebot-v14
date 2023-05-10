require("dotenv").config();
const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "Command is outdated",
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== "225571600311779329")
      return interaction.reply({
        content: "Command only available for the Developer",
      });

    command.execute(interaction, client);
  },
};
