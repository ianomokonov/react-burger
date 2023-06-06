import { IngredientType } from "interfaces/ingredient-type";
import {
  addIngredient,
  clearConstructor,
  constructorReducer,
  initialState,
  removeIngredient,
  setBun,
  updateOrder,
} from "./constructor.slice";

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

jest.mock("uuid", () => ({ v4: () => "123456789" }));

it("should return the initial state", () => {
  expect(constructorReducer(undefined, { type: undefined })).toEqual(
    initialState
  );
});

it("should clear constructor", () => {
  expect(constructorReducer(initialState, clearConstructor())).toEqual(
    initialState
  );
});

it("should set bun", () => {
  const bun = { ...ingredient, type: IngredientType.Bun };
  expect(constructorReducer(initialState, setBun(bun))).toEqual({
    ...initialState,
    bun,
  });
});

it("should not set main to bun", () => {
  const main = { ...ingredient, type: IngredientType.Main };
  expect(constructorReducer(initialState, setBun(main))).toEqual(initialState);
});

it("should not set souce to bun", () => {
  const sauce = { ...ingredient, type: IngredientType.Sauce };
  expect(constructorReducer(initialState, setBun(sauce))).toEqual(initialState);
});

it("should add ingredient", () => {
  expect(
    constructorReducer(initialState, addIngredient({ ingredient }))
  ).toEqual({ ingredients: [{ ...ingredient, uniqueId: "123456789" }] });
});

it("should add ingredient at index", () => {
  const ingredients = [
    { ...ingredient, uniqueId: "123" },
    { ...ingredient, uniqueId: "124" },
    { ...ingredient, uniqueId: "125" },
  ];

  expect(
    constructorReducer(
      {
        ...initialState,
        ingredients,
      },
      addIngredient({ ingredient: ingredient, index: 1 })
    )
  ).toEqual({
    ingredients: [
      ingredients[0],
      { ...ingredient, uniqueId: "123456789" },
      ...ingredients.slice(1),
    ],
  });
});

it("should remove ingredient", () => {
  const ingredients = [{ ...ingredient, uniqueId: "123" }];

  expect(
    constructorReducer(
      {
        ...initialState,
        ingredients,
      },
      removeIngredient(ingredients[0])
    )
  ).toEqual({
    ingredients: [],
  });
});

it("should update ingredient order", () => {
  const ingredients = [
    { ...ingredient, uniqueId: "123" },
    { ...ingredient, uniqueId: "124" },
    { ...ingredient, uniqueId: "125" },
  ];

  expect(
    constructorReducer(
      {
        ...initialState,
        ingredients,
      },
      updateOrder({ currIndex: 1, nextIndex: 2 })
    )
  ).toEqual({
    ingredients: [
      { ...ingredient, uniqueId: "123" },
      { ...ingredient, uniqueId: "125" },
      { ...ingredient, uniqueId: "124" },
    ],
  });
});
