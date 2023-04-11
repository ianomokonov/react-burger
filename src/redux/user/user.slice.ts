import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProfileState, UserState } from "./models";

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "order",
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
  },
});

export const { setProfileInfo, setUserErrorMessage, setResetEmail } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
