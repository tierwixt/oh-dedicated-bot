// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as dotenv from 'dotenv'
dotenv.config()
import { BotFrameworkAdapter, ConversationState, MemoryStorage } from 'botbuilder';
import { createBotbuilderStorageLayer, createWolfStorageLayer } from 'wolf-botbuilder';


import * as restify from 'restify';

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.

// This bot's main dialog.
import { MyBot } from './bot';

// Create HTTP server.
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${ server.name } listening to ${ server.url }`);
});

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about .bot file its use and bot configuration.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const conversationStorageLayer = createBotbuilderStorageLayer<object>(conversationState);
const wolfStorageLayer = createWolfStorageLayer(conversationState);

// Catch-all for errors.
adapter.onTurnError = async (context, error) => {
    // This check writes out errors to console log .vs. app insights.
    console.error(`\n [onTurnError]: ${ error }`);
    // Send a message to the user
    await context.sendActivity(`Oops. Something went wrong!`);
};

// Create the main dialog.
const myBot = new MyBot(wolfStorageLayer, conversationStorageLayer);

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await myBot.onTurn(context);
    });
});
