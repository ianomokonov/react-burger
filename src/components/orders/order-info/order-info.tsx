import { FC, useEffect, useMemo } from "react";
import styles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useParams } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "redux/hooks";
import { getFeed, getIngredients } from "redux/selectors";
import { getOrderThunk } from "redux/feed/thunks";

export const OrderInfo: FC = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const dispatch = useTypedDispatch();
  const { activeOrder } = useTypedSelector(getFeed);
  const { ingredients: allIngredients } = useTypedSelector(getIngredients);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getOrderThunk(+id));
  }, [id, dispatch]);

  const orderIngredients = useMemo(() => {
    if (!activeOrder) {
      return [];
    }

    if (!allIngredients?.length) {
      return [];
    }

    return (
      [...new Set(activeOrder.ingredients)]
        .map((id) => ({
          count: activeOrder.ingredients.filter((i) => i === id).length,
          data: allIngredients.find((ingredient) => ingredient._id === id),
        }))
        .filter((ingredient) => ingredient.data !== undefined) || []
    );
  }, [activeOrder, allIngredients]);

  const totalPrice = useMemo(() => {
    return (
      orderIngredients?.reduce(
        (prev, cur) => prev + (cur.data?.price || 0) * cur?.count,
        0
      ) || 0
    );
  }, [orderIngredients]);

  const getStatus = () => {
    switch (activeOrder?.status) {
      case "done": {
        return "Выполнен";
      }
      case "created": {
        return "Создан";
      }
      default: {
        return "Готовится";
      }
    }
  };

  return (
    <>
      {!!activeOrder && (
        <div className="centered">
          <div className={styles.container}>
            {!state?.background && (
              <p className="d-flex centered text text_type_digits-default mt-30">
                #{activeOrder.number}
              </p>
            )}
            <div className="mb-15 pt-8">
              <p className="text text_type_main-medium mb-2">
                {activeOrder.name}
              </p>
              <span
                className={`text text_type_main-default ${
                  activeOrder.status === "done" ? "success-text" : ""
                }`}
              >
                {getStatus()}
              </span>
            </div>
            <div className="mb-10">
              <p className="mb-6 text text_type_main-medium">Состав:</p>
              <div className={`${styles.ingredients} custom-scroll pr-6`}>
                {orderIngredients.map((ingredient, index) => (
                  <div
                    key={index + "_" + ingredient.data?._id}
                    className={`${styles.ingredient} mb-5`}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className={`${styles.ingredient__img} mr-4`}
                        style={{
                          backgroundImage: `url(${ingredient.data?.image})`,
                        }}
                      ></div>
                      <span className="text text_type_main-default">
                        {ingredient.data?.name}
                      </span>
                    </div>

                    <span className="d-flex align-items-center">
                      <span className="mr-2 text text_type_digits-default">
                        {ingredient.count} x {ingredient.data?.price}
                      </span>
                      <CurrencyIcon type="primary" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text text_type_main-default text_color_inactive">
                {new Date(activeOrder?.createdAt).toLocaleString()}
              </span>
              <span className="d-flex align-items-center">
                <span className="mr-2 text text_type_digits-default">
                  {totalPrice}
                </span>
                <CurrencyIcon type="primary" />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
