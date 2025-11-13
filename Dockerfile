# Stage 1: Build TypeScript
FROM node:18 AS build

WORKDIR /app

# Copy dependency files first
COPY package*.json ./
RUN npm ci

# Copy source code and tsconfig
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-slim

WORKDIR /app

# Copy only necessary files
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist

# Set environment
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
