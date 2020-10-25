import { CommandoClient, Command, CommandoMessage } from 'discord.js-commando';
import { Embed } from '../../utils/Embed';

module.exports = class PingCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'ping',
      aliases: ['ping'],
      group: 'utils',
      memberName: 'ping-guild',
      description:
        'Calcula el ping entre enviar un mensaje y editarlo, lo que proporciona una latencia de ida y vuelta.',
    });
  }

  async run(msg: CommandoMessage) {
    const msgEdit = await msg.channel.send(Embed.MessageEmbed('Calculando...'));
    return msgEdit
      .edit(
        Embed.MessageEmbed(
          `Latencia: ${
            msgEdit.createdTimestamp - msg.createdTimestamp
          } ms | API : ${Math.round(this.client.ws.ping)} ms`
        )
      )
      .then((msg) => msg.delete({ timeout: 3000 }));
  }
};
