import { User } from 'discord.js';
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
      description: 'Retorna la información de un miembro del servidor.',
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
    const embed = infoMember
      ? Embed.ProfileEmbed(infoMember)
      : Embed.MessageEmbed(`Imposible acceder al miembro mencionado`);
    return msg.channel.send(embed);
  }
};
