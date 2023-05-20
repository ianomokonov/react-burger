import { Orders } from "components/orders/orders";
import { Statistics } from "components/statistics/statistics";
import { FC } from "react";
import styles from "./feed.module.css";

export const Feed: FC = () => {
  return (
    <div className="pt-10">
      <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
      <div className={`d-flex ${styles.content}`}>
        <div className="col h-100">
          <Orders />
        </div>
        <div className="col pl-15">
          <Statistics />
        </div>
      </div>
    </div>
  );
};
