import app from './index';
import { ITranslateRequest } from './type';

const sendRequest = async <T>(url: string, body: T) => {
  return app.request(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

describe('POST /translate', () => {
  1;
  let res: Response;
  const reqBody: ITranslateRequest = {
    texts: ['Hello World!', 'How are you?'],
    targetLang: 'de',
  };

  it('should return status 200', async () => {
    res = await sendRequest('/translate', reqBody);
    expect(res.status).toBe(200);
  });

  it('should return translated texts', async () => {
    res = await sendRequest('/translate', reqBody);
    expect(await res.json()).toEqual(['Hallo Welt!', 'Wie geht es Ihnen?']);
  });

  it('should return status 400', async () => {
    res = await sendRequest('/translate', {
      texts: [],
      targetLang: '',
    });
    expect(res.status).toBe(400);
  });

  it('should return no texts provided ', async () => {
    res = await sendRequest('/translate', {
      texts: [],
      targetLang: '',
    });
    expect(await res.text()).toBe(
      'Invalid input. Provide texts and a target language.'
    );
  });
});
