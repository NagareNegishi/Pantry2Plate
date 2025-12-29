Development plan:

## Phase 1: MVP Web App
1. **Setup** - Docker compose with Node.js frontend + backend
2. **Backend** - Express API endpoint that calls Claude API with ingredient/diet/nutrition inputs
3. **Frontend** - Clean React form (ingredients, dietary restrictions, preferences) + polished results display
4. **Integration** - Connect form → API → Claude → formatted menu cards

## Phase 2: Enhancement
5. **Mobile** - React Native app reusing backend API
6. **AI Evolution** - Start as wrapper (direct Claude calls) → evolve to agent (multi-step reasoning, tool use for recipes/nutrition data)


**Tech stack clarity:**
- Frontend: React (web) → React Native (mobile later)
- Backend: Node.js/Express
- AI: Anthropic API (wrapper → agent)
- Deploy: Docker/Docker Compose
