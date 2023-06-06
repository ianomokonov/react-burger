import { Orders } from "components/orders/orders";
import { Statistics } from "components/statistics/statistics";
import { FC, useEffect } from "react";
import styles from "./feed.module.css";
import { useTypedDispatch, useTypedSelector } from "redux/hooks";
import { connect, disconnect, onMessage } from "redux/feed/feed.slice";
import { getFeed } from "redux/selectors";

export const Feed: FC = () => {
  const dispatch = useTypedDispatch();
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
