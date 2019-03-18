import { TurnContext } from 'botbuilder';
import { NlpEntity, NlpResult } from 'wolf-core';

const greetTest = new RegExp('hi');
const nameRecognizer = (input: string): NlpEntity => {
  const nameReg = /my name is (\w*)/;
  const result = nameReg.exec(input);
  if (!result) {
    return null;
  }
  return {
    name: 'name',
    value: result[1],
    text: result[1],
  };
};

export default (context: TurnContext): NlpResult => {
  const isGreeting = greetTest.test(context.activity.text);
  if (isGreeting) {
    const nameFound = nameRecognizer(context.activity.text);
    if (nameFound) {
      return {
        message: context.activity.text,
        intent: 'greet',
        entities: [nameFound],
      };
    }
    return {
      message: context.activity.text,
      intent: 'greet',
      entities: [],
    };
  }

  return {
    message: context.activity.text,
    intent: null,
    entities: [],
  };
};