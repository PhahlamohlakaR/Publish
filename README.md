# Agri Text Simulator

## Run locally

Install Node.js 20 or newer, then run:

```sh
npm start
```

Open <http://localhost:3000>. The `/health` endpoint returns a JSON health status.

## Deploy as a Node web service

Push the project files to a GitHub repository, then create a Node web service on your hosting provider with:

- **Build command:** `npm install`
- **Start command:** `npm start`
- **Health check path:** `/health`

The server listens on the `PORT` environment variable provided by the host. It serves only the app's HTML and JavaScript files, plus `/health` and `/healthz`.

## Deploy with Docker

Build and run the included container:

```sh
docker build -t agri-text-simulator .
docker run --rm -p 3000:3000 agri-text-simulator
```
