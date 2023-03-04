import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { IngredientType } from "../../interfaces/ingredient-type";
import { data } from "../../utils/data";
import styles from "./burger-ingredients.module.css";

export function BurgerIngredients({ className }: { className?: string }) {
  const [currentIngredient, setCurrentIngredient] = useState("buns");
  return (
    <div className={`${className} pb-4`}>
      <div className="mb-10" style={{ display: "flex" }}>
        <Tab
          value="buns"
          active={currentIngredient === "buns"}
          onClick={setCurrentIngredient}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={currentIngredient === "sauces"}
          onClick={setCurrentIngredient}
        >
          Соусы
        </Tab>
        <Tab
          value="fillings"
          active={currentIngredient === "fillings"}
          onClick={setCurrentIngredient}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients} custom-scroll`}>
        <div className="ingredient-category">
          <h3 className="text text_type_main-medium">Булки</h3>
          <div
            className={`${styles["ingredient-category__items"]} pt-6 pb-10 pl-4 pr-4`}
          >
            {data
              .filter((d) => (d.type as IngredientType) === IngredientType.Bun)
              .map((ingredient) => (
                <div className={styles.ingredient} key={ingredient._id}>
                  <img
                    src={ingredient.image}
                    alt=""
                    className={styles.ingredient__img}
                  />
                  <p className={styles.ingredient__price}>
                    <span className="mr-4 text text_type_main-default">
                      {ingredient.price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </p>
                  <p
                    className={`${styles.ingredient__title} text text_type_main-default`}
                  >
                    {ingredient.name}
                  </p>
                  {!!ingredient.__v && (
                    <Counter
                      count={ingredient.__v}
                      size="default"
                      extraClass={styles.ingredient__count}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="ingredient-category">
          <h3 className="text text_type_main-medium">Соусы</h3>
          <div
            className={`${styles["ingredient-category__items"]} pt-6 pb-10 pl-4 pr-4`}
          >
            {data
              .filter(
                (d) => (d.type as IngredientType) === IngredientType.Souce
              )
              .map((ingredient) => (
                <div className={styles.ingredient} key={ingredient._id}>
                  <img
                    src={ingredient.image}
                    alt=""
                    className={styles.ingredient__img}
                  />
                  <p className={styles.ingredient__price}>
                    <span className="mr-4 text text_type_main-default">
                      {ingredient.price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </p>
                  <p
                    className={`${styles.ingredient__title} text text_type_main-default`}
                  >
                    {ingredient.name}
                  </p>
                  {!!ingredient.__v && (
                    <Counter
                      count={ingredient.__v}
                      size="default"
                      extraClass={styles.ingredient__count}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="ingredient-category">
          <h3 className="text text_type_main-medium">Начинки</h3>
          <div
            className={`${styles["ingredient-category__items"]} pt-6 pb-10 pl-4 pr-4`}
          >
            {data
              .filter((d) => (d.type as IngredientType) === IngredientType.Main)
              .map((ingredient) => (
                <div className={styles.ingredient} key={ingredient._id}>
                  <img
                    src={ingredient.image}
                    alt=""
                    className={styles.ingredient__img}
                  />
                  <p className={styles.ingredient__price}>
                    <span className="mr-4 text text_type_main-default">
                      {ingredient.price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </p>
                  <p
                    className={`${styles.ingredient__title} text text_type_main-default`}
                  >
                    {ingredient.name}
                  </p>
                  {!!ingredient.__v && (
                    <Counter
                      count={ingredient.__v}
                      size="default"
                      extraClass={styles.ingredient__count}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
