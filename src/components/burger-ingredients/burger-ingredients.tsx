import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback, useMemo, useState } from "react";
import { IngredientType } from "../../interfaces/ingredient-type";
import styles from "./burger-ingredients.module.css";
import { BurgerIngredientsProps } from "./burger-ingredients.props";
import { IngredientsCategory } from "./ingredients-category/ingredients-category";

export const BurgerIngredients: FC<BurgerIngredientsProps> = ({
  className,
  ingredients,
}) => {
  // const { bun, ingredients } = useTypedSelector(
  //   (state) => state.constructorData
  // );
  const [currentIngredient, setCurrentIngredient] = useState(
    IngredientType.Bun as string
  );
  const getCategoryIngredients = useCallback(
    (type: IngredientType) =>
      ingredients.filter((d) => (d.type as IngredientType) === type),
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
  return (
    <div className={`${className} pb-4`}>
      <div className="mb-10" style={{ display: "flex" }}>
        <Tab
          value={IngredientType.Bun}
          active={currentIngredient === IngredientType.Bun}
          onClick={setCurrentIngredient}
        >
          Булки
        </Tab>
        <Tab
          value={IngredientType.Sauce}
          active={currentIngredient === IngredientType.Sauce}
          onClick={setCurrentIngredient}
        >
          Соусы
        </Tab>
        <Tab
          value={IngredientType.Main}
          active={currentIngredient === IngredientType.Main}
          onClick={setCurrentIngredient}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients} custom-scroll`}>
        <IngredientsCategory
          className="mb-10"
          name="Булки"
          ingredients={buns}
        />
        <IngredientsCategory
          className="mb-10"
          name="Соусы"
          ingredients={sauces}
        />
        <IngredientsCategory
          className="mb-10"
          name="Начинки"
          ingredients={fillings}
        />
      </div>
    </div>
  );
};
