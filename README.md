# DeepL Translation API with Hono

This project provides a simple API for translating text using the DeepL API. It is built using the Hono framework and TypeScript.

## Prerequisites

- Node.js (>= 18.x)
- npm or yarn
- [DeepL API key](https://support.deepl.com/hc/en-us/articles/360020695820-API-Key-for-DeepL-s-API#h_01HM9MFQ195GTHM93RRY63M18W)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/deepl-hono-example.git
   cd deepl-hono-example
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a .env file in the root directory and add your DeepL API key:
   ```env
   DEEPL_API_KEY=your_deepl_api_key
   ```

## Usage

1. Start the server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
2. The server will start on port 3000 by default. You can access the API at `http://localhost:3000`.

## API Endpoints

### POST /translate

Translate text to a specified target language.

- URL: `/translate`
- Method: `POST`
- Request Body:

  - `texts` (array of strings): The texts to be translated.
  - `targetLang` (string): The target language code (e.g., `DE` for German, `FR` for French).

- Response:

  - `200 OK`: Returns the translated texts as an array of strings.
  - `400 Bad Request`: Returns an error message if the input is invalid.
  - `500 Internal Server Error`: Returns an error message if an error occurs during translation.

- Example Request:

  ```bash
  curl -X POST http://localhost:3000/translate \
      -H "Content-Type: application/json" \
      -d '{"texts": ["Hello, world!", "How are you?"], "targetLang": "DE"}'
  ```

- Example Response

  ```json
  ["Hallo Welt!", "Wie geht es Ihnen?"]
  ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
