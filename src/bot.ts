// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as wolf from 'wolf-core';

import abilities from './abilities';
import nlp from './nlp';
import { transformLuisToNlpResult } from './helpers/luis';
import { TurnContext } from 'botbuilder';

export interface IConversationData {
    name?: string; // this is where your name is going to be stored
}

const luisEndpoint = process.env.LUIS_ENDPOINT

const callLuis = (context: TurnContext): Promise<wolf.NlpResult> => {
    return fetch(luisEndpoint + context.activity.text)
        .then((res) => res.json())
        .then((luisResult) => transformLuisToNlpResult(luisResult))
}
export class MyBot {

    /* Add the following code in your Bot class*/
    private wolfStorageLayer: wolf.StorageLayerFactory<TurnContext, wolf.WolfState>;
    private conversationStorageLayer: wolf.StorageLayerFactory<TurnContext, IConversationData>;

    constructor(
        wolfStorageLayer: wolf.StorageLayerFactory<TurnContext, wolf.WolfState>,
        conversationStorageLayer: wolf.StorageLayerFactory<TurnContext, IConversationData>,
    ) {
        this.wolfStorageLayer = wolfStorageLayer;
        this.conversationStorageLayer = conversationStorageLayer;
    }

    /**
     * Use onTurn to handle an incoming activity, received from a user, process it, and reply as needed
     *
     * @param {TurnContext} turnContext context object.
     */
    public onTurn = async (turnContext: TurnContext) => {
        // Has to be a message, ignores all other activity (such as conversation update events)
        if (turnContext.activity.type !== 'message') {
            return;
        }

        /* Put the follow code in the onTurn method body */
        const wolfResult = await wolf.run(
            this.wolfStorageLayer(turnContext),
            this.conversationStorageLayer(turnContext, {}),
            () => callLuis(turnContext),
            () => abilities,
            'formFill',
        );

        const sendActivities = wolfResult.messageStringArray.map((message) => turnContext.sendActivity(message));
        await Promise.all(sendActivities);
    }
}
