# Pantry2Plate

AI-powered menu suggestion app that generates personalized recipes based on your ingredients, dietary needs, and cooking preferences using Claude API.

## Quick Start

### Try the Demo (No API Key Required)
Want to see it in action without setup? The live demo uses preset responses to showcase the UI:
- **Live Demo**: [nagarenegishi.com/Pantry2Plate](http://nagarenegishi.com/Pantry2Plate)

Or run locally in demo mode:
```bash
git clone <repo-url>
cd pantry2plate
# Set VITE_DEMO_MODE=true in frontend/.env
docker compose up --build
```
Access at http://localhost:5173 - The app will display preset menu results instead of calling the Claude API.


### Full Setup (with Claude API)

**Prerequisites:**
- Docker & Docker Compose
- Anthropic API key (for full functionality)


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
6. **Deployment** - GitHub Actions + GitHub Pages for demo

### 🚧 Phase 2: Mobile App (Current Focus)
- [x] React Native setup (Expo + TypeScript)
- [x] Shared types integration
- [x] UI library (React Native Paper)
- [ ] API service (connect to existing backend)
- [ ] Home screen (ingredients input)
- [ ] Results screen (display menu)
- [ ] Navigation flow
- [ ] Testing (navigation + API integration)

### 💭 Phase 3: Future Enhancements
- [x] Frontend core flow testing (App submission, AllergiesSection)
- [ ] Additional component tests (optional: other input sections)
- [ ] AI agent evolution (multi-step reasoning, recipe/nutrition tool use)
- [ ] User accounts & saved menus
- [ ] Offline mode & caching
- [ ] Share menus feature