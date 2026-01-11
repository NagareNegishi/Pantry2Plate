// backend/server.ts
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());




// test connection from shared module
import { MealType, MenuRequestImpl, ValidationResult } from '@pantry2plate/shared';

const request = new MenuRequestImpl({
  availableIngredients: ['chicken', 'rice'],
  dietaryRestrictions: [],
  mealType: MealType.DINNER,
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