const { Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { resolve } = require("path");
const { display } = require("../utils/functions");

module.exports = (client) => {
  client.events = new Collection();
  const eventFiles = readdirSync(resolve("./events.js"));

  eventFiles.forEach((eventFile) => {
    const event = require(`./events${eventFile}`);
    display(`[EVENT] ${event.name} loaded`);
    client.events.set(event.name, event);
    client.on(event.name, (...args) => event.run(...args));
  });
};
