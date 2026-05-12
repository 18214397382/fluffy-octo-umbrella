FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY simple-server.js .

EXPOSE 4173

CMD ["node", "simple-server.js"]