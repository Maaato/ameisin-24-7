import { GuildMember, User } from 'discord.js';
import { CommandoClient, Command, CommandoMessage } from 'discord.js-commando';
import { Embed } from '../../utils/Embed';

module.exports = class ProfileCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'profile',
      aliases: ['profile'],
      examples: ['profile @user', 'profile'],
      group: 'utils',
      memberName: 'profile-guild',
      description:
        'Calcula el ping entre enviar un mensaje y editarlo, lo que proporciona una latencia de ida y vuelta.',
      args: [
        {
          key: 'member',
          prompt: 'A quien deseas inspeccionar?',
          type: 'string',
          default: '',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { member }: { member: string }) {
    const infoMember: User | undefined = member
      ? msg.mentions.members?.first()?.user
      : msg.author;
    return msg.channel.send(Embed.ProfileEmbed(msg, infoMember));
  }
};
