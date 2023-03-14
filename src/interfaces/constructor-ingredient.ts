import { BurgerIngredient } from "./burger-ingredient";

export interface ConstructorIngredient extends BurgerIngredient {
  uniqueId: string;
}
