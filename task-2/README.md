# Task Manager API — Project 2: Backend API Development

A simple backend REST API built with **Node.js + Express**, handling application
logic through GET/POST/PUT/DELETE endpoints, request validation, and JSON responses.
Data is stored in memory (no database needed) to keep the project self-contained.

## Project structure

```
task-api/
├── server.js                     # Entry point — Express setup, middleware, routes
├── package.json
├── routes/
│   └── tasks.routes.js           # Maps URLs + HTTP methods to controller functions
├── controllers/
│   └── tasks.controller.js       # Request handling, validation, responses
└── data/
    └── store.js                  # In-memory "database"
```

## 1. Prerequisites

Install [Node.js](https://nodejs.org/) (v18 or later includes npm automatically).
Check it's installed:

```bash
node --version
npm --version
```

## 2. Setup

1. Download/unzip the `task-api` folder.
2. Open a terminal inside it:
   ```bash
   cd task-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## 3. Run the server

```bash
npm start
```

You should see:

```
Server running at http://localhost:5000
```

For auto-restart on file changes while developing:

```bash
npm run dev
```

## 4. Test the API

Visit `http://localhost:5000` in your browser — you'll see a JSON summary of
available endpoints. Test the rest with `curl`, [Postman](https://www.postman.com/),
or the Thunder Client extension in VS Code.

| Method | Endpoint            | Body                              | Description          |
|--------|----------------------|------------------------------------|-----------------------|
| GET    | `/api/tasks`         | —                                  | List all tasks        |
| GET    | `/api/tasks/:id`     | —                                  | Get one task          |
| POST   | `/api/tasks`         | `{ "title": "Buy milk" }`          | Create a task         |
| PUT    | `/api/tasks/:id`     | `{ "completed": true }`            | Update a task         |
| DELETE | `/api/tasks/:id`     | —                                  | Delete a task         |

### Example requests (curl)

```bash
# List tasks
curl http://localhost:5000/api/tasks

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Write tests"}'

# Mark a task complete
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a task
curl -X DELETE http://localhost:5000/api/tasks/1
```

### Validation

- `POST` requires a non-empty `title` string — omitting it returns a `400` error.
- `PUT` rejects a `completed` value that isn't `true`/`false`, or an empty `title`.
- Requesting an id that doesn't exist returns a `404` with a clear message.

## 5. How it maps to the brief

| Requirement                        | Where it's handled                                   |
|-------------------------------------|-------------------------------------------------------|
| Create API endpoints (GET/POST)     | `routes/tasks.routes.js`                              |
| Handle user input and responses     | `controllers/tasks.controller.js` + `express.json()`  |
| Validate basic data                 | Validation checks inside each controller function     |

## 6. Natural next steps

- Swap `data/store.js` for a real database (MongoDB with Mongoose, or PostgreSQL).
- Add authentication (e.g. JWT) if tasks should belong to specific users.
- Connect this API to the Project 1 frontend by replacing any static content
  with `fetch()` calls to these endpoints.
