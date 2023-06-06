import { makeOrder } from "utils/data-access";
import { DispatchType } from "../store";
import {
  orderNumberError,
  orderNumberRequest,
  orderNumberSuccess,
} from "./order.slice";
import { clearConstructor } from "redux/constructor/constructor.slice";

export const makeOrderThunk = (ingredients: string[]) => {
  return async (dispatch: DispatchType) => {
    dispatch(orderNumberRequest());
    dispatch(clearConstructor());
    try {
      const {
        order: { number: orderNumber },
      } = await makeOrder(ingredients);
      dispatch(orderNumberSuccess(orderNumber));
    } catch (error) {
      dispatch(orderNumberError());
      console.error(error);
    }
  };
};
