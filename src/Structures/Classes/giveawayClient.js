const client = require("./discordClient");
const { GiveawaysManager } = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    embedColorEnd: "#000000",
    reaction: "🎉",
  },
});

module.exports = manager;
