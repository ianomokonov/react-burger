import { FC, useMemo } from "react";
import styles from "./statistics.module.css";
import { useTypedSelector } from "redux/hooks";
import { getFeed } from "redux/selectors";

export const Statistics: FC = () => {
  const { orders, total, totalToday } = useTypedSelector(getFeed);

  const done = useMemo(() => {
    return orders.filter((order) => order.status === "done");
  }, [orders]);
  const work = useMemo(() => {
    return orders.filter((order) => order.status !== "done");
  }, [orders]);
  return (
    <>
      <div className="d-flex mb-15">
        <div className="col mr-9">
          <p className="mb-6 text text_type_main-medium">Готовы:</p>
          <div className={`${styles.numbers} custom-scroll`}>
            {done.map((order) => (
              <span
                key={order._id}
                className="text text_type_digits-default success-text"
              >
                {order.number}
              </span>
            ))}
          </div>
        </div>
        <div className="col">
          <p className="mb-6 text text_type_main-medium">В работе:</p>
          <div className={styles.numbers}>
            {work.map((order) => (
              <span
                key={order._id}
                className="text text_type_digits-default success-text"
              >
                {order.number}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <span className="text text_type_digits-large neon-text">{total}</span>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <span className="text text_type_digits-large neon-text">
          {totalToday}
        </span>
      </div>
    </>
  );
};
