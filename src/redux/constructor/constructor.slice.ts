import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddIngredientAction,
  ConstructorState,
  UpdateOrderAction,
} from "./models";
import { v4 as uuidv4 } from "uuid";
import { BurgerIngredient } from "interfaces/burger-ingredient";
import { IngredientType } from "interfaces/ingredient-type";
import { ConstructorIngredient } from "interfaces/constructor-ingredient";

const initialState: ConstructorState = {
  ingredients: [],
};

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
    addIngredient: (state, action: PayloadAction<AddIngredientAction>) => {
      const newIngredient = {
        ...action.payload.ingredient,
        uniqueId: uuidv4(),
      };

      if (action.payload.index || action.payload.index === 0) {
        state.ingredients.splice(action.payload.index, 0, newIngredient);
        return;
      }
      state.ingredients.push(newIngredient);
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
      state.ingredients.splice(nextIndex, 0, prevIngredients[currIndex]);
    },
  },
});

export const { addIngredient, removeIngredient, updateOrder, setBun } =
  constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
