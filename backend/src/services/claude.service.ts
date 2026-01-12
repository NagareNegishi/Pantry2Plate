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

/**
 * Generate menu suggestions from Claude API based on prompt
 * @param prompt User prompt with ingredients and dietary preferences
 * @returns Claude response content
 */
export async function generateMenuSuggestions(prompt: string) {
  const message = await client.messages.create({
    model: CLAUDE_CONFIG.model,
    max_tokens: 10,   // small for testing   //CLAUDE_CONFIG.maxTokens,
    temperature: CLAUDE_CONFIG.temperature,
    system: CLAUDE_CONFIG.system,
    messages: [{ role: 'user', content: prompt }]
  });

  // content is the response text from Claude
  console.log(message.content);
  return message.content;
}



