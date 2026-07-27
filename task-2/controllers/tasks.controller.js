const store = require("../data/store");

// GET /api/tasks
function getTasks(req, res) {
  const tasks = store.getAll();
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
}

// GET /api/tasks/:id
function getTask(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Task id must be a number." });
  }

  const task = store.getById(id);

  if (!task) {
    return res.status(404).json({ success: false, message: `No task found with id ${id}.` });
  }

  res.status(200).json({ success: true, data: task });
}

// POST /api/tasks
function createTask(req, res) {
  const { title } = req.body;

  // Basic data validation, as required by the brief
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "A non-empty 'title' string is required.",
    });
  }

  const task = store.create(title.trim());
  res.status(201).json({ success: true, data: task });
}

// PUT /api/tasks/:id  — bonus: lets you mark a task complete or rename it
function updateTask(req, res) {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Task id must be a number." });
  }

  if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
    return res.status(400).json({ success: false, message: "'title' must be a non-empty string." });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ success: false, message: "'completed' must be true or false." });
  }

  const task = store.updateById(id, { title, completed });

  if (!task) {
    return res.status(404).json({ success: false, message: `No task found with id ${id}.` });
  }

  res.status(200).json({ success: true, data: task });
}

// DELETE /api/tasks/:id — bonus: removes a task
function deleteTask(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Task id must be a number." });
  }

  const removed = store.removeById(id);

  if (!removed) {
    return res.status(404).json({ success: false, message: `No task found with id ${id}.` });
  }

  res.status(200).json({ success: true, message: `Task ${id} deleted.` });
}

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
