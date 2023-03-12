import { BurgerIngredient } from "../../interfaces/burger-ingredient";

export interface ConstructorDataAction {
  type: ConstructorDataActionType;
  ingredient?: BurgerIngredient;
  ingredients?: BurgerIngredient[];
}

export enum ConstructorDataActionType {
  Add,
  Remove,
  SetRange,
}
