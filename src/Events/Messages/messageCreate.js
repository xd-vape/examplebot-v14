const { Message } = require("discord.js");
const config = require("../../Structures/config");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   */
  async execute(message) {
    if (message.author.bot) return;

    if (message.channel.id === "837695830668083230") {
      for (const emoji of config.autoReactionEmojis) {
        message.react(emoji);
      }
    }
  },
};
