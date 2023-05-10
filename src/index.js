require("dotenv").config();
const { Collection } = require("discord.js");
const client = require("./Structures/Classes/discordClient");
const { loadEvents } = require("./Handlers/eventHandler");

console.clear();

client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();

loadEvents(client);

client.login(process.env.TOKEN);
