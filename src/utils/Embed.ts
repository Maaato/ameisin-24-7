import { CommandoMessage, Argument, CommandoClient } from 'discord.js-commando';
import { MessageEmbed } from 'discord.js';

class Embed {
  static MessageEmbed(msg: string): MessageEmbed {
    return new MessageEmbed({
      color: 0xe51629,
      timestamp: new Date(),
      description: `**${msg}**`,
      footer: {
        icon_url: `${process.env.CLOUD_HOST}/maaatocloud/image/upload/v1603468885/ameisin_bot_logo.png`,
        text: 'Ameisin 24/7',
      },
    });
  }

  static commandEmbed(msg: CommandoMessage, command: any): MessageEmbed {
    const embed: MessageEmbed = new MessageEmbed({
      description: `A continuación se muestran algunos ejemplos de uso, alias y descripción del comando **\`${command.name}\`**.\n Nota: *<opcional>* | *(requerido)*`,
      footer: {
        icon_url: `${process.env.CLOUD_HOST}/maaatocloud/image/upload/v1603468885/ameisin_bot_logo.png`,
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
        icon_url: `${process.env.CLOUD_HOST}/maaatocloud/image/upload/v1603468885/ameisin_bot_logo.png`,
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
        embed.addField(grp.name, cmds);
      });
    return embed;
  }
}

export { Embed };
