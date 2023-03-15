import { getIngredients } from "../../utils/data-access";
import { DispatchType } from "../store";
import {
  ingredientsError,
  ingredientsRequest,
  ingredientsSuccess,
} from "./ingredients.slice";

export const getIngredientsThank = () => (dispatch: DispatchType) => {
  dispatch(ingredientsRequest());
  getIngredients()
    .then(({ data }) => {
      dispatch(ingredientsSuccess(data));
    })
    .catch((error) => {
      dispatch(ingredientsError());
      console.error(error);
    });
};
