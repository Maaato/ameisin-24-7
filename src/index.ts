import { CommandoClient } from 'discord.js-commando';
import { Logger } from './utils/Logger';

import * as dotenv from 'dotenv';

dotenv.config();

const client: CommandoClient = new CommandoClient({
  commandPrefix: process.env.DISCORD_PREFIX,
  commandEditableDuration: 10,
  nonCommandEditable: true,
});

client.on('ready', async () => {
  Logger.info(`${client.user?.tag} Iniciado!`);
  client.user?.setActivity(`: 🎶 Youtube 🎶`, { type: 'LISTENING' });
  console.log();
});

client.login(process.env.DISCORD_TOKEN);
