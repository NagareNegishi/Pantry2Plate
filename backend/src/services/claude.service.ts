/**
 * backend/src/services/claude.service.ts
 * Claude API calls: https://platform.claude.com/docs/en/api/overview
 * Anthropic TypeScript API Library: https://github.com/anthropics/anthropic-sdk-typescript
 */

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
});

const message = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, Claude' }],
  model: 'claude-sonnet-4-5-20250929',
});

console.log(message.content);