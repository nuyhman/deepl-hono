import 'dotenv/config';

import { serve } from '@hono/node-server';
import { env } from 'hono/adapter';
import { Hono } from 'hono';

import { Translator, type TextResult } from 'deepl-node';
import { ENV, ITranslateRequest } from './type';

const app = new Hono();

app.post('/translate', async c => {
  const { DEEPL_API_KEY: authKey } = env<ENV>(c);
  const translator = new Translator(authKey);
  try {
    const { texts, targetLang }: ITranslateRequest = await c.req.json();

    if (!texts || texts.length === 0 || !targetLang) {
      return c.text('Invalid input. Provide texts and a target language.', {
        status: 400,
      });
    }

    const results = await translator.translateText(texts, null, targetLang);
    const translatedTexts = results.map((result: TextResult) => result.text);

    return c.json(translatedTexts);
  } catch (error) {
    console.error('Error during translation:', error);
    return c.text('An error occurred during translation.', { status: 500 });
  }
});

console.log(`🚀 Server is running on port 3000`);

serve(app); // Port number, default is 3000

export default app;
