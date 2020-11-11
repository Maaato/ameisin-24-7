import * as moment from 'moment';
import 'moment-duration-format';
import {
  CommandoMessage,
  Argument,
  CommandoClient,
  version as djsCommandoVersion,
} from 'discord.js-commando';
import { MessageEmbed, User, version as djsVersion } from 'discord.js';

class Embed {
  static MessageEmbed(msg: string): MessageEmbed {
    return new MessageEmbed({
      color: 0xe51629,
      timestamp: new Date(),
      description: `**${msg}**`,
      footer: {
        icon_url: `${process.env.CLOUD_HOST}/maaatocloud/image/upload/v1604787795/ams_logo.png`,
        text: 'Ameisin 24/7',
      },
    });
  }

  static commandEmbed(msg: CommandoMessage, command: any): MessageEmbed {
    const embed: MessageEmbed = new MessageEmbed({
      description: `A continuación se muestran algunos ejemplos de uso, alias y descripción del comando **\`${command.name}\`**.\n Nota: *<opcional>* | *(requerido)*`,
      footer: {
        icon_url: `${process.env.CLOUD_HOST}/maaatocloud/image/upload/v1604787795/ams_logo.png`,
        text: 'Ameisin 24/7',
      },
      timestamp: new Date(),
      color: 0xe51629,
    });
    embed.addField(
      'Uso:',
      `**${process.env.DISCORD_PREFIX} ${command.name} ${
        command.argsCollector
          ? command.argsCollector.args
              .map((a: Argument) =>
                a.default !== null ? `<${a.key}>` : `(${a.key})`
              )
              .join(' ')
          : command.format
          ? command.format
          : ''
      }**\n`,
      true
    );

    if (command.examples) {
      embed.addField(
        `Ejemplo:`,
        command.examples
          .map(
            (e: string[]) =>
              `**${
                msg.guild ? msg.guild.commandPrefix : process.env.DISCORD_PREFIX
              }${e}**`
          )
          .join(' | '),
        true
      );
    }

    if (command.aliases) {
      embed.addField(
        'Alias:',
        command.aliases.map((a: string[]) => `**${a}**`).join(' | '),
        true
      );
    }
    if (command.description) {
      embed.addField('Descripción:', command.description);
    }
    return embed;
  }

  static AllCommandsEmbed(
    msg: CommandoMessage,
    client: CommandoClient
  ): MessageEmbed {
    const embed: MessageEmbed = new MessageEmbed({
      description: `Aquí hay una lista de comandos y sus respectivas categorías.\nSi desea obtener más detalles sobre un comando, puede usar ${
        process.env.DISCORD_PREFIX
      }help <command>.\n\nComandos Disponibles en **${msg.guild || 'DM'}**`,
      footer: {
        icon_url: `${process.env.CLOUD_HOST}/maaatocloud/image/upload/v1604787795/ams_logo.png`,
        text: 'Ameisin 24/7',
      },
      timestamp: new Date(),
      color: 0xe51629,
    });

    client.registry.groups
      .filter((grp) => grp.commands.some((cmd) => !cmd.hidden))
      .map((grp) => {
        const cmds = grp.commands
          .filter((cmd) => !cmd.hidden)
          .map(
            (cmd) =>
              `**${msg.guild ? msg.guild.commandPrefix : client.commandPrefix}${
                cmd.name
              }**\n${cmd.description}`
          )
          .join('\n\n');
        embed.addField(`▸ __${grp.name}__`, cmds);
      });
    return embed;
  }

  static ProfileEmbed(infoMember: User | undefined): MessageEmbed {
    const embedReturn = new MessageEmbed({
      title: `**__${infoMember?.username}__**`,
      color: 0xe51629,
      timestamp: new Date(),
      thumbnail: {
        url: infoMember?.displayAvatarURL({ dynamic: true }),
      },
      fields: [
        {
          name: 'ID',
          value: infoMember?.id,
        },
        {
          name: 'TAG',
          value: `${infoMember?.tag}`,
        },
        {
          name: 'Created at',
          value: `${infoMember?.createdAt.toDateString()} ${infoMember?.createdAt.toLocaleTimeString()}`,
        },
      ],
      footer: {
        icon_url: `${process.env.CLOUD_HOST}/maaatocloud/image/upload/v1604787795/ams_logo.png`,
        text: 'Ameisin 24/7',
      },
    });

    infoMember!.presence.activities.length > 0
      ? infoMember?.presence.activities[0].state
        ? embedReturn.addField(
            'Custom State',
            `${infoMember!.presence.activities[0].state}`
          )
        : null
      : null;

    infoMember!.presence.activities.slice(1).forEach((act) => {
      embedReturn.addField(
        `• ${act.type
          .charAt(0)
          .toUpperCase()
          .concat(act.type.slice(1).toLocaleLowerCase())} ${act.name}`,
        `(${act.details?.trim().replace(/;/g, '')}) - (${act.state?.replace(
          /;/g,
          ''
        )})`
      );
    });
    return embedReturn;
  }

  static ServerEmbed(msg: CommandoMessage): MessageEmbed {
    return new MessageEmbed({
      title: `**__${msg.guild.name}__**`,
      color: 0xe51629,
      timestamp: new Date(),
      thumbnail: {
        url: msg.guild.iconURL({ dynamic: true })!,
      },
      fields: [
        {
          name: 'ID',
          value: msg.guild.id,
        },
        {
          name: 'Owner',
          value:
            msg.guild.members.cache
              .filter((m) => m.user.id === msg.guild.ownerID)
              .first()?.user.tag || msg.guild.ownerID,
        },
        {
          name: 'Region',
          value: msg.guild.region,
        },
        {
          name: 'Create At',
          value: msg.guild.createdAt.toDateString(),
        },
        {
          name: 'Members',
          value: `${
            msg.guild.members.cache.filter((m) => !m.user.bot).size
          } Users | ${
            msg.guild.members.cache.filter(
              (m) => m.user.presence.status === 'online' && !m.user.bot
            ).size
          } Online | ${
            msg.guild.members.cache.filter(
              (m) => m.user.presence.status === 'idle' && !m.user.bot
            ).size
          } idle | ${
            msg.guild.members.cache.filter(
              (m) => m.user.presence.status === 'dnd' && !m.user.bot
            ).size
          } dnd | ${
            msg.guild.members.cache.filter(
              (m) => m.user.presence.status === 'offline' && !m.user.bot
            ).size
          } offline`,
        },
        {
          name: 'Bots',
          value: `${
            msg.guild.members.cache.filter((m) => m.user.bot).size
          } Bots | ${
            msg.guild.members.cache.filter(
              (m) => m.user.presence.status === 'online' && m.user.bot
            ).size
          } Online | ${
            msg.guild.members.cache.filter(
              (m) => m.user.presence.status === 'idle' && m.user.bot
            ).size
          } idle | ${
            msg.guild.members.cache.filter(
              (m) => m.user.presence.status === 'dnd' && m.user.bot
            ).size
          } dnd | ${
            msg.guild.members.cache.filter(
              (m) => m.user.presence.status === 'offline' && m.user.bot
            ).size
          } offline`,
        },
      ],
      footer: {
        icon_url: `${process.env.CLOUD_HOST}/maaatocloud/image/upload/v1604787795/ams_logo.png`,
        text: 'Ameisin 24/7',
      },
    });
  }

  static BotEmbed(client: CommandoClient): MessageEmbed {
    return new MessageEmbed({
      title: `**__${client.user?.username}__**`,
      color: 0xe51629,
      timestamp: new Date(),
      thumbnail: {
        url: `${process.env.CLOUD_HOST}/maaatocloud/image/upload/v1604787795/ams_logo.png`,
      },
      fields: [
        {
          name: 'ID',
          value: client.user?.id,
        },
        {
          name: 'Owner',
          value: client.owners[0].tag,
        },
        {
          name: 'Uptime',
          value: moment
            .duration(client.uptime)
            .format(' D [days], H [hrs], m [mins], s [secs]'),
        },
        {
          name: 'Memory Usage',
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )} / ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(
            2
          )} MB`,
        },
        {
          name: 'AMS24/7',
          value: `v${process.env.npm_package_version}`,
        },
        {
          name: 'Discord.js-Commando',
          value: `v${djsCommandoVersion}`,
        },
        {
          name: 'Discord.js',
          value: `v${djsVersion}`,
        },
        {
          name: 'Nodejs',
          value: process.version,
        },
      ],
      footer: {
        icon_url: `${process.env.CLOUD_HOST}/maaatocloud/image/upload/v1604787795/ams_logo.png`,
        text: 'Ameisin 24/7',
      },
    });
  }
}

export { Embed };
