<div align="center">

# 🔗 Link-Kit

**A full-stack URL shortener with click tracking.**
Paste a long link, get a short one, share it, and watch the clicks come in.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Data Model](#data-model)
- [Known Limitations & Roadmap](#known-limitations--roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## About

**Link-Kit** is a URL shortener split into two parts:

- a **REST API** (Node.js, Express, TypeScript, MongoDB) that creates short links, redirects visitors to the original URL and counts every click, and
- a **React single-page app** (Vite, Tailwind CSS) where you can shorten links, copy them to your clipboard, see how many times each one has been used, and delete the ones you no longer need.

Each short link is a unique 10-character ID generated with [`nanoid`](https://github.com/ai/nanoid).

<!-- 📸 Add a screenshot or GIF of the app here:
![Link-Kit screenshot](./docs/screenshot.png)
-->

## Features

- **Shorten any URL.** Submit a link and get a unique 10-character short path back.
- **Input validation.** The API rejects empty values and anything that isn't a valid URL.
- **Duplicate protection.** Submitting a URL that has already been shortened returns a `409 Conflict`.
- **Redirect and click tracking.** Visiting a short link redirects to the original URL and increments its click counter.
- **Dashboard.** Lists all links, newest first, with the original URL, short path and click count.
- **One-click copy.** Copy the full short link to your clipboard.
- **Delete links.** Remove a link directly from the table.
- **Typed end to end.** TypeScript on both the client and the server.

## Tech Stack

| Layer    | Technology                                                                  |
| -------- | --------------------------------------------------------------------------- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, Axios, React Router             |
| Backend  | Node.js, Express 4, TypeScript, Mongoose 9, nanoid, CORS, dotenv            |
| Database | MongoDB (MongoDB Atlas or a local instance)                                 |
| Tooling  | ESLint, nodemon, tsx                                                        |

## Architecture

```
┌──────────────────────┐        HTTP / JSON        ┌──────────────────────┐        ┌──────────────┐
│  React + Vite (SPA)  │  ───────────────────────▶ │  Express REST API    │ ─────▶ │   MongoDB    │
│  localhost:3000      │  ◀─────────────────────── │  localhost:5001      │ ◀───── │              │
└──────────────────────┘                           └──────────────────────┘        └──────────────┘
                                                              ▲
                                                              │  GET /api/v1/short-url/:shortPath
                                                   Visitor ───┘  → click +1 → 302 redirect to original URL
```

## Project Structure

```
LinkKit/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                # MongoDB connection
│   │   ├── controllers/
│   │   │   └── url.controller.ts    # create / list / redirect / delete handlers
│   │   ├── models/
│   │   │   └── url.model.ts         # Mongoose schema
│   │   ├── routes/
│   │   │   └── url.routes.ts        # /short-url routes
│   │   ├── app.ts                   # Express app, middleware, route mounting
│   │   └── server.ts                # Entry point (env, DB connect, listen)
│   ├── nodemon.json                 # Dev-server config (runs src/server.ts via tsx)
│   ├── tsconfig.json
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── MainContent.tsx      # Fetches links, owns reload state
    │   │   ├── Form.tsx             # "Shorten URL" form
    │   │   ├── DataTable.tsx        # Links table with copy and delete actions
    │   │   └── Footer.tsx
    │   ├── helpers/Constants.ts     # API base URL from VITE_SERVER_URL
    │   ├── interfaces/URLData.ts    # Shared URL type
    │   ├── App.tsx
    │   └── main.tsx
    ├── vite.config.ts               # Dev server on port 3000
    └── package.json
```

## Getting Started

### Prerequisites

- **Node.js** 18 or newer (the project uses current versions of Vite, React and TypeScript)
- **npm**
- A **MongoDB** database: a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or a local MongoDB instance

### 1. Clone the repository

```bash
git clone https://github.com/dk-willing/LinkKit.git
cd LinkKit
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `backend/.env` file (see [Environment Variables](#environment-variables)):

```env
PORT=5001
DB_URL=mongodb+srv://<username>:<db_password>@<cluster-host>/linkkit?appName=LinkKit
DB_PASSWORD=your_database_password
```

Start the development server:

```bash
npm run dev
```

The API will be available at **http://localhost:5001**. You should see `Database connected successfully` in the console.

### 3. Set up the frontend

In a second terminal:

```bash
cd frontend
npm install
```

Create a `frontend/.env` file:

```env
VITE_SERVER_URL=http://localhost:5001/api/v1
```

Start the dev server:

```bash
npm run dev
```

The app opens at **http://localhost:3000**.

> **Note:** The backend only accepts requests from `http://localhost:3000` (see [Known Limitations](#known-limitations--roadmap)). Keep the frontend on that port during development.

## Environment Variables

### Backend (`backend/.env`)

| Variable      | Required | Description                                                                                          |
| ------------- | :------: | ---------------------------------------------------------------------------------------------------- |
| `PORT`        |    No    | Port the API listens on. Defaults to `5001`.                                                         |
| `DB_URL`      |   Yes    | MongoDB connection string. Keep the literal `<db_password>` placeholder, which is replaced at runtime. |
| `DB_PASSWORD` |   Yes    | Database password, substituted into `DB_URL` in place of `<db_password>`.                            |

### Frontend (`frontend/.env`)

| Variable          | Required | Description                                                           |
| ----------------- | :------: | --------------------------------------------------------------------- |
| `VITE_SERVER_URL` |   Yes    | Base URL of the API, e.g. `http://localhost:5001/api/v1`.             |

> ⚠️ **Never commit `.env` files.** Both are already covered by `.gitignore`. If a real password was ever pushed to a public repo, rotate it immediately.

## Available Scripts

### Backend

| Command         | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| `npm run dev`   | Start the API with hot reload (nodemon + tsx).                       |
| `npm run build` | Compile TypeScript to `dist/`, then start `dist/server.js`.          |
| `npm start`     | Run the compiled server from `dist/server.js`.                       |

### Frontend

| Command           | Description                                       |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server on port 3000.           |
| `npm run build`   | Type-check and create a production build.         |
| `npm run preview` | Preview the production build locally.             |
| `npm run lint`    | Lint the project with ESLint.                     |

## API Reference

**Base URL:** `http://localhost:5001/api/v1`

| Method   | Endpoint            | Description                                      |
| -------- | ------------------- | ------------------------------------------------ |
| `POST`   | `/short-url`        | Create a short URL                               |
| `GET`    | `/short-url`        | List all short URLs (newest first)               |
| `GET`    | `/short-url/:id`    | Redirect to the original URL and count a click   |
| `DELETE` | `/short-url/:id`    | Delete a short URL                               |

> The `:id` parameter means different things per method: for `GET` it is the **`shortPath`** (e.g. `V1StGXR8_Z`), and for `DELETE` it is the document's **MongoDB `_id`**.

### Create a short URL

`POST /short-url`

```bash
curl -X POST http://localhost:5001/api/v1/short-url \
  -H "Content-Type: application/json" \
  -d '{"fullPath": "https://example.com/some/very/long/link"}'
```

**`201 Created`**

```json
{
  "status": "success",
  "data": {
    "url": {
      "_id": "66f1b2c3d4e5f6a7b8c9d0e1",
      "fullPath": "https://example.com/some/very/long/link",
      "shortPath": "V1StGXR8_Z",
      "clicks": 0,
      "createdAt": "2026-10-05T14:03:00.000Z",
      "updatedAt": "2026-10-05T14:03:00.000Z"
    }
  }
}
```

**Errors**

| Status | When                                              |
| ------ | ------------------------------------------------- |
| `400`  | `fullPath` is missing, not a string, or not a valid URL |
| `409`  | The URL has already been shortened                |
| `500`  | Unexpected server error                           |

### List all URLs

`GET /short-url`

```bash
curl http://localhost:5001/api/v1/short-url
```

**`200 OK`**

```json
{
  "status": "success",
  "data": {
    "urls": [
      {
        "_id": "66f1b2c3d4e5f6a7b8c9d0e1",
        "fullPath": "https://example.com/some/very/long/link",
        "shortPath": "V1StGXR8_Z",
        "clicks": 3,
        "createdAt": "2026-10-05T14:03:00.000Z",
        "updatedAt": "2026-10-05T16:10:00.000Z"
      }
    ]
  }
}
```

### Follow a short link

`GET /short-url/:shortPath`

```bash
curl -i http://localhost:5001/api/v1/short-url/V1StGXR8_Z
```

Increments the click counter and responds with a **`302` redirect** to the original URL. Returns `404` if the short path doesn't exist.

### Delete a URL

`DELETE /short-url/:id`

```bash
curl -X DELETE http://localhost:5001/api/v1/short-url/66f1b2c3d4e5f6a7b8c9d0e1
```

Returns `204 No Content` on success.

## Data Model

Stored in the `urls` collection (Mongoose model `URL`):

| Field       | Type     | Notes                                                    |
| ----------- | -------- | -------------------------------------------------------- |
| `_id`       | ObjectId | Generated by MongoDB                                     |
| `fullPath`  | String   | **Required.** The original URL.                          |
| `shortPath` | String   | **Required.** Auto-generated 10-character `nanoid`.      |
| `clicks`    | Number   | Defaults to `0`, incremented on every redirect.          |
| `createdAt` | Date     | Added automatically (`timestamps: true`)                 |
| `updatedAt` | Date     | Added automatically (`timestamps: true`)                 |

## Known Limitations & Roadmap

Link-Kit is a work in progress. Planned improvements:

- [ ] **Short links that look like short links.** The app currently serves redirects from `/api/v1/short-url/:shortPath`. Add a top-level `/:shortPath` redirect route so links are genuinely short.
- [ ] **Configurable CORS.** The allowed origin is hard-coded to `http://localhost:3000`. Move it to an environment variable (e.g. `CLIENT_URL`) before deploying.
- [ ] **Database-level uniqueness.** Add unique indexes on `fullPath` and `shortPath` so the duplicate-key handling in the controller is backed by the database.
- [ ] **Delete edge cases.** `DELETE` should return `404` when the ID doesn't exist, and `204` responses should not carry a body.
- [ ] **User-facing error messages.** Show validation and duplicate-URL errors in the UI instead of only logging them to the console.
- [ ] **Authentication.** Per-user link lists.
- [ ] **Analytics.** Click timestamps, referrers and per-link charts.
- [ ] **Custom aliases and expiry dates.**
- [ ] **Automated tests** (Jest/Vitest + Supertest) and a CI workflow.
- [ ] **Deployment guide** (Render/Railway for the API, Vercel/Netlify for the frontend).

## Contributing

Contributions, issues and feature requests are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

## License

Distributed under the **MIT License**.

## Author

**David Karikari** ([@dk-willing](https://github.com/dk-willing))

---

<div align="center">
If you find this project useful, consider giving it a ⭐
</div>
