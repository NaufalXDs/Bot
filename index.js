const Discord = require("discord.js");
const { Message } = require("discord.js");
require("dotenv").config();

const Image = require("./image");

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

let bot = { client, prefix: "d!", own: ["718259600117465158"] };

const commands = new Discord.Collection();
const events = new Discord.Collection();

module.exports = bot;

const loadEvents = require("./handlers/events");
const loadCommands = require("./handlers/commands");
const { existsSync } = require("fs");
const { resolve } = require("path");

if (existsSync(resolve("./.env"))) {
  require("dotenv").config();
}

const init = async () => {
  await loadCommands(client);
  loadEvents(client);
  client.login(process.env.TOKEN);
};

module.exports = bot;

// client.on("ready", () => {
//   console.log(`ready The bot ${client.user.tag}`);
// });

client.on("messageCreate", (message) => {
  if (message.content == "lol") {
    message.reply("tot");
  }
});

const channelwelcome = "966234095329869884";
client.on("guildMemberAdd", async (member) => {
  const Img = await Image(member);
  member.guild.channels.cache.get(channelwelcome).send({
    content: `<@${member.id}> Welcome`,
    files: [Img],
  });
});

client.login(process.env.Token);
