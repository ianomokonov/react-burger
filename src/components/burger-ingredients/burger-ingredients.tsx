import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientType } from "interfaces/ingredient-type";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { useTypedSelector } from "redux/hooks";
import { getIngredients } from "redux/selectors";
import styles from "./burger-ingredients.module.css";
import { BurgerIngredientsProps } from "./burger-ingredients.props";
import { IngredientsCategory } from "./ingredients-category/ingredients-category";

export const BurgerIngredients: FC<BurgerIngredientsProps> = ({
  className,
}) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const fillingsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const { ingredients } = useTypedSelector(getIngredients);
  const [currentIngredient, setCurrentIngredient] = useState(
    IngredientType.Bun as string
  );

  const onTabClick = (type: string) => {
    setCurrentIngredient(type);
    switch (type) {
      case IngredientType.Bun: {
        bunsRef.current?.scrollIntoView(true);
        return;
      }
      case IngredientType.Main: {
        fillingsRef.current?.scrollIntoView(true);
        return;
      }
      case IngredientType.Sauce: {
        saucesRef.current?.scrollIntoView(true);
        return;
      }
    }
  };
  const getCategoryIngredients = useCallback(
    (type: IngredientType) =>
      ingredients.filter((d) => d.type === type),
    [ingredients]
  );
  const buns = useMemo(
    () => getCategoryIngredients(IngredientType.Bun),
    [getCategoryIngredients]
  );
  const sauces = useMemo(
    () => getCategoryIngredients(IngredientType.Sauce),
    [getCategoryIngredients]
  );
  const fillings = useMemo(
    () => getCategoryIngredients(IngredientType.Main),
    [getCategoryIngredients]
  );

  const onScroll = useCallback((event: React.UIEvent<HTMLElement>) => {
    const tabsBottomCoord =
      tabsRef.current?.getBoundingClientRect().bottom || 0;

    if (
      !tabsRef.current ||
      !bunsRef.current ||
      !saucesRef.current ||
      !fillingsRef.current
    ) {
      return;
    }

    const deltas = [
      Math.abs(tabsBottomCoord - bunsRef.current.getBoundingClientRect().top),
      Math.abs(tabsBottomCoord - saucesRef.current.getBoundingClientRect().top),
      Math.abs(
        tabsBottomCoord - fillingsRef.current.getBoundingClientRect().top
      ),
    ];

    const minIndex = deltas.findIndex((delta) => delta === Math.min(...deltas));

    switch (minIndex) {
      case 0: {
        setCurrentIngredient(IngredientType.Bun);
        return;
      }
      case 1: {
        setCurrentIngredient(IngredientType.Sauce);
        return;
      }
      case 2: {
        setCurrentIngredient(IngredientType.Main);
        return;
      }
    }
  }, []);
  return (
    <div className={`${className} pb-4`}>
      <div className="pb-10 d-flex" ref={tabsRef}>
        <Tab
          value={IngredientType.Bun}
          active={currentIngredient === IngredientType.Bun}
          onClick={onTabClick}
        >
          Булки
        </Tab>
        <Tab
          value={IngredientType.Sauce}
          active={currentIngredient === IngredientType.Sauce}
          onClick={onTabClick}
        >
          Соусы
        </Tab>
        <Tab
          value={IngredientType.Main}
          active={currentIngredient === IngredientType.Main}
          onClick={onTabClick}
        >
          Начинки
        </Tab>
      </div>
      <div
        className={`${styles.ingredients} custom-scroll`}
        onScroll={onScroll}
      >
        <IngredientsCategory
          ref={bunsRef}
          className="mb-10"
          name="Булки"
          ingredients={buns}
        />
        <IngredientsCategory
          ref={saucesRef}
          className="mb-10"
          name="Соусы"
          ingredients={sauces}
        />
        <IngredientsCategory
          ref={fillingsRef}
          className="mb-10"
          name="Начинки"
          ingredients={fillings}
        />
      </div>
    </div>
  );
};
