// backend/server.ts
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());




// test connection from shared module
// Types only (disappear at runtime)
import type { ValidationResult } from '@pantry2plate/shared';
// Actual classes/values (exist at runtime)
import { MenuRequestImpl } from '@pantry2plate/shared';

const request = new MenuRequestImpl({
  ingredients: ['chicken', 'rice'],
  dietaryRestrictions: ['vegetarian', 'gluten-free'],
  mealType: 'dinner',
  servings: 2
});

const validation: ValidationResult = request.validate();
console.log('Validation Result:', validation);






// quick test endpoint
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'Backend is running!' });
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});