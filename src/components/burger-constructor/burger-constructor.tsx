import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorProps } from "./burger-constructor.props";
import styles from "./burger-constructor.module.css";
import { FC, useMemo, useState } from "react";
import { Modal } from "../modal/modal";
import { OrderDetails } from "./order-details/order-details";
import { makeOrder } from "../../utils/data-access";
import { useTypedDispatch, useTypedSelector } from "../../redux/hooks";
import {
  removeIngredient,
  setOrderNumber,
} from "../../redux/constructor/constructor.slice";
import { ConstructorIngredient } from "../../interfaces/constructor-ingredient";

export const BurgerContructor: FC<BurgerConstructorProps> = ({ className }) => {
  const { bun, ingredients } = useTypedSelector(
    (state) => state.constructorData
  );

  const dispatch = useTypedDispatch();

  const [isOrderModalOpened, setIsOrderModalOpened] = useState<boolean>(false);

  const totalPrice = useMemo(() => {
    const bunsPrice = bun ? bun.price * 2 : 0;
    return (
      ingredients?.reduce((prev, cur) => prev + cur.price, bunsPrice) ||
      bunsPrice
    );
  }, [bun, ingredients]);

  const onMakeOrderClick = async () => {
    if (!bun) {
      return;
    }
    try {
      const {
        order: { number: orderNumber },
      } = await makeOrder([
        bun._id,
        bun._id,
        ...ingredients.map((ingredient) => ingredient._id),
      ]);

      dispatch(setOrderNumber(orderNumber));
      setIsOrderModalOpened(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeOrderModal = () => {
    setIsOrderModalOpened(false);
  };

  const onRemoveIngredient = (ingredient: ConstructorIngredient) => {
    dispatch(removeIngredient(ingredient));
  };

  return (
    <>
      <div className={`pl-4 pb-4 ${className}`}>
        {!!bun ? (
          <div className="pl-8">
            <ConstructorElement
              type="top"
              extraClass="mb-4"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        ) : (
          <div className="pl-8">
            <div
              className="constructor-element constructor-element_pos_top mb-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span>Выберите булку</span>
            </div>
          </div>
        )}

        <div
          className={`${styles.main} custom-scroll ${
            ingredients.length ? "" : styles.main_empty
          }`}
        >
          {ingredients.length ? (
            ingredients.map((ingredient, index) => (
              <div
                key={`${ingredient._id}${index}`}
                className={`pl-8 ${styles.ingredient}`}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  extraClass={styles.ingredient__card}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                  handleClose={() => onRemoveIngredient(ingredient)}
                />
              </div>
            ))
          ) : (
            <span className="text text_type_main-default text_color_inactive">
              Добавьте ингредиенты
            </span>
          )}
        </div>

        {!!bun ? (
          <div className="pl-8 mb-10">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              extraClass="mt-4"
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        ) : (
          <div className="pl-8 mb-10">
            <div
              className="constructor-element constructor-element_pos_bottom mt-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span>Выберите булку</span>
            </div>
          </div>
        )}

        <div className={styles.order}>
          <div className={`${styles.order__sum} mr-10`}>
            <p className="text text_type_main-large mr-3">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={onMakeOrderClick}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {isOrderModalOpened && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
