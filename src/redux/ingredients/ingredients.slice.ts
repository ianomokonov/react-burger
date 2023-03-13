import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerIngredient } from "../../interfaces/burger-ingredient";

export interface IngredientsState {
  ingredients: BurgerIngredient[];
}

const initialState: IngredientsState = { ingredients: [] };

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    updateIngredients: (state, action: PayloadAction<BurgerIngredient[]>) => {
      state.ingredients = action.payload;
    },
  },
});

export const { updateIngredients } = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
