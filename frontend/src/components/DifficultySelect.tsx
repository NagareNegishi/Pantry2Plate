/**
 * DifficultySelect Component
 * A reusable input component for selecting the difficulty level of a recipe.
 * Allows users to choose from predefined difficulty levels: 'any', 'easy', 'medium', 'hard'.
 */
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Difficulty } from '@pantry2plate/shared';


/**
 * Props for the DifficultySelect component
 */
interface DifficultySelectProps {
  // Current value of the difficulty select
  value: Difficulty;
  // Function parent component provides to handle value changes
  onChange: (value: Difficulty) => void;
}

/**
 * DifficultySelect Component
 * @param DifficultySelectProps but as destructured props
 * @returns A dropdown for selecting recipe difficulty
 */
export function DifficultySelect({ value, onChange }: DifficultySelectProps ) {
  
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="difficulty">Difficulty</Label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as Difficulty)}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select a Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Difficulty</SelectLabel>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}