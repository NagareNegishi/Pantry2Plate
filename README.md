# Pantry2Plate

AI-powered menu suggestion app that generates personalized recipes based on your ingredients, dietary needs, and cooking preferences using Claude API.

## Features
- **Smart ingredient input** with autocomplete (180+ common ingredients)
- **Dietary customization**: allergies, restrictions, meal types, cuisines, cooking methods
- **Flexible preferences**: servings, cooking time, difficulty level, flavor profiles
- **AI-generated menus**: detailed recipes with ingredients lists and step-by-step instructions

## Tech Stack
- **Frontend**: React + Vite + TypeScript, shadcn/ui, Tailwind CSS v4
- **Backend**: Node.js/Express + TypeScript
- **Shared**: TypeScript types package with validation
- **AI**: Anthropic Claude API (Sonnet 4.5)
- **Deploy**: Docker Compose
- **Testing**: Jest (backend/shared), Vitest (frontend)

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Anthropic API key (for full functionality)

### Setup

1. **Clone and navigate:**
   ```bash
   git clone <repo-url>
   cd pantry2plate
   ```

2. **Backend environment:**
   ```bash
   cd backend
   cp .env.example .env
   ```
   Edit `backend/.env` and add your API key:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

3. **Frontend environment:**
   ```bash
   cd ../frontend
   cp .env.example .env
   ```
   Edit `frontend/.env`:
   ```
   # Production mode (requires backend API + Claude API key)
   VITE_BACKEND_URL=http://localhost:3001
   VITE_DEMO_MODE=false

   # Demo mode (shows preset mock results, no API needed)
   VITE_DEMO_MODE=true
   ```

4. **Run with Docker Compose:**
   ```bash
   cd ..
   docker compose up --build
   ```

5. **Access the app:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

### Demo Mode
Set `VITE_DEMO_MODE=true` in `frontend/.env` to run without an API key. The app will display preset menu results instead of calling the Claude API. Perfect for testing UI or portfolio demos.

## Development

### Project Structure
```
pantry2plate/
├── frontend/          # React app
├── backend/           # Express API
├── shared/            # Shared TypeScript types
└── compose.yaml       # Docker orchestration
```

### Running Tests
```bash
# Backend tests
cd backend && npm test

# Shared types tests
cd shared && npm test

# Frontend tests
cd frontend && npm test
```

## Development Status

### ✅ Phase 1: MVP Web App (Complete)
1. **Setup** - Docker Compose with TypeScript monorepo (frontend/backend/shared)
2. **Backend** - Express API with Claude API integration, request validation, error handling
3. **Frontend** - React form with ingredient autocomplete, advanced options (allergies, dietary restrictions, cuisine preferences), results display
4. **Integration** - Full data flow: form validation → API → Claude → parsed menu response
5. **Testing** - Jest (backend + shared types), Vitest (frontend), integration tests with real API

### 🚧 Phase 2: Polish & Deploy
- [ ] Frontend test coverage
- [ ] UI/UX refinement
- [ ] Production deployment
- [ ] Portfolio integration

### 💭 Phase 3: Future Enhancements
- Mobile app (React Native reusing backend API)
- AI agent evolution (multi-step reasoning, recipe/nutrition tool use)
- User accounts & saved menus