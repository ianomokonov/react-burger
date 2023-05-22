import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { constructorReducer } from "./constructor/constructor.slice";
import { ingredientsReducer } from "./ingredients/ingredients.slice";
import { orderReducer } from "./order/order.slice";
import { userReducer } from "./user/user.slice";
import {
  close,
  connect,
  connecting,
  disconnect,
  feedReducer,
  onError,
  onOpen,
  sendMessage,
} from "./feed/feed.slice";
import { socketMiddleware } from "./middleware/socket-middleware";

const reducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorData: constructorReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
});

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["FEED_CONNECT"],
      },
    }).concat(
      socketMiddleware({
        connect: connect,
        connecting: connecting,
        disconnect: disconnect,
        sendMessage: sendMessage,
        onOpen: onOpen,
        onClose: close,
        onError: onError,
      })
    ),
});

export type RootState = ReturnType<typeof reducer>;
export type DispatchType = typeof store.dispatch;
