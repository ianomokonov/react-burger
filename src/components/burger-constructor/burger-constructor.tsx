import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorProps } from "./burger-constructor.props";
import styles from "./burger-constructor.module.css";
import { FC, useCallback, useMemo, useState } from "react";
import { Modal } from "../modal/modal";
import { OrderDetails } from "./order-details/order-details";
import { makeOrder } from "../../utils/data-access";
import { useTypedDispatch, useTypedSelector } from "../../redux/hooks";
import { useDrop } from "react-dnd";
import {
  addIngredient,
  removeIngredient,
  setBun,
  setOrderNumber,
} from "../../redux/constructor/constructor.slice";
import { ConstructorIngredient } from "../../interfaces/constructor-ingredient";
import { IngredientType } from "../../interfaces/ingredient-type";
import { DragIngredient } from "./drag-ingredient/drag-ingredient";

export const BurgerContructor: FC<BurgerConstructorProps> = ({ className }) => {
  const { bun, ingredients, allIngredients } = useTypedSelector((state) => ({
    bun: state.constructorData.bun,
    ingredients: state.constructorData.ingredients,
    allIngredients: state.ingredients.ingredients,
  }));

  const dispatch = useTypedDispatch();

  const [isOrderModalOpened, setIsOrderModalOpened] = useState<boolean>(false);

  const [{ isTopBunHovered }, topBunDropRef] = useDrop({
    accept: IngredientType.Bun,
    drop: (item: { id: string }) => {
      const stateIngredient = allIngredients.find(
        (ingredient) => ingredient._id === item.id
      );
      if (!stateIngredient) {
        return;
      }

      dispatch(setBun(stateIngredient));
    },
    collect: (monitor) => ({
      isTopBunHovered: monitor.isOver(),
    }),
  });

  const [{ isBottomBunHovered }, bottomBunDropRef] = useDrop({
    accept: IngredientType.Bun,
    drop: (item: { id: string }) => {
      const stateIngredient = allIngredients.find(
        (ingredient) => ingredient._id === item.id
      );
      if (!stateIngredient) {
        return;
      }

      dispatch(setBun(stateIngredient));
    },
    collect: (monitor) => ({
      isBottomBunHovered: monitor.isOver(),
    }),
  });

  const [{ isItemsHovered }, itemsDropRef] = useDrop({
    accept: IngredientType.Main,
    drop: (item: { id: string }, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      onAddIngredient(item.id);
    },
    collect: (monitor) => ({
      isItemsHovered: monitor.isOver(),
    }),
  });

  const totalPrice = useMemo(() => {
    const bunsPrice = bun ? bun.price * 2 : 0;
    return (
      ingredients?.reduce((prev, cur) => prev + cur.price, bunsPrice) ||
      bunsPrice
    );
  }, [bun, ingredients]);

  const onAddIngredient = useCallback(
    (id: string, index?: number) => {
      const stateIngredient = allIngredients.find(
        (ingredient) => ingredient._id === id
      );
      if (!stateIngredient) {
        return;
      }

      dispatch(addIngredient({ ingredient: stateIngredient, index }));
    },
    [allIngredients, dispatch]
  );

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

  const onRemoveIngredient = useCallback(
    (ingredient: ConstructorIngredient) => {
      dispatch(removeIngredient(ingredient));
    },
    [dispatch]
  );

  const getDragIngredient = useCallback(
    (ingredient: ConstructorIngredient, index: number) => (
      <DragIngredient
        key={ingredient.uniqueId}
        index={index}
        ingredient={ingredient}
        onRemoveIngredient={onRemoveIngredient}
        onAddIngredient={onAddIngredient}
        className={`pl-8 ${styles.ingredient}`}
        extraClass={styles.ingredient__card}
      />
    ),
    [onRemoveIngredient, onAddIngredient]
  );

  return (
    <>
      <div className={`pl-4 pb-4 ${className}`}>
        {!!bun ? (
          <div className="pl-8" ref={topBunDropRef}>
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
              ref={topBunDropRef}
              className="constructor-element constructor-element_pos_top mb-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: "2px",
                borderStyle: "dashed",
                borderColor:
                  isTopBunHovered || isBottomBunHovered
                    ? "var(--colors-interface-accent)"
                    : "transparent",
              }}
            >
              <span>Выберите булку</span>
            </div>
          </div>
        )}

        <div
          ref={itemsDropRef}
          style={{
            borderWidth: "2px",
            borderStyle: "dashed",
            borderColor:
              isItemsHovered && !ingredients.length
                ? "var(--colors-interface-accent)"
                : "transparent",
          }}
          className={`${styles.main} custom-scroll ${
            ingredients.length ? "" : styles.main_empty
          }`}
        >
          {ingredients.length ? (
            ingredients.map((ingredient, index) =>
              getDragIngredient(ingredient, index)
            )
          ) : (
            <span className="text text_type_main-default text_color_inactive">
              Добавьте ингредиенты
            </span>
          )}
        </div>

        {!!bun ? (
          <div className="pl-8 mb-10" ref={bottomBunDropRef}>
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
              ref={bottomBunDropRef}
              className="constructor-element constructor-element_pos_bottom mt-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: "2px",
                borderStyle: "dashed",
                borderColor:
                  isTopBunHovered || isBottomBunHovered
                    ? "var(--colors-interface-accent)"
                    : "transparent",
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
