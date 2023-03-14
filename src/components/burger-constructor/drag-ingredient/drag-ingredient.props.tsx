import { ConstructorIngredient } from "../../../interfaces/constructor-ingredient";

export interface DragIngredientProps {
  ingredient: ConstructorIngredient;
  className?: string;
  extraClass?: string;
  index: number;
  onRemoveIngredient: (ingredient: ConstructorIngredient) => void;
}
