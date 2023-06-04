import { BurgerIngredient } from "interfaces/burger-ingredient";
import { ConstructorIngredient } from "interfaces/constructor-ingredient";

export interface ConstructorState {
  ingredients: ConstructorIngredient[];
  bun?: BurgerIngredient;
}

export interface UpdateOrderAction {
  currIndex: number;
  nextIndex: number;
  id?: string;
}

export interface AddIngredientAction {
  ingredient: BurgerIngredient;
  index?: number;
}
