# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.16.0
FROM node:${NODE_VERSION}-alpine

# Development environment
ENV NODE_ENV development

WORKDIR /usr/src/app

# Copy package files (package.json and package-lock.json)
COPY package*.json ./
# Install ALL dependencies (including devDependencies for Vite)
RUN npm ci
# Copy the rest of the source files into the image.
COPY . .
# Expose Vite dev server port
EXPOSE 5173

# Run the application.
CMD npm run dev