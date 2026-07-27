const express = require("express");
const taskRoutes = require("./routes/tasks.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware — parses incoming JSON request bodies into req.body
app.use(express.json());

// Simple request logger — helpful while developing
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Task Manager API is running.",
    endpoints: {
      "GET /api/tasks": "List all tasks",
      "GET /api/tasks/:id": "Get a single task",
      "POST /api/tasks": "Create a task (body: { title })",
      "PUT /api/tasks/:id": "Update a task (body: { title?, completed? })",
      "DELETE /api/tasks/:id": "Delete a task",
    },
  });
});

// Feature routes
app.use("/api/tasks", taskRoutes);

// 404 handler — catches any unmatched route
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// Central error handler — catches anything thrown/passed to next(err)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong on the server." });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
