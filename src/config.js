require("dotenv").config();

const config = {
  tg: {
    token: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
  web: {
    SCOPE: process.env.SCOPE_URL,
  },
};

if (!config.tg.token) {
  throw new Error("TELEGRAM_BOT_TOKEN is not defined");
}

if (!config.tg.chatId) {
  throw new Error("TELEGRAM_CHAT_ID is not defined");
}

if (!config.web.SCOPE) {
  throw new Error("SCOPE_URL is not defined");
}

module.exports = config;
