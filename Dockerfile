FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY simple-server.js .

RUN npm install --production

ENV PORT=4173
EXPOSE 4173

CMD ["node", "simple-server.js"]