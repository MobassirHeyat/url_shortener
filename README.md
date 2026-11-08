# URL Shortener

A URL shortener built with Express and MongoDB. Paste a long URL and get back a short link. When someone opens the short link, the server redirects them to the original URL.

## Features

- Generates an 8-character short code for each URL
- Stores the mapping between the short code and the original URL in MongoDB
- Redirects short links to the original URL
- CORS enabled, so a separate frontend can call the API

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose
- **Short codes:** nanoid
- **Other:** cors, dotenv, axios

## Getting Started

### Prerequisites

- Node.js 18 or later
- A MongoDB database, either running locally or hosted (such as MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/MobassirHeyat/url_shortener.git
cd url_shortener
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Never commit `.env`. Add it to `.gitignore`.

### 4. Start the server

```bash
node index.js
```

The server runs at `http://localhost:3000`.

## API Reference

### Create a short URL

```
POST /api/shorten
```

Request body:

```json
{
  "data": {
    "url": "https://example.com/some/very/long/path?with=query"
  }
}
```

Response (`201 Created`):

```json
{
  "originalUrl": "https://example.com/some/very/long/path?with=query",
  "shortCode": "aB3xK9_q",
  "_id": "665f1c2e9b1d4a0012ab34cd",
  "createdAt": "2026-11-08T10:00:00.000Z",
  "updatedAt": "2026-11-08T10:00:00.000Z",
  "__v": 0
}
```

The short link is `http://localhost:3000/<shortCode>`.

### Redirect to the original URL

```
GET /:shortcode
```

Opening `http://localhost:3000/aB3xK9_q` in a browser redirects to the original URL with a `302 Found` response.

### Example

```bash
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"data":{"url":"https://example.com"}}'
```

## How It Works

1. The client sends a long URL to `POST /api/shorten`.
2. The server generates an 8-character code with `nanoid`.
3. The server saves `originalUrl` and `shortCode` in the `urls` collection.
4. When someone visits `/<shortCode>`, the server looks up the code and redirects to the stored URL.

## Project Structure

```
url_shortener/
├── index.js          # Entry point: starts the server and connects to MongoDB
├── app.js            # Express app: middleware and routes
├── models/
│   └── url.js        # Mongoose model with originalUrl and shortCode
├── package.json
└── .env              # Local environment variables (not committed)
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `node index.js` | Start the server |
| `npm test` | Not configured yet |

## Known Limitations

- Invalid or missing URLs are not validated.
- An unknown short code causes a server error instead of a 404 response.
- Short codes are not guaranteed unique at the database level.

## Roadmap

- [ ] Validate that the URL starts with `http://` or `https://`
- [ ] Return 404 for unknown short codes
- [ ] Add a unique index on `shortCode`
- [ ] Track click counts
- [ ] Support custom aliases
- [ ] Set expiry dates for links

## License

ISC
