import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderState } from "./models";

const initialState: OrderState = {
  orderNumberRequest: false,
  orderNumberError: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderNumberRequest: (state) => {
      state.orderNumberRequest = true;
      state.orderNumberError = false;
    },
    orderNumberSuccess: (state, action: PayloadAction<number | undefined>) => {
      state.orderNumber = action.payload;
      state.orderNumberRequest = false;
      state.orderNumberError = false;
    },
    orderNumberError: (state) => {
      state.orderNumberRequest = false;
      state.orderNumberError = true;
      state.orderNumber = undefined;
    },
  },
});

export const { orderNumberRequest, orderNumberSuccess, orderNumberError } =
  orderSlice.actions;

export const orderReducer = orderSlice.reducer;
