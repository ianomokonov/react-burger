import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import type { Middleware, MiddlewareAPI } from "redux";
import { DispatchType, RootState } from "redux/store";

export type TWsActions = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  sendMessage?: ActionCreatorWithPayload<any>;
  connecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (
  actions: TWsActions
): Middleware<{}, RootState> => {
  return ((store: MiddlewareAPI<DispatchType, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { payload } = action;

      const {
        connect,
        disconnect,
        sendMessage,
        connecting,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = actions;

      if (connect.match(action)) {
        socket = new WebSocket(payload);
        dispatch(connecting());
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("error"));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(onMessage(JSON.parse(data)));
        };

        socket.onclose = () => {
          dispatch(onClose());
        };

        if (sendMessage?.match(action)) {
          socket.send(JSON.stringify(payload));
        }

        if (disconnect.match(action)) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  }) as Middleware;
};
