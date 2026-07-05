FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY index.js .
COPY tasks.json .


CMD ["node", "index.js", "--help"]
