import { CommandoClient, Command, CommandoMessage } from 'discord.js-commando';
import { Message, Collection } from 'discord.js';
import { Embed } from '../../utils/Embed';
import { Logger } from '../../utils/Logger';
module.exports = class CleanupCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'cleanup',
      aliases: ['cleanup', 'cls'],
      examples: ['cleanup 10'],
      guarded: true,
      group: 'utils',
      memberName: 'cleanup-guild',
      description: 'Elimina **X** cantidad de mensajes de un canal.',
      args: [
        {
          key: 'limit',
          prompt: 'Numero de mensajes a eliminar.',
          type: 'integer',
          default: 1,
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { limit }: { limit: number }) {
    if (!(limit > 0 && limit <= 100)) {
      return msg.channel
        .send(Embed.MessageEmbed('Limite valido entre 1-100'))
        .then((msg) => msg.delete({ timeout: 3000 }));
    }

    const msgs: Collection<string, Message> = await msg.channel.messages.fetch({
      limit: limit,
    });

    msgs.forEach(async (currentMsg: Message) => {
      try {
        await currentMsg.delete();
      } catch (err) {
        Logger.error(err);
      }
    });
    return msg.channel
      .send(Embed.MessageEmbed(`${msgs.size} Mensajes Eliminados`))
      .then((msg) => msg.delete({ timeout: 3000 }));
  }
};
