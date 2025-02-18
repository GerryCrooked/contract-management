# Stage 1: Frontend Build
FROM node:18 AS frontend
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Backend & Final Container
FROM node:18
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ .
COPY --from=frontend /app/out ./frontend-out
CMD ["node", "server.js"]

EXPOSE 8122 8123
