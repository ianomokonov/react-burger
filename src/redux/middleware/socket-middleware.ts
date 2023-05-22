import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import type { Middleware, MiddlewareAPI } from "redux";
import { WSConnectPayload } from "redux/feed/feed.slice";
import { DispatchType, RootState } from "redux/store";
import { INVALID_TOKEN_MESSAGE } from "utils/constants";
import { refreshTokenFunc } from "utils/data-access";
import { getTokens, setTokens } from "utils/token";

export type TWsActions = {
  connect: ActionCreatorWithPayload<WSConnectPayload>;
  disconnect: ActionCreatorWithoutPayload;
  sendMessage?: ActionCreatorWithPayload<any>;
  connecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
};

export const socketMiddleware = (
  actions: TWsActions
): Middleware<{}, RootState> => {
  return ((store: MiddlewareAPI<DispatchType, RootState>) => {
    let socket: WebSocket | null = null;
    let onMessage: ActionCreatorWithPayload<any> | null = null;
    let connectUrl: string | null = null;

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
      } = actions;

      if (connect.match(action)) {
        socket = new WebSocket(payload.url);
        onMessage = payload.onMessage;
        connectUrl = payload.url;
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
          if (!onMessage) {
            return;
          }
          const { data } = event;
          const message = JSON.parse(data);

          if (
            !message.success &&
            message.message === INVALID_TOKEN_MESSAGE &&
            connectUrl !== null
          ) {
            const { refreshToken } = getTokens();
            if (refreshToken) {
              refreshTokenFunc(refreshToken).then(
                ({ accessToken, refreshToken }) => {
                  setTokens([accessToken, refreshToken]);
                  connectUrl =
                    connectUrl?.replace(
                      /token=.*$/,
                      `token=${accessToken.replace("Bearer ", "")}`
                    ) || null;

                  socket = new WebSocket(connectUrl || "");
                  dispatch(connecting());
                }
              );
            }
          }

          dispatch(onMessage(message));
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
