import { Context } from 'hono';
import { env } from 'hono/adapter';

type ENV = {
  DEEPL_API_KEY: string;
};

export const getEnv = (c: Context) => env<ENV>(c);
