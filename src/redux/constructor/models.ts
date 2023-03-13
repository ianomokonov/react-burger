import { BurgerIngredient } from "../../interfaces/burger-ingredient";
import { ConstructorIngredient } from "../../interfaces/constructor-ingredient";

export interface ConstructorState {
  ingredients: ConstructorIngredient[];
  bun?: BurgerIngredient;
  orderNumber?: number;
}

export interface UpdateOrderAction {
  currOrder: number;
  nextOrder: number;
}
