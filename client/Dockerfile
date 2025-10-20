FROM node:20-slim AS build
WORKDIR /app

# Prevent network timeouts + set npm registry manually
RUN npm config set registry https://registry.npmjs.org/
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy project files and build
COPY . .
RUN npm run build

# Production image
FROM nginx:1.27.1-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
