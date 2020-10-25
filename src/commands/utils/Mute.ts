import { GuildMember, Message, VoiceChannel } from 'discord.js';
import { CommandoClient, Command, CommandoMessage } from 'discord.js-commando';
import { Embed } from '../../utils/Embed';

module.exports = class MuteCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'mute',
      aliases: ['mute'],
      examples: ['mute @user', 'mute all', 'mute'],
      group: 'utils',
      memberName: 'mute-guild',
      description:
        'Silencia un miembro mencionado, a todos los miembros , o a ti mismo',
      args: [
        {
          key: 'key',
          prompt: 'A quien deseas mutear?',
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

    if (key) {
      if (key === 'all') {
        for (const member of voiceChannel.members) {
          console.log(member[1].user.username);
          if (!member[1].voice.mute) {
            member[1].voice.setMute(true);
          }
        }
        return msg.channel
          .send(
            Embed.MessageEmbed(
              `Todos los miembros de ${voiceChannel.name.toLocaleUpperCase()} han sido muteado`
            )
          )
          .then((msg) => msg.delete({ timeout: 3000 }));
      } else {
        for (const member of voiceChannel.members) {
          if (member[1].user.username == key) {
            if (!member[1].voice.mute) {
              member[1].voice.setMute(true);
              return msg.channel
                .send(
                  Embed.MessageEmbed(
                    `${member[1].user.username} ha sido muteado`
                  )
                )
                .then((msg) => msg.delete({ timeout: 3000 }));
            }
          }
        }
        return msg.channel
          .send(
            Embed.MessageEmbed(` ${key} no esta dentro de este canal de voz`)
          )
          .then((msg) => msg.delete({ timeout: 3000 }));
      }
    }
    const toMute: GuildMember = msg.mentions.members?.first() || msg.member;
    for (const member of voiceChannel.members) {
      if (member[0] == toMute?.id) {
        if (!member[1].voice.mute) {
          member[1].voice.setMute(true);
          return msg.channel
            .send(Embed.MessageEmbed(`${toMute.user.username} ha sido muteado`))
            .then((msg) => msg.delete({ timeout: 3000 }));
        }
        return msg.channel
          .send(
            Embed.MessageEmbed(
              `${toMute.user.username} ya se encuentra muteado`
            )
          )
          .then((msg) => msg.delete({ timeout: 3000 }));
      }
    }
    return null;
  }
};
