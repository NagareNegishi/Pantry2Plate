// backend/src/server.ts
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());






// quick test endpoint
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'Backend is running!' });
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});