import 'dotenv/config';

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import translate from './api/translate';

const app = new Hono();

app.route('/translate', translate);

console.log(`🚀 Server is running on port 3000`);
serve(app); // Default is 3000

export default app;
