import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProfileState, UserState } from "./models";
import { FeedMessage } from "redux/feed/models";

export const initialState: UserState = { orders: [] };

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setProfileInfo: (state, action: PayloadAction<ProfileState | null>) => {
      state.profile = action.payload;
    },
    setUserErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setResetEmail: (state, action: PayloadAction<string | null>) => {
      state.resetEmail = action.payload;
    },
    setUserOrders: (state, action: PayloadAction<FeedMessage>) => {
      state.orders = action.payload.orders;
    },
  },
});

export const {
  setProfileInfo,
  setUserErrorMessage,
  setResetEmail,
  setUserOrders,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
