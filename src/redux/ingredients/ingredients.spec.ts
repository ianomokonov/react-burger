import { IngredientType } from "interfaces/ingredient-type";
import {
  ingredientsError,
  ingredientsReducer,
  ingredientsRequest,
  ingredientsSuccess,
  initialState,
} from "./ingredients.slice";

const ingredient = {
  _id: "123",
  name: "Test",
  type: IngredientType.Main,
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: "src",
  image_mobile: "src",
  image_large: "src",
  __v: 1,
};

it("should return the initial state", () => {
  expect(ingredientsReducer(undefined, { type: undefined })).toEqual(
    initialState
  );
});

it("should set ingredients request", () => {
  expect(ingredientsReducer(initialState, ingredientsRequest())).toEqual({
    ...initialState,
    isLoading: true,
    hasError: false,
  });
});

it("should set ingredients success", () => {
  const ingredients = [ingredient, ingredient, ingredient];
  expect(
    ingredientsReducer(
      { ...initialState, isLoading: true },
      ingredientsSuccess(ingredients)
    )
  ).toEqual({
    ingredients,
    isLoading: false,
    hasError: false,
  });
});

it("should set ingredients error", () => {
  expect(
    ingredientsReducer({ ...initialState, isLoading: true }, ingredientsError())
  ).toEqual({
    ingredients: [],
    isLoading: false,
    hasError: true,
  });
});
