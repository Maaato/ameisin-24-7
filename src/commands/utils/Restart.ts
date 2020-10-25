import { CommandoClient, Command, CommandoMessage } from 'discord.js-commando';
import { Embed } from '../../utils/Embed';

module.exports = class RestartCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'restart',
      aliases: ['restart', 'reboot'],
      group: 'utils',
      memberName: 'restart-guild',
      description: 'Reinicia el cliente discord.',
    });
  }

  async run(msg: CommandoMessage) {
    if (msg.author.id !== process.env.OWNER_ID) {
      return msg.channel
        .send(
          Embed.MessageEmbed(`No tienes permisos para ejecutar este comando`)
        )
        .then((msg) => {
          return msg.delete({ timeout: 3000 });
        });
    }
    return msg.channel
      .send(Embed.MessageEmbed('Reiniciando...'))
      .then(async (msg) => {
        this.client.destroy();
        await this.client.login(process.env.DISCORD_TOKEN);
        return msg.edit(Embed.MessageEmbed(`Reiniciado.`));
      })
      .then((msg) => {
        return msg.delete({ timeout: 3000 });
      });
  }
};
