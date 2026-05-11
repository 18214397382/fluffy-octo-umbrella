FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install && npm run build

WORKDIR /app

COPY api ./api

EXPOSE ${PORT:-4173}

CMD ["node", "api/index.mjs"]