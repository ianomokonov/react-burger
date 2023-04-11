import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "./constants";

export const getTokens = () => {
  return {
    token: sessionStorage.getItem(TOKEN_KEY),
    refreshToken: sessionStorage.getItem(REFRESH_TOKEN_KEY),
  };
};

export const setTokens = ([token, refreshToken]: [
  string | null,
  string | null
]) => {
  if (!token || !refreshToken) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    return;
  }
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};
