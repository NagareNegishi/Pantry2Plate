/**
 * GenerateButton.tsx
 * A button component to trigger recipe generation.
 */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      className={cn("flex flex-col items-center", className)}
    >
      {isLoading ? 'Generating...' : 'Generate Menu'}
    </Button>
  );
}