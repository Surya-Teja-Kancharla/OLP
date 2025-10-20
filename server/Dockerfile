# ===== Stage 1: Build dependencies =====
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Install Python and build tools for bcrypt compilation
RUN apk add --no-cache python3 make g++ 

# Copy only package files first (for layer caching)
COPY package*.json ./

# Install all dependencies (including bcrypt)
RUN npm ci

# Copy the entire backend source code
COPY . .

# ===== Stage 2: Production Image =====
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy node_modules from build stage (compiled for Linux)
COPY --from=build /usr/src/app/node_modules ./node_modules

# Copy backend source code
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
