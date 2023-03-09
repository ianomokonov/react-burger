import { FC } from "react";
import styles from "./order-details.module.css";
import DoneImg from "../../../images/done.svg";

export const OrderDetails: FC = () => {
  return (
    <div className={styles.order}>
      <p className={`${styles.order__number} text text_type_digits-large mb-8`}>
        034536
      </p>
      <p className="mb-15 text text_type_main-medium">идентификатор заказа</p>
      <img className="mb-15" src={DoneImg} alt="" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
