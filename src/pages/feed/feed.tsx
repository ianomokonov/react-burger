import { Orders } from "components/orders/orders";
import { Statistics } from "components/statistics/statistics";
import { FC, useEffect } from "react";
import styles from "./feed.module.css";
import { useTypedDispatch, useTypedSelector } from "redux/hooks";
import { connect, disconnect, onMessage } from "redux/feed/feed.slice";
import { getFeed, getIngredients } from "redux/selectors";
import { getIngredientsThunk } from "redux/ingredients/thunks";

export const Feed: FC = () => {
  const dispatch = useTypedDispatch();
  const { ingredients: allIngredients } = useTypedSelector(getIngredients);
  useEffect(() => {
    dispatch(
      connect({
        url: "wss://norma.nomoreparties.space/orders/all",
        onMessage: onMessage,
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

  const { orders } = useTypedSelector(getFeed);
  return (
    <div className="pt-10">
      <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
      <div className={`d-flex ${styles.content}`}>
        <div className="col h-100">
          <Orders modalUrl="/feed" orders={orders} />
        </div>
        <div className="col pl-15">
          <Statistics />
        </div>
      </div>
    </div>
  );
};
