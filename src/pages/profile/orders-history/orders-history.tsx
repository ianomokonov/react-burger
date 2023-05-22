import { Orders } from "components/orders/orders";
import { FC, useEffect } from "react";
import styles from "./orders-history.module.css";
import { useTypedDispatch, useTypedSelector } from "redux/hooks";
import { getIngredients, getUser } from "redux/selectors";
import { connect, disconnect } from "redux/feed/feed.slice";
import { getIngredientsThunk } from "redux/ingredients/thunks";
import { getTokens } from "utils/token";
import { setUserOrders } from "redux/user/user.slice";

export const OrdersHistory: FC = () => {
  const dispatch = useTypedDispatch();
  const { ingredients: allIngredients } = useTypedSelector(getIngredients);
  useEffect(() => {
    const { token } = getTokens();
    dispatch(
      connect({
        url: `wss://norma.nomoreparties.space/orders?token=${token?.replace(
          "Bearer ",
          ""
        )}`,
        onMessage: setUserOrders,
      })
    );
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  useEffect(() => {
    if (allIngredients?.length) {
      return;
    }

    dispatch(getIngredientsThunk());
  }, [allIngredients, dispatch]);
  const { orders } = useTypedSelector(getUser);
  return (
    <div className={`${styles.content} pt-10`}>
      <Orders modalUrl="/profile/orders" orders={orders || []} />
    </div>
  );
};
