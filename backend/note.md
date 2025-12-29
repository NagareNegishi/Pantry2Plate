# Backend Setup Notes

USED:

## **Express.js**

## **CORS (Cross-Origin Resource Sharing)**

**The problem it solves:**
- Frontend runs on `http://localhost:5173` (Vite default)
- Backend runs on `http://localhost:3001` (Express)
- Browser security blocks requests between different ports/domains by default
- **Without CORS: Your frontend literally cannot call your backend API**


DID NOT USED:

## **dotenv (Environment Variables)**

**The problem it solves:**
- loads `.env` file into `process.env`

Project is designed to be run with docker, which handles environment variables differently.

