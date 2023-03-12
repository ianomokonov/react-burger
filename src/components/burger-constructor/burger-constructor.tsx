import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorProps } from "./burger-constructor.props";
import styles from "./burger-constructor.module.css";
import { FC, useContext, useMemo, useState } from "react";
import { Modal } from "../modal/modal";
import { OrderDetails } from "./order-details/order-details";
import { BurgerContructorContext } from "../../contexts/burger-constructor.context";
import { IngredientType } from "../../interfaces/ingredient-type";
import { makeOrder } from "../../utils/data-access";
import { BurgerIngredient } from "../../interfaces/burger-ingredient";
import { ConstructorDataActionType } from "../../reducers/constructor-data/constructor-data.action";

export const BurgerContructor: FC<BurgerConstructorProps> = ({ className }) => {
  const { constructorData, setOrderNumber, dispatchConstructorData } =
    useContext(BurgerContructorContext);
  const [bun, mainIngredients] = useMemo(() => {
    return [
      constructorData.ingredients.find(
        (ingredient) => ingredient.type === IngredientType.Bun
      ),
      constructorData.ingredients.filter(
        (ingredient) => ingredient.type !== IngredientType.Bun
      ),
    ];
  }, [constructorData]);

  const [isOrderModalOpened, setIsOrderModalOpened] = useState<boolean>(false);

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
        ...mainIngredients.map((ingredient) => ingredient._id),
      ]);

      setOrderNumber(orderNumber);
      setIsOrderModalOpened(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeOrderModal = () => {
    setIsOrderModalOpened(false);
  };

  const removeIngredient = (ingredient: BurgerIngredient) => {
    dispatchConstructorData({
      type: ConstructorDataActionType.Remove,
      ingredient,
    });
  };

  return (
    <>
      <div className={`pl-4 pb-4 ${className}`}>
        {!!constructorData.ingredients.length && (
          <>
            {!!bun && (
              <div className="pl-8">
                <ConstructorElement
                  type="top"
                  extraClass="mb-4"
                  isLocked={true}
                  text={bun.name}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
            )}

            <div
              className={`${styles.main} custom-scroll ${
                mainIngredients.length ? "" : styles.main_empty
              }`}
            >
              {mainIngredients.length ? (
                mainIngredients.map((ingredient, index) => (
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
                      handleClose={() => removeIngredient(ingredient)}
                    />
                  </div>
                ))
              ) : (
                <span className="text text_type_main-default text_color_inactive">
                  Добавьте ингредиенты
                </span>
              )}
            </div>

            {!!bun && (
              <div className="pl-8 mb-10">
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  extraClass="mt-4"
                  text={bun.name}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
            )}
          </>
        )}

        <div className={styles.order}>
          <div className={`${styles.order__sum} mr-10`}>
            <p className="text text_type_main-large mr-3">
              {constructorData.totalPrice}
            </p>
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
