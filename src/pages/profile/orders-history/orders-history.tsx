import { Orders } from "components/orders/orders";
import { FC } from "react";
import styles from "./orders-history.module.css";

export const OrdersHistory: FC = () => {
  return (
    <div className={`${styles.content} pt-10`}>
      <Orders modalUrl="/profile/orders" />
    </div>
  );
};
