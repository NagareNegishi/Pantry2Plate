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
# Expose the port that the application listens on.
EXPOSE 3001
# Run the application.
CMD node server.js
