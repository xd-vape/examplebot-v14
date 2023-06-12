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

    for (const channelid of config.autoReactionChannel) {
      if (!channelid) return console.log("no channel");
      if (message.channel.id === channelid) {
        for (const emoji of config.autoReactionEmojis) {
          message.react(emoji);
        }
      }
    }
  },
};
