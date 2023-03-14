import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerIngredient } from "../../interfaces/burger-ingredient";
import { ConstructorState, UpdateOrderAction } from "./models";
import { v4 as uuidv4 } from "uuid";
import { ConstructorIngredient } from "../../interfaces/constructor-ingredient";
import { IngredientType } from "../../interfaces/ingredient-type";

const initialState: ConstructorState = { ingredients: [] };

export const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<BurgerIngredient>) => {
      if (action.payload.type !== IngredientType.Bun) {
        return;
      }
      state.bun = action.payload;
    },
    setOrderNumber: (state, action: PayloadAction<number>) => {
      state.orderNumber = action.payload;
    },
    addIngredient: (state, action: PayloadAction<BurgerIngredient>) => {
      state.ingredients.push({
        ...action.payload,
        uniqueId: uuidv4(),
      });
    },
    removeIngredient: (state, action: PayloadAction<ConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.uniqueId !== action.payload.uniqueId
      );
    },
    updateOrder: (state, action: PayloadAction<UpdateOrderAction>) => {
      const prevIngredients = [...state.ingredients];

      const { currIndex, nextIndex } = action.payload;

      // удаляем со старого места
      state.ingredients.splice(action.payload.currIndex, 1);
      // вставляем в новое
      state.ingredients.splice(
        action.payload.nextIndex,
        0,
        prevIngredients[currIndex]
      );
      console.log(
        JSON.parse(JSON.stringify(prevIngredients)),
        `${currIndex} -> ${nextIndex}`,
        JSON.parse(JSON.stringify(state.ingredients))
      );
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  updateOrder,
  setBun,
  setOrderNumber,
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
