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
 * @param request Menu request from user, it must be validated MenuRequestImpl
 * @returns Formatted prompt string
 */
export function formatMenuPrompt(request: MenuRequestImpl): string {
  // Valid MenuRequestImpl guaranteed to have ingredients
  let prompt = `Ingredients: ${request.ingredients.join(', ')}\n`;

  if (request.allergies.length > 0 || request.allergiesCustom.length > 0) {
    // ... spread operators to unpack + concatenate arrays
    const allAllergies = [
      ...request.allergies.filter(a => a !== 'other'),
      ...request.allergiesCustom
    ];
    prompt += `Allergies: ${allAllergies.join(', ')}\n`;
  }

  if (request.dietaryRestrictions.length > 0 || request.dietaryRestrictionsCustom.length > 0) {
    const allDietary = [
      ...request.dietaryRestrictions.filter(d => d !== 'other'),
      ...request.dietaryRestrictionsCustom
    ];
    prompt += `Dietary Restrictions: ${allDietary.join(', ')}\n`;
  }

  prompt += `Servings: ${request.servings}\n`;
  prompt += `Max Cooking Time: ${request.maxCookingTime} minutes\n`;
  prompt += `Meal Type: ${request.mealType === 'other' ? request.mealTypeCustom : request.mealType}\n`;
  prompt += `Cuisine Type: ${request.cuisineType === 'other' ? request.cuisineTypeCustom : request.cuisineType}\n`;
  
  const flavors = request.flavorProfiles.includes('other')
    ? [
      ...request.flavorProfiles.filter(fp => fp !== 'other'),
      ...request.flavorProfilesCustom
    ]
    : request.flavorProfiles;
  prompt += `Flavor Profiles: ${flavors.join(', ')}\n`;

  prompt += `Cooking Method: ${request.cookingMethod === 'other' ? request.cookingMethodCustom : request.cookingMethod}\n`;
  prompt += `Difficulty: ${request.difficulty}\n`;

  return prompt;
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

  // console.log(firstBlock.text);
  return firstBlock.text;
}

/**
 * NOTE: Return of create message:
 * 1. the main response is in message.content, which is an array of ContentBlock
 * 2. message.content[0] is usually the "type" of first block, but it can be undefined
 * 3. In my case, ContentBlock should contain only one Block of type 'text'
 * 4. So if message.content[0] exists and is of type 'text', then message.content[0].text contains the actual string response
 */

