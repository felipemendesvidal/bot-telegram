
const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require( 'telegraf');
const axios = require('axios');
const fs = require('fs');

// const bot = new TelegramBot('5991982058:AAHBogKmtAKTRzclALqkluj5oK9cojW5s5I', {polling: true});

const bot = new Telegraf('5991982058:AAHBogKmtAKTRzclALqkluj5oK9cojW5s5I');

bot.on('text', async (ctx) => {
  const text = ctx.message.text;

  if (text.startsWith('http://') || text.startsWith('https://')) {
    const fileUrl = text; // A URL do arquivo é a mensagem do usuário

    try {
      const response = await axios.get(fileUrl, { responseType: 'stream' });

      ctx.replyWithDocument({ source: response.data });
    } catch (error) {
      ctx.reply(`Opa, algo deu errado: ${error}`);
    }
  } else {
    ctx.reply("Por favor, envie uma URL válida.");
  }
});

bot.launch();

console.log('rodando');