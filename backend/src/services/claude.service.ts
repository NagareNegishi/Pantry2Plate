/**
 * backend/src/services/claude.service.ts
 * Claude API calls: https://platform.claude.com/docs/en/api/overview
 * Anthropic TypeScript API Library: https://github.com/anthropics/anthropic-sdk-typescript
 */

import Anthropic from '@anthropic-ai/sdk';
import { CLAUDE_CONFIG } from '../config/claude.config.js';


const client = new Anthropic({
  apiKey: CLAUDE_CONFIG.apiKey  // get from env variable
});



const message = await client.messages.create({
  model: CLAUDE_CONFIG.model,
  max_tokens: CLAUDE_CONFIG.maxTokens,
  temperature: CLAUDE_CONFIG.temperature,
  system: CLAUDE_CONFIG.system,
  messages: [{ role: 'user', content: 'Hello, Claude' }] 
});



console.log(message.content);