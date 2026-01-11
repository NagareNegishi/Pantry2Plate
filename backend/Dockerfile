# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.16.0
FROM node:${NODE_VERSION}-alpine

# Development environment
ENV NODE_ENV development

# Build shared package
WORKDIR /usr/src/shared
COPY shared/ .
RUN npm ci && npm run build

# Build backend
WORKDIR /usr/src/app
# Copy package files FROM BACKEND FOLDER
COPY backend/package*.json ./
# Install ALL dependencies (including devDependencies for Vite)
RUN npm ci
# Copy the rest of the source files from backend folder
COPY backend/ .

# Expose the port that the application listens on.
EXPOSE 3001
# Run the application, use tsx for development (production should compile to JS first)
CMD ["npm", "run", "dev"]
