import { BurgerIngredient } from "../../../../interfaces/burger-ingredient";

export interface IngredientCardProps extends BurgerIngredient {
  onClick?: () => void;
}
