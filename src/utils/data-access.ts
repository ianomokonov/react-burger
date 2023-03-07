import { IngredientListResponse } from "../interfaces/ingredient-list.redponse";
import { BASE_URL } from "./constants";

export const getIngredients = (): Promise<IngredientListResponse> => {
  return fetch(`${BASE_URL}/ingredients`).then((response) => response.json());
};
