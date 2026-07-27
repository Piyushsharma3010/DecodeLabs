// Simple in-memory "database".
// Data resets every time the server restarts — that's expected for this project.
// Swapping this file for a real database later (e.g. MongoDB, PostgreSQL)
// is the natural next step once this API works end to end.

let tasks = [
  { id: 1, title: "Set up the project", completed: true },
  { id: 2, title: "Build the API endpoints", completed: false },
];

let nextId = 3;

function getAll() {
  return tasks;
}

function getById(id) {
  return tasks.find((task) => task.id === id);
}

function create(title) {
  const newTask = { id: nextId++, title, completed: false };
  tasks.push(newTask);
  return newTask;
}

function updateById(id, updates) {
  const task = getById(id);
  if (!task) return null;
  if (updates.title !== undefined) task.title = updates.title;
  if (updates.completed !== undefined) task.completed = updates.completed;
  return task;
}

function removeById(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, updateById, removeById };
