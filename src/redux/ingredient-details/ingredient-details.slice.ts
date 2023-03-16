import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerIngredient } from "interfaces/burger-ingredient";

export interface IngredientDetailsState {
  ingredient: BurgerIngredient | null;
}

const initialState: IngredientDetailsState = {
  ingredient: null,
};

export const ingredientDetailsSlice = createSlice({
  name: "ingredient-details",
  initialState,
  reducers: {
    openIngredientDetailsModal: (
      state,
      action: PayloadAction<BurgerIngredient>
    ) => {
      state.ingredient = action.payload;
    },
    closeIngredientDetailsModal: (state) => {
      state.ingredient = null;
    },
  },
});

export const { openIngredientDetailsModal, closeIngredientDetailsModal } =
  ingredientDetailsSlice.actions;

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer;
