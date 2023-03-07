import { BurgerIngredient } from "./burger-ingredient";

export interface IngredientListResponse {
  success: boolean;
  data: BurgerIngredient[];
}
