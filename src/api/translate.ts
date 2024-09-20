import { Hono } from 'hono';
import { getEnv } from '../config/env';
import { TargetLanguageCode, Translator } from 'deepl-node';
import type { ILanguage, ITranslateRequest } from '../types';

const app = new Hono();

app.get('/', async c => {
  const { DEEPL_API_KEY } = getEnv(c);

  const response = await fetch(
    'https://api-free.deepl.com/v2/languages?type=target',
    {
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      },
    }
  );

  const targetLanguages = (await response.json()) as ILanguage[];
  return c.json(targetLanguages);
});

app.post('/', async c => {
  const { DEEPL_API_KEY: authKey } = getEnv(c);

  const translator = new Translator(authKey);

  try {
    const languagesResponse = await app.request('/');
    const languages = (await languagesResponse.json()) as ILanguage[];
    const targetLanguages = languages.map(lang => lang.language);
    const { texts, targetLang }: ITranslateRequest = await c.req.json();

    if (!texts || texts.length === 0) {
      return c.text('Invalid provided texts.', {
        status: 400,
      });
    }

    const upperCaseTargetLang = targetLang.toUpperCase() as TargetLanguageCode;

    if (!targetLanguages.includes(upperCaseTargetLang)) {
      return c.text('Invalid target language.', { status: 400 });
    }

    const results = await translator.translateText(
      texts,
      null,
      upperCaseTargetLang
    );
    const translatedTexts = results.map(result => result.text);

    return c.json(translatedTexts);
  } catch (error) {
    console.error('Error during translation:', error);
    return c.text('An error occurred during translation.', { status: 500 });
  }
});

export default app;
