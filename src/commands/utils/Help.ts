import { CommandoClient, Command, CommandoMessage } from 'discord.js-commando';
import { Embed } from '../../utils/Embed';

module.exports = class HelpCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'help',
      aliases: ['help'],
      group: 'utils',
      memberName: 'help-guild',
      description:
        'Muestra una lista de comandos disponibles o información detallada para un comando específico.',
      args: [
        {
          key: 'command',
          prompt: 'Descripción de un comando especifico.',
          type: 'string',
          default: '',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { command }: { command: string }) {
    if (command) {
      const commandFinded: Command[] = this.client.registry.findCommands(
        command,
        true,
        msg
      );
      if (commandFinded.length === 1) {
        const embed = Embed.commandEmbed(msg, commandFinded[0]);
        return msg.channel.send(embed);
      } else {
        return msg.channel
          .send(
            Embed.MessageEmbed(
              `Comando ${command} no encontrado. Usa ${process.env.DISCORD_PREFIX}help para ver los comandos disponibles`
            )
          )
          .then((msg) => msg.delete({ timeout: 3000 }));
      }
    }

    return msg.channel.send(Embed.AllCommandsEmbed(msg, this.client));
  }
};
