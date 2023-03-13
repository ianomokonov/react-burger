import { configureStore } from "@reduxjs/toolkit";
import { constructorReducer } from "./constructor/constructor.slice";
import { ingredientsReducer } from "./ingredients/ingredients.slice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructorData: constructorReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
