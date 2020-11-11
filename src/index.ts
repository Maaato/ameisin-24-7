import { CommandoClient } from 'discord.js-commando';
import path from 'path';
import * as dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import handlebars from 'express-handlebars';

import { Logger } from './utils/Logger';

dotenv.config();

const client: CommandoClient = new CommandoClient({
  commandPrefix: process.env.DISCORD_PREFIX,
  owner: process.env.OWNER_ID,
  commandEditableDuration: 10,
  nonCommandEditable: true,
});

client.registry
  .registerDefaultTypes()
  .registerGroups([['utils'], ['generate']])
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', async () => {
  client.user?.setActivity(`: 🎶 Youtube 🎶`, { type: 'LISTENING' });
});

const app: Application = express();
const port: string = process.env.PORT || '3000';
app.disable('x-powered-by');
app.use(express.static(`${__dirname}//..//views`));
app.engine(
  'hbs',
  handlebars({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: '',
  })
);
app.set('view engine', 'hbs');

app.get('/', (req: Request, res: Response) => {
  res.render('home', {
    client: {
      name: client.user?.username,
      owner: client.owners[0].tag,
      servers: client.guilds.cache.size,
      channels: client.channels.cache.size,
      members: client.guilds.cache
        .map((g) => g.memberCount)
        .reduce(function (a, b) {
          return a + b;
        }, 0),
    },
  });
});

app.get('*', (req: Request, res: Response) => {
  res.redirect('/');
});

client.login(process.env.DISCORD_TOKEN).then(() => {
  Logger.info(`${client.user?.tag} Iniciado!`);
  app.listen(port, () => {
    Logger.info(`${client.user?.username}:${port} Iniciado!`);
  });
});
