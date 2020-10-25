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
}

export { Embed };
