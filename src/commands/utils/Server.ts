import { CommandoClient, Command, CommandoMessage } from 'discord.js-commando';
import { Embed } from '../../utils/Embed';

module.exports = class ServerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'server',
      aliases: ['sv'],
      group: 'utils',
      memberName: 'server-guild',
      description: 'Retorna informaciónn del servidor actual',
    });
  }

  async run(msg: CommandoMessage) {
    const msgEmbed = msg.guild.available
      ? Embed.ServerEmbed(msg)
      : Embed.MessageEmbed('Servidor no disponible');
    return msg.channel.send(msgEmbed);
  }
};
