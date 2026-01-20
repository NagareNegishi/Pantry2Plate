

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
console.log('Validation Result front:', validation);




function App() {
  return (
    <div className="text-blue-600 text-3xl font-bold">
      Tailwind is working!
    </div>
  );
}

export default App
