import Axios from 'axios';
import { CommandoClient, Command, CommandoMessage } from 'discord.js-commando';
import { Embed } from '../../utils/Embed';

module.exports = class W2gCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'w2g',
      aliases: ['w2g'],
      group: 'generate',
      memberName: 'w2g-guild',
      description: 'Genera una sala de Watch2Gether.',
    });
  }

  async run(msg: CommandoMessage) {
    const msgEdit = await msg.channel.send(
      Embed.MessageEmbed('Generando Sala...')
    );
    const { data } = await Axios.post('https://w2g.tv/rooms/create.json', {
      w2g_api_key: process.env.W2G_TOKEN,
      bg_color: '#070720',
      bg_opacity: '100',
    });
    return msgEdit
      .edit(
        Embed.MessageEmbed(`W2G Link: https://w2g.tv/rooms/${data.streamkey}`)
      )
      .then((msg) => msg.delete({ timeout: 60000 }));
  }
};
