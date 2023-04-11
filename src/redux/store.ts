import { configureStore } from "@reduxjs/toolkit";
import { constructorReducer } from "./constructor/constructor.slice";
import { ingredientsReducer } from "./ingredients/ingredients.slice";
import { orderReducer } from "./order/order.slice";
import { userReducer } from "./user/user.slice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructorData: constructorReducer,
    order: orderReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
