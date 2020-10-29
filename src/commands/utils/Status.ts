import { CommandoClient, Command, CommandoMessage } from 'discord.js-commando';
import { Embed } from '../../utils/Embed';

module.exports = class StatusCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'status',
      aliases: ['status'],
      group: 'utils',
      memberName: 'status-guild',
      description: 'Retorna información de AMS24/7.',
    });
  }

  async run(msg: CommandoMessage) {
    return msg.channel.send(Embed.BotEmbed(this.client));
  }
};
