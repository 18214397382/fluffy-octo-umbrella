FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY frontend/package*.json ./frontend/
COPY frontend/postcss.config.js ./frontend/
COPY frontend/vite.config.ts ./frontend/
COPY frontend/index.html ./frontend/
COPY frontend/src ./frontend/src/
WORKDIR /app/frontend
RUN npm install && npm run build && ls -la dist/

WORKDIR /app

COPY api ./api
RUN ls -la api/

EXPOSE ${PORT:-4173}

CMD ["node", "api/index.mjs"]