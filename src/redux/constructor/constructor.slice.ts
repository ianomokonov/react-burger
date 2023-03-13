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
        order: state.ingredients.length,
        uniqueId: uuidv4(),
      });
    },
    removeIngredient: (state, action: PayloadAction<ConstructorIngredient>) => {
      state.ingredients = state.ingredients
        .filter((ingredient) => ingredient.uniqueId !== action.payload.uniqueId)
        .map((ingredient) => ({
          ...ingredient,
          order:
            ingredient.order > action.payload.order
              ? ingredient.order - 1
              : ingredient.order,
        }));
    },
    updateOrder: (state, action: PayloadAction<UpdateOrderAction>) => {
      const ingredient = state.ingredients.find(
        (ingredientState) => ingredientState.order === action.payload.currOrder
      );
      if (!ingredient) {
        return;
      }

      ingredient.order = action.payload.nextOrder;
      state.ingredients.forEach((ingredientState) => {
        if (
          ingredientState.uniqueId === ingredient.uniqueId ||
          ingredientState.order < action.payload.nextOrder
        ) {
          return;
        }

        ingredientState.order += 1;
      });

      state.ingredients.sort((a, b) => a.order - b.order);
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
