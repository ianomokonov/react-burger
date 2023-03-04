import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { IngredientType } from "../../interfaces/ingredient-type";
import styles from "./burger-ingredients.module.css";
import { BurgerIngredientsProps } from "./burger-ingredients.props";
import PropTypes from "prop-types";
import { IngredientsCategory } from "./ingredients-category/ingredients-category";

export function BurgerIngredients({
  className,
  ingredients,
}: BurgerIngredientsProps) {
  const [currentIngredient, setCurrentIngredient] = useState(
    IngredientType.Bun as string
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
          ingredients={ingredients.filter(
            (d) => (d.type as IngredientType) === IngredientType.Bun
          )}
        />
        <IngredientsCategory
          className="mb-10"
          name="Соусы"
          ingredients={ingredients.filter(
            (d) => (d.type as IngredientType) === IngredientType.Sauce
          )}
        />
        <IngredientsCategory
          className="mb-10"
          name="Начинки"
          ingredients={ingredients.filter(
            (d) => (d.type as IngredientType) === IngredientType.Main
          )}
        />
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  className: PropTypes.string,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
};
