const fs = require("fs");
const axios = require("axios");
const config = require("./config");
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(config.tg.token, { polling: true });
console.log("Bot is running...");

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Pong!");
});

async function sendTelegramPhoto(caption, photo, slug, movieId) {
  try {
    await bot.sendPhoto(config.tg.chatId, photo, {
      caption,
      reply_markup: {
        inline_keyboard: [
          [{ text: "Release Page", url: `${config.web.BASE_PATH}/movie/${slug}` }],
          [{ text: "Book Tickets", url: `${config.web.BASE_PATH}/buy-tickets-online/${movieId}` }],
        ],
      },
    });
    console.log("Photo sent successfully to the channel");
  } catch (error) {
    console.error("Error sending photo to the channel:", error);
  }
}

const fetchData = async () => {
  try {
    console.log("Fetching data...", config.web.SCOPE);
    const response = await axios.get(config.web.SCOPE);
    return response.data.movieList;
  } catch (error) {
    console.error(error);
  }
};

const saveData = (data, filename) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

const loadData = (filename) => {
  if (fs.existsSync(filename)) {
    const data = fs.readFileSync(filename);
    return JSON.parse(data);
  }
  return null;
};

const checkForNewMovies = (oldMovies, newMovies) => {
  const currentTime = new Date().toLocaleTimeString();

  const oldMovieIds = new Set(oldMovies.map((movie) => movie.id));
  const newReleases = newMovies.filter((movie) => !oldMovieIds.has(movie.id));

  if (newReleases.length > 0) {
    console.log("=================================");
    console.log("New movie releases:", currentTime);
    console.log("=================================");
    newReleases.forEach((movie) => console.log(movie.name));

    if (newReleases.length >= 1) {
      for (const movie of newReleases) {
        const imageUrl = movie.image;
        const message = `🚨🚨🚨 Movie Release Alert 🚨🚨🚨\n\n${movie.name}\n\n${movie.synopsis}\n\nGenre: ${movie.genre.join(", ")}`;

        sendTelegramPhoto(message, imageUrl, movie.slug, movie.id);
      }
    }

    return newReleases;
  }
};

const main = async () => {
  const filename = "./data.json";
  const oldMovies = loadData(filename) || [];

  const currentTime = new Date().toLocaleTimeString();

  try {
    const newMovies = await fetchData();
    if (newMovies) {
      if (oldMovies.length === 0) {
        saveData(newMovies, filename);
        console.log(`Data saved at ${currentTime}`);
      } else {
        const newRelease = checkForNewMovies(oldMovies, newMovies);
        if (!newRelease) return;

        saveData(newMovies, filename);
        console.log(`Data saved at ${currentTime}`);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

main();

setInterval(main, 0.5 * 60 * 1000);
