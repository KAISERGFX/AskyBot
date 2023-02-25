import WAWebJS from "whatsapp-web.js";
import chalk from 'chalk';

const { Client } = WAWebJS;

const client = new Client();

// Messages Handler
client.on('message', async (msg) => {
  const chat = await msg.getChat();
  const contact = await msg.getContact();
  console.log(chalk.cyan(`💬 ${contact.pushname} : ${msg.body}\n`));

  try {
    switch (msg.body.toLowerCase()) {
      case '!stiker':
      case '!sticker':
      case 'st':
        if(msg.hasMedia){
          const media = await msg.downloadMedia();
          chat.sendMessage(media,
            {
              sendMediaAsSticker: true,
              stickerName: 'github.com/Aromakelapa',
              stickerAuthor: '/whatsapp-bot-sticker'
            }
          );
          console.log(chalk.green(`💬 ${contact.pushname} : Sticker sent!\n`));
        } else {
          msg.reply('Send image with caption !sticker');
      };
        break;
      case '!error':
        // console.log(new Error());
        new Error();
        break;
    }
  } catch (error) {
    console.error(error);
  };
});
