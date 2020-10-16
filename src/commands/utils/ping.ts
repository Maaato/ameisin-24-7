import { CommandoClient, Command, CommandoMessage } from 'discord.js-commando';

module.exports = class PingCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'ping',
      aliases: ['ping'],
      group: 'bot',
      memberName: 'ping',
      description:
        'Calcula el ping entre enviar un mensaje y editarlo, lo que proporciona una buena latencia de ida y vuelta.',
    });
  }

  async run(msg: CommandoMessage) {
    const msgEdit = await msg.channel.send('Calculando...');
    return msgEdit.edit(
      `Latencia: ${
        msgEdit.createdTimestamp - msg.createdTimestamp
      } ms | API Latencia: ${Math.round(this.client.ws.ping)} ms`
    );
  }
};
