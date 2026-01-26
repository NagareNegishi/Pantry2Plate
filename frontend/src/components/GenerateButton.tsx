/**
 * GenerateButton.tsx
 * A button component to trigger recipe generation.
 */
import { Button } from "@/components/ui/button";

/**
 * Props for the GenerateButton component.
 */
interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  className?: string;
}

/**
 * GenerateButton Component
 * @param GenerateButtonProps but as destructured props
 * @returns An input field to add ingredients with validation and a list to display added ingredients
 */
export function GenerateButton({ onClick, disabled, isLoading, className }: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {isLoading ? 'Generating...' : 'Generate Menu'}
    </Button>
  );
}