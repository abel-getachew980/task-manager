# Use the official lightweight Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy project files
COPY package.json .
COPY index.js .
COPY tasks.json .

# Default command — show help
CMD ["node", "index.js", "--help"]
