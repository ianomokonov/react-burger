import { getIngredients } from "../../utils/data-access";
import { DispatchType } from "../store";
import { updateIngredients } from "./ingredients.slice";

export const getIngredientsThank = () => (dispatch: DispatchType) => {
  getIngredients()
    .then(({ data }) => {
      dispatch(updateIngredients(data));
    })
    .catch((error) => console.error(error));
};
