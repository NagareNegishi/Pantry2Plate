/**
 * backend/src/config/claude.config.ts
 * API key, model settings
 */

// Configure default parameters for all messages: https://platform.claude.com/docs/en/api/messages/create
export const CLAUDE_CONFIG = {
  apiKey: process.env.ANTHROPIC_API_KEY,              // env variable
  enabled: process.env.ENABLE_CLAUDE_API === 'true',  // Safety flag
  model: 'claude-sonnet-4-5-20250929',    // See available models with Claude API
  maxTokens: 2048,                        // See Claude API token rates and limits
  temperature: 0.7,                       // 0.0 for analytical/multiple choice <-> 1.0 for creative/generative tasks
  system: 'You are a helpful culinary assistant that generates menu suggestions based on ingredients and dietary preferences.'
};

