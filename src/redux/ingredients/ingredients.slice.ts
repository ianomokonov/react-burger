import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerIngredient } from "interfaces/burger-ingredient";

export interface IngredientsState {
  ingredients: BurgerIngredient[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    ingredientsRequest: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    ingredientsSuccess: (state, action: PayloadAction<BurgerIngredient[]>) => {
      state.ingredients = action.payload;
      state.hasError = false;
      state.isLoading = false;
    },
    ingredientsError: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const { ingredientsRequest, ingredientsSuccess, ingredientsError } =
  ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
