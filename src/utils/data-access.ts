import { IngredientListResponse } from "../interfaces/ingredient-list.redponse";
import { BASE_URL } from "./constants";

export const getIngredients = (): Promise<IngredientListResponse> => {
  return fetch(`${BASE_URL}/ingredients`).then((response) => response.json());
};

export const makeOrder = (ingredients: string[]) => {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients,
    }),
  }).then((response) => response.json());
};
