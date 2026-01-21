

// test connection from shared module
// Types only (disappear at runtime)
import type { ValidationResult } from '@pantry2plate/shared';
// Actual classes/values (exist at runtime)
import { MenuRequestImpl } from '@pantry2plate/shared';

import { useState } from 'react';
import { ServingsInput } from './components/ServingsInput';

const request = new MenuRequestImpl({
  ingredients: ['chicken', 'rice'],
  dietaryRestrictions: ['vegetarian', 'gluten-free'],
  mealType: 'dinner',
  servings: 2
});

const validation: ValidationResult = request.validate();
console.log('Validation Result front:', validation);




function App() {
  // useState returns array : [currentValue, Setter function]
  // we name currentValue and setter function appropriately
  // Setter function is provided by React (we can name it whatever we want)
  const [servings, setServings] = useState(1); // Default to 1 serving

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pantry2Plate</h1>
      <ServingsInput value={servings} onChange={setServings} />
      <p className="mt-4">Selected servings: {servings}</p>
    </div>
  );
}

export default App
