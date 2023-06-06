import { ProfileState } from "redux/user/models";
import { IngredientListResponse } from "../interfaces/ingredient-list.redponse";
import { BASE_URL } from "./constants";
import { TokenResponse } from "./models/token.response";
import { getTokens, setTokens } from "./token";
import { LoginRequest } from "./models/login.request";
import { CreateUserRequest } from "./models/create-user.request";
import { UpdateUserRequest } from "./models/update-user.request";
import { FeedOrder } from "redux/feed/models";

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = <T extends { success: boolean }>(res: T) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

export const refreshTokenFunc = (token: string): Promise<TokenResponse> => {
  return post(`/auth/token`, { token }, false);
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

const request = (endpoint: string, options?: RequestInit, withAuth = true) => {
  return (withAuth ? fetchWithAuth : fetch)(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

const get = (url: string) => {
  return request(url);
};

const post = <T>(url: string, body: T, withAuth = true) => {
  return request(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    },
    withAuth
  );
};

const patch = <T>(url: string, body: T, withAuth = true) => {
  return request(
    url,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    },
    withAuth
  );
};

export const getIngredients = (): Promise<IngredientListResponse> => {
  return get(`/ingredients`);
};

export const getOrder = (id: number): Promise<FeedOrder> => {
  return get(`/orders/${id}`).then((x) => {
    return x.orders[0];
  });
};

export const makeOrder = (ingredients: string[]) => {
  return post(`/orders`, { ingredients });
};

export const login = (userData: LoginRequest): Promise<ProfileState> => {
  return post(`/auth/login`, userData, false).then(
    ({ accessToken, refreshToken, user }) => {
      setTokens([accessToken, refreshToken]);
      return user;
    }
  );
};

export const createUser = (
  userData: CreateUserRequest
): Promise<ProfileState> => {
  return post(`/auth/register`, userData, false).then(
    ({ accessToken, refreshToken, user }) => {
      setTokens([accessToken, refreshToken]);
      return user;
    }
  );
};

export const logout = (): Promise<ProfileState> => {
  const { refreshToken } = getTokens();
  return post(`/auth/logout`, { token: refreshToken }, false).then((res) => {
    setTokens([null, null]);
    return res;
  });
};

export const resetPassword = (email: string): Promise<void> => {
  return post(`/password-reset`, { email }, false);
};

export const resetPasswordWithCode = (
  token: string,
  password: string
): Promise<void> => {
  return post(`/password-reset/reset`, { password, token }, false);
};

export const getUser = (): Promise<ProfileState> => {
  return get(`/auth/user`).then((res) => res.user);
};

export const updateUser = (
  userData: UpdateUserRequest
): Promise<ProfileState> => {
  return patch(`/auth/user`, userData).then((res) => res.user);
};
