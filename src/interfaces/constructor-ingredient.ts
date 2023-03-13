import { BurgerIngredient } from "./burger-ingredient";

export interface ConstructorIngredient extends BurgerIngredient {
  order: number;
  uniqueId: string;
}
