# Task Manager CLI

A minimal command-line task manager.

## Commands

```bash
node index.js --add "Buy groceries"
node index.js --list
node index.js --list --filter pending
node index.js --list --filter done
node index.js --complete 1
node index.js --remove 1
```

## Run with Docker

```bash
# Build the image
docker build -t task-manager .

# Run a command (tasks.json lives inside the container)
docker run task-manager node index.js --add "Learn Docker"
docker run task-manager node index.js --list
```

> **Note:** Each `docker run` starts a fresh container, so tasks won't persist between runs unless you mount a volume:
>
> ```bash
> docker run -v "$(pwd)/tasks.json:/app/tasks.json" task-manager node index.js --list
> ```

## Git Workflow

This project follows the **Feature Branch Workflow**:

```
main         — stable, working code only
feature/*    — one branch per feature (e.g. feature/filter-command)
```

### Example

```bash
git checkout -b feature/filter-command
# make changes, commit…
git push origin feature/filter-command
# open a Pull Request → review → merge into main
```
