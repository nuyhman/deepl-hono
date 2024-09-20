import { post } from './utils/request';

describe('POST /translate', () => {
  let res: Response;
  const reqBody = {
    texts: ['Hello World!', 'How are you?'],
    targetLang: 'DE',
  };

  it('should return translated texts', async () => {
    res = await post('/translate', reqBody);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(['Hallo Welt!', 'Wie geht es Ihnen?']);
  });

  it('should return 400 for empty text array', async () => {
    res = await post('/translate', {
      texts: [],
      targetLang: 'DE',
    });
    expect(res.status).toBe(400);
    expect(await res.text()).toBe('Invalid provided texts.');
  });

  it('should return 400 for invalid target language', async () => {
    res = await post('/translate', {
      texts: ['Hello World!'],
      targetLang: 'VN',
    });
    expect(res.status).toBe(400);
    expect(await res.text()).toBe('Invalid target language.');
  });
});
