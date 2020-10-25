import { GuildMember, VoiceChannel } from 'discord.js';
import { CommandoClient, Command, CommandoMessage } from 'discord.js-commando';
import { Embed } from '../../utils/Embed';

module.exports = class UnmuteCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'unmute',
      aliases: ['unmute'],
      examples: ['unmute @user', 'unmute all', 'unmute'],
      group: 'utils',
      memberName: 'unmute-guild',
      description:
        'Desmutea un miembro mencionado, a todos los miembros , o a ti mismo',
      args: [
        {
          key: 'key',
          prompt: 'A quien deseas desmutear?',
          type: 'string',
          default: '',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { key }: { key: string }) {
    const voiceChannel: VoiceChannel = msg.member.voice.channel!;
    if (!voiceChannel) {
      return msg.channel
        .send(
          Embed.MessageEmbed(
            `${msg.member.user.username} no estas en canal de voz`
          )
        )
        .then((msg) => msg.delete({ timeout: 3000 }));
    }

    if (key === 'all') {
      for (const member of voiceChannel.members) {
        if (member[1].voice.mute) {
          member[1].voice.setMute(false);
        }
      }
      return msg.channel
        .send(
          Embed.MessageEmbed(
            `Todos los miembros de ${voiceChannel.name.toLocaleUpperCase()} han sido desmuteados`
          )
        )
        .then((msg) => msg.delete({ timeout: 3000 }));
    }

    const toMute: GuildMember = msg.mentions.members?.first() || msg.member;
    for (const member of voiceChannel.members) {
      if (member[0] == toMute?.id) {
        if (member[1].voice.mute) {
          member[1].voice.setMute(false);
          return msg.channel
            .send(
              Embed.MessageEmbed(`${toMute.user.username} ha sido desmuteado`)
            )
            .then((msg) => msg.delete({ timeout: 3000 }));
        }
        return msg.channel
          .send(
            Embed.MessageEmbed(
              `${toMute.user.username} ya se encuentra desmuteado`
            )
          )
          .then((msg) => msg.delete({ timeout: 3000 }));
      }
    }
    return null;
  }
};
