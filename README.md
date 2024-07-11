# Telegram Movie Release Bot

This project is a Telegram bot that notifies a Telegram channel about new movie releases by fetching data from a specified web source.

## Features

- Fetches movie data from a web API.
- Checks for new movie releases.
- Sends notifications with movie details and images to a Telegram channel.

## Setup

### Prerequisites

- Node.js
- npm (Node Package Manager)
- A Telegram bot token
- A Telegram chat ID
- An API endpoint to fetch movie data

### Installation

1. Clone the repository:

```sh
git clone https://github.com/truethari/release-tracker.git
```

Install the dependencies:

```sh
npm install
```

Create a .env file in the root directory and add the following:

```js
TELEGRAM_BOT_TOKEN = your - telegram - bot - token;
TELEGRAM_CHAT_ID = your - telegram - chat - id;
SCOPE_URL = your - movie - api - endpoint;
```

## Configuration

The configuration is managed through the config.js file, which reads the environment variables from the .env file.

## Usage

- Start the bot:

```sh
node index.js
```

- The bot will start polling for new messages and checking for new movie releases every 30 seconds.

## Dependencies

- fs: File system module for reading and writing files.
- axios: Promise-based HTTP client for the browser and Node.js.
- node-telegram-bot-api: Node.js module to interact with the Telegram Bot API.
- dotenv: Module to load environment variables from a .env file.
