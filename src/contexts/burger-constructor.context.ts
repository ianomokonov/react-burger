import { createContext } from "react";
import { BurgerIngredient } from "../interfaces/burger-ingredient";
import { ConstructorDataAction } from "../reducers/constructor-data/constructor-data.action";

export const BurgerContructorContext =
  createContext<BurgerContructorContextValue>({
    constructorData: {
      ingredients: [],
      totalPrice: 0,
    },
    setOrderNumber: () => {},
    dispatchConstructorData: () => {},
  });

export interface BurgerContructorContextValue {
  constructorData: ConstructorData;
  dispatchConstructorData: React.Dispatch<ConstructorDataAction>;
  orderNumber?: number | undefined;
  setOrderNumber: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface ConstructorData {
  ingredients: BurgerIngredient[];
  totalPrice: number;
}
