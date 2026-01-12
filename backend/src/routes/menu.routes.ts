/**
 * backend/src/routes/menu.routes.ts
 * Defines routes for menu-related operations.
 * [Basic routing]: https://expressjs.com/en/starter/basic-routing.html
 * [Routing]: https://expressjs.com/en/guide/routing.html
 * https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes
 */

// Import Express Router
import express from 'express';
const router = express.Router();

// Import controller
import { generateMenu } from '../controllers/menu.controller.js';

// Define route(s)
router.post('/generate', generateMenu);

// Export router
export default router;