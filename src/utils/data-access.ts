import { ProfileState } from "redux/user/models";
import { IngredientListResponse } from "../interfaces/ingredient-list.redponse";
import { BASE_URL } from "./constants";
import { TokenResponse } from "./models/token.response";
import { getTokens, setTokens } from "./token";
import { LoginRequest } from "./models/login.request";
import { CreateUserRequest } from "./models/create-user.request";
import { UpdateUserRequest } from "./models/update-user.request";

const checkReponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshTokenFunc = (token: string): Promise<TokenResponse> => {
  return post(`${BASE_URL}/auth/token`, { token }, false);
};

const fetchWithAuth = (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const { token, refreshToken } = getTokens();
  return fetch(input, {
    ...init,
    headers: { ...(init?.headers || {}), authorization: token || "" },
  }).then((res) => {
    if (res.ok || res.status !== 403 || !refreshToken) {
      return res;
    }
    return refreshTokenFunc(refreshToken).then(
      ({ accessToken, refreshToken }) => {
        setTokens([accessToken, refreshToken]);
        return fetchWithAuth(input, init);
      }
    );
  });
};

const get = (url: string) => {
  return fetchWithAuth(url).then(checkReponse);
};

const post = <T>(url: string, body: T, withAuth = true) => {
  return (withAuth ? fetch : fetchWithAuth)(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  }).then(checkReponse);
};

const patch = <T>(url: string, body: T, withAuth = true) => {
  return (withAuth ? fetch : fetchWithAuth)(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  }).then(checkReponse);
};

export const getIngredients = (): Promise<IngredientListResponse> => {
  return get(`${BASE_URL}/ingredients`);
};

export const makeOrder = (ingredients: string[]) => {
  return post(`${BASE_URL}/orders`, { ingredients });
};

export const login = (userData: LoginRequest): Promise<ProfileState> => {
  return post(`${BASE_URL}/auth/login`, userData, false).then(
    ({ accessToken, refreshToken, user }) => {
      setTokens([accessToken, refreshToken]);
      return user;
    }
  );
};

export const createUser = (
  userData: CreateUserRequest
): Promise<ProfileState> => {
  return post(`${BASE_URL}/auth/register`, userData, false).then(
    ({ accessToken, refreshToken, user }) => {
      setTokens([accessToken, refreshToken]);
      return user;
    }
  );
};

export const logout = (): Promise<ProfileState> => {
  const { refreshToken } = getTokens();
  return post(`${BASE_URL}/auth/logout`, { token: refreshToken }, false).then(
    (res) => {
      setTokens([null, null]);
      return res;
    }
  );
};

export const getUser = (): Promise<ProfileState> => {
  return get(`${BASE_URL}/auth/user`).then((res) => res.user);
};

export const updateUser = (
  userData: UpdateUserRequest
): Promise<ProfileState> => {
  return patch(`${BASE_URL}/auth/user`, userData).then((res) => res.user);
};
