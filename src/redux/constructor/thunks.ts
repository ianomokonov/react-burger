import { makeOrder } from "../../utils/data-access";
import { DispatchType } from "../store";
import { setOrderNumber } from "./constructor.slice";

export const makeOrderThunk = (ingredients: string[]) => {
  return async (dispatch: DispatchType) => {
    try {
      const {
        order: { number: orderNumber },
      } = await makeOrder(ingredients);
      dispatch(setOrderNumber(orderNumber));
    } catch (error) {
      console.error(error);
    }
  };
};
