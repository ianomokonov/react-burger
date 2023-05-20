import { getOrder } from "utils/data-access";
import { DispatchType } from "../store";
import {
  activeOrderError,
  activeOrderRequest,
  activeOrderSuccess,
} from "./feed.slice";

export const getOrderThunk = (id: number) => (dispatch: DispatchType) => {
  dispatch(activeOrderRequest());
  getOrder(id)
    .then((data) => {
      dispatch(activeOrderSuccess(data));
    })
    .catch((error) => {
      dispatch(activeOrderError());
      console.error(error);
    });
};
