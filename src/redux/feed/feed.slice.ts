import { ActionCreatorWithPayload, PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { FeedMessage, FeedOrder } from "./models";

export interface FeedState {
  orders: FeedOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  hasError: boolean;
  activeOrder?: FeedOrder;
  activeOrderLoading: boolean;
  activeOrderHasError: boolean;
}

export interface WSConnectPayload {
  url: string;
  onMessage: ActionCreatorWithPayload<any>
}

export const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  hasError: false,
  activeOrderHasError: false,
  activeOrderLoading: false,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    connecting: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    onOpen: (state) => {
      state.hasError = false;
      state.isLoading = false;
    },
    onError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.hasError = true;
    },
    onMessage: (state, action: PayloadAction<FeedMessage>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },

    activeOrderRequest: (state) => {
      state.activeOrderLoading = true;
      state.activeOrderHasError = false;
      state.activeOrder = undefined;
    },

    activeOrderSuccess: (state, action: PayloadAction<FeedOrder>) => {
      state.activeOrder = action.payload;
      state.activeOrderLoading = false;
      state.activeOrderHasError = false;
    },

    activeOrderError: (state) => {
      state.activeOrder = undefined;
      state.activeOrderLoading = false;
      state.activeOrderHasError = true;
    },
  },
});

export const {
  connecting,
  onOpen,
  onError,
  onMessage,
  activeOrderError,
  activeOrderRequest,
  activeOrderSuccess,
} = feedSlice.actions;
export const connect = createAction<WSConnectPayload, "FEED_CONNECT">("FEED_CONNECT");
export const disconnect = createAction("FEED_DISCONNECT");
export const close = createAction("FEED_CLOSE");
export const sendMessage = createAction<any, "FEED_SEND_MESSAGE">(
  "FEED_SEND_MESSAGE"
);

export const feedReducer = feedSlice.reducer;
