# ---------- Backend Build ----------
FROM node:18 AS backend
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server ./server

# ---------- Frontend Build ----------
FROM node:18 AS frontend
WORKDIR /app
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client ./client
WORKDIR /app/client
RUN npm run build

# ---------- Final Image ----------
FROM node:18-alpine
WORKDIR /app
COPY --from=backend /app/server ./server
COPY --from=frontend /app/client/dist ./server/public
WORKDIR /app/server
ENV NODE_ENV=production
EXPOSE 5000
CMD ["npm", "start"]
