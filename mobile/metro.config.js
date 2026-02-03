// metro.config.js
// Metro bundler can only access files inside the project root (mobile/) by default.
// Since we import @pantry2plate/shared from ../shared (outside the project root),
// Metro can't find it and throws "Unable to resolve @pantry2plate/shared".
//
// Expo SDK 52+ automatically detects monorepos and configures Metro,
// BUT only for workspace managers (npm/yarn/pnpm workspaces, Bun).
// This project uses Docker Compose with file:../shared in package.json,
// NOT a workspace manager, so automatic detection doesn't work.
//
// Solution: Manually tell Metro where to find the shared package using watchFolders.
// https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Tell Metro to look in the shared package folder
config.watchFolders = [path.resolve(__dirname, '../shared')];

module.exports = config;
