import { CommandoClient } from 'discord.js-commando';
import path from 'path';
import * as dotenv from 'dotenv';

import { Logger } from './utils/Logger';

dotenv.config();

const client: CommandoClient = new CommandoClient({
  commandPrefix: process.env.DISCORD_PREFIX,
  commandEditableDuration: 10,
  nonCommandEditable: true,
});

client.registry
  .registerGroups([['utils', 'music', 'radio']])
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', async () => {
  Logger.info(`${client.user?.tag} Iniciado!`);
  client.user?.setActivity(`: 🎶 Youtube 🎶`, { type: 'LISTENING' });
  console.log();
});

client.login(process.env.DISCORD_TOKEN);
