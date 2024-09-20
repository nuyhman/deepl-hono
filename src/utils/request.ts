import app from '../index';

export const post = async <T>(url: string, body: T) => {
  return await app.request(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
