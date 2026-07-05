#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'tasks.json');

// --- Data helpers ---

function readTasks() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeTasks(tasks) {
  fs.writeFileSync(DB_PATH, JSON.stringify(tasks, null, 2));
}

function nextId(tasks) {
  return tasks.length === 0 ? 1 : Math.max(...tasks.map(t => t.id)) + 1;
}

// --- Commands ---

function add(title) {
  if (!title) return console.error('Usage: node index.js --add "Task title"');
  const tasks = readTasks();
  const task = { id: nextId(tasks), title, done: false };
  tasks.push(task);
  writeTasks(tasks);
  console.log(`Added [${task.id}] ${task.title}`);
}

function complete(id) {
  if (!id) return console.error('Usage: node index.js --complete <id>');
  const tasks = readTasks();
  const task = tasks.find(t => t.id === Number(id));
  if (!task) return console.error(`Task ${id} not found.`);
  task.done = true;
  writeTasks(tasks);
  console.log(`Completed [${task.id}] ${task.title}`);
}

function remove(id) {
  if (!id) return console.error('Usage: node index.js --remove <id>');
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === Number(id));
  if (index === -1) return console.error(`Task ${id} not found.`);
  const [removed] = tasks.splice(index, 1);
  writeTasks(tasks);
  console.log(`Removed [${removed.id}] ${removed.title}`);
}

function help() {
  console.log(`
Task Manager — Commands
-----------------------
  --add "title"        Add a new task
  --list               List all tasks
  --list --filter done     Show only completed tasks
  --list --filter pending  Show only pending tasks
  --complete <id>      Mark a task as done
  --remove <id>        Delete a task
  --help               Show this help message
`);
}

// --- Argument parsing ---

const args = process.argv.slice(2);
const cmd  = args[0];

switch (cmd) {
  case '--add':      add(args[1]);                         break;
  case '--list': {
    const filterIdx = args.indexOf('--filter');
    const filter    = filterIdx !== -1 ? args[filterIdx + 1] : null;
    list(filter);
    break;
  }
  case '--complete': complete(args[1]);                    break;
  case '--remove':   remove(args[1]);                      break;
  case '--help':
  default:           help();
}
