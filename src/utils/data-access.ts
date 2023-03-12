import { IngredientListResponse } from "../interfaces/ingredient-list.redponse";
import { BASE_URL } from "./constants";

const checkReponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const get = (url: string) => {
  return fetch(url).then(checkReponse);
};

const post = <T>(url: string, body: T) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      body,
    }),
  }).then(checkReponse);
};

export const getIngredients = (): Promise<IngredientListResponse> => {
  return get(`${BASE_URL}/ingredients`);
};

export const makeOrder = (ingredients: string[]) => {
  return post(`${BASE_URL}/orders`, ingredients);
};
