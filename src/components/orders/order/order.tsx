import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import styles from "./order.module.css";
import { FeedOrder } from "redux/feed/models";
import { useTypedSelector } from "redux/hooks";
import { getIngredients } from "redux/selectors";

export const Order: FC<{
  className?: string;
  onClick?: () => void;
  order: FeedOrder;
}> = ({ className, onClick, order }) => {
  const { ingredients: allIngredients } = useTypedSelector(getIngredients);

  const orderIngredients = useMemo(() => {
    if (!allIngredients?.length) {
      return [];
    }

    return order.ingredients
      .map((id) => allIngredients.find((ingredient) => ingredient._id === id))
      .filter((ingredient) => ingredient !== undefined);
  }, [order.ingredients, allIngredients]);

  const totalPrice = useMemo(() => {
    return (
      orderIngredients?.reduce((prev, cur) => prev + (cur?.price || 0), 0) || 0
    );
  }, [orderIngredients]);
  return (
    <div className={`p-6 ${styles.order} ${className}`} onClick={onClick}>
      <div className="d-flex justify-content-between mb-6 align-items-center">
        <span className="text text_type_digits-default">#{order.number}</span>
        <span className="text text_type_main-default text_color_inactive">
          {new Date(order.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="text text_type_main-medium mb-6">{order.name}</p>
      <div className="d-flex justify-content-between align-items-center">
        <div className="ingredients d-flex">
          {orderIngredients.slice(0, 5).map((ingredient, index) => (
            <div
              key={index + "_" + ingredient?._id}
              className={`${styles.ingredient}`}
              style={{
                backgroundImage: `url(${ingredient?.image})`,
              }}
            ></div>
          ))}
          {orderIngredients.length > 5 && (
            <div
              className={`${styles.ingredient}`}
              style={{
                backgroundImage: `url(${orderIngredients[5]?.image})`,
              }}
            >
              <span className="text text_type_digits-default">
                +{orderIngredients.length - 5}
              </span>
            </div>
          )}
        </div>
        <span className="price text text_type_digits-default d-flex align-items-center">
          <span className="mr-2">{totalPrice}</span>{" "}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};
