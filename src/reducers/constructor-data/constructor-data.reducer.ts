import { ConstructorData } from "../../contexts/burger-constructor.context";
import { IngredientType } from "../../interfaces/ingredient-type";
import {
  ConstructorDataAction,
  ConstructorDataActionType,
} from "./constructor-data.action";

export const constructorDataReducer = (
  state: ConstructorData,
  action: ConstructorDataAction
) => {
  switch (action.type) {
    case ConstructorDataActionType.Add: {
      const { ingredient } = action;
      if (!ingredient) {
        return state;
      }

      const { totalPrice } = state;

      if (ingredient.type === IngredientType.Bun) {
        const currentBunIndex = state.ingredients.findIndex(
          (stateIngredient) => stateIngredient.type === IngredientType.Bun
        );
        if (currentBunIndex < 0) {
          return {
            ...state,
            ingredients: [ingredient, ...state.ingredients],
            totalPrice: totalPrice + ingredient.price * 2,
          };
        }

        return {
          ...state,
          ingredients: [
            ingredient,
            ...state.ingredients.filter(
              (stateIngredient) => stateIngredient.type !== IngredientType.Bun
            ),
          ],
          totalPrice:
            totalPrice -
            state.ingredients[currentBunIndex].price * 2 +
            ingredient.price * 2,
        };
      }

      return {
        ...state,
        ingredients: [...state.ingredients, ingredient],
        totalPrice: totalPrice + ingredient.price,
      };
    }

    case ConstructorDataActionType.Remove: {
      if (!action.ingredient || action.ingredient.type === IngredientType.Bun) {
        return state;
      }
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (stateIngredient) => stateIngredient._id !== action.ingredient?._id
        ),
        totalPrice: state.totalPrice - action.ingredient.price,
      };
    }

    case ConstructorDataActionType.SetRange: {
      if (!action.ingredients) {
        return state;
      }

      const bun = action.ingredients.find(
        (ingredient) => ingredient.type === IngredientType.Bun
      );

      const resultIngredients = action.ingredients.filter(
        (ingredient) => ingredient.type !== IngredientType.Bun
      );

      if (bun) {
        resultIngredients.unshift(bun);
      }

      return {
        ...state,
        ingredients: resultIngredients,
        totalPrice: resultIngredients.reduce(
          (prev, curr) => prev + curr.price,
          bun?.price || 0
        ),
      };
    }

    default: {
      return state;
    }
  }
};
