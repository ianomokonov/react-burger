import { createContext } from "react";
import { BurgerIngredient } from "../interfaces/burger-ingredient";

export const BurgerContructorContext =
  createContext<BurgerContructorContextValue>({
    ingredients: [],
    setOrderNumber: () => {},
  });

export interface BurgerContructorContextValue {
  ingredients: BurgerIngredient[];
  orderNumber?: number | undefined;
  setOrderNumber: React.Dispatch<React.SetStateAction<number | undefined>>;
}
