/**
 * The dynamic config is read if either app.config.ts or app.config.js exist. If both exist, then the TypeScript config is used.
 * The return value from the dynamic config is used as the final config.
 * https://docs.expo.dev/workflow/configuration/
 *
 * In development, we need to allow local HTTP connections for testing.
 */
const appJson = require('./app.json');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  ...appJson, // Copy everything from app.json
  expo: {
    ...appJson.expo, // Copy everything from app.json's expo section
    ios: {
      ...appJson.expo.ios,
      ...(isDevelopment && {
        infoPlist: {
          NSAppTransportSecurity: {
            NSAllowsArbitraryLoads: true
          }
        }
      })
    },
    android: {
      ...appJson.expo.android,
      ...(isDevelopment && {
        usesCleartextTraffic: true
      })
    }
  }
};