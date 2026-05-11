FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${PORT:-4173}

CMD ["node", "api/index.mjs"]