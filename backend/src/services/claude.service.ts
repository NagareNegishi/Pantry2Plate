/**
 * backend/src/services/claude.service.ts
 * Claude API calls: https://platform.claude.com/docs/en/api/overview
 * Anthropic TypeScript API Library: https://github.com/anthropics/anthropic-sdk-typescript
 */

import Anthropic from '@anthropic-ai/sdk';
import { MenuRequestImpl } from '@pantry2plate/shared';
import { CLAUDE_CONFIG } from '../config/claude.config.js';


const client = new Anthropic({
  apiKey: CLAUDE_CONFIG.apiKey  // get from env variable
});


/**
 * Format menu prompt for Claude API
 * @param request Menu request from user
 * @returns Formatted prompt string
 */
function formatMenuPrompt(request: MenuRequestImpl): string {
  // formatting logic
  return "Formatted prompt based on MenuRequest"; // placeholder
}



/**
 * Generate menu suggestions from Claude API based on prompt
 * @param request Menu request from user
 * @returns Claude response content
 * @throws Error if API call fails or response format is unexpected
 */
export async function generateMenuSuggestions(request: MenuRequestImpl) {
  // Limit API calls if disabled
  if (!CLAUDE_CONFIG.enabled) {
    throw new Error("API disabled - set ENABLE_CLAUDE_API=true to enable");
  }

  const prompt = formatMenuPrompt(request);
  const message = await client.messages.create({
    model: CLAUDE_CONFIG.model,
    max_tokens: 10,   // small for testing   //CLAUDE_CONFIG.maxTokens,
    temperature: CLAUDE_CONFIG.temperature,
    system: CLAUDE_CONFIG.system,
    messages: [{ role: 'user', content: prompt }]
  });

  // handle response, see NOTE below
  const firstBlock = message.content[0];
  if (!firstBlock || firstBlock.type !== 'text') {
    throw new Error('Unexpected response format from Claude API');
  }

  console.log(firstBlock.text);
  return firstBlock.text;
}

/**
 * NOTE: Return of create message:
 * 1. the main response is in message.content, which is an array of ContentBlock
 * 2. message.content[0] is usually the "type" of first block, but it can be undefined
 * 3. In my case, ContentBlock should contain only one Block of type 'text'
 * 4. So if message.content[0] exists and is of type 'text', then message.content[0].text contains the actual string response
 */

