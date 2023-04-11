import { FC, useMemo } from "react";
import { useTypedSelector } from "redux/hooks";
import styles from "./ingredient-details.module.css";
import { getIngredients } from "redux/selectors";
import { useParams } from "react-router-dom";

export const IngredientDetails: FC = () => {
  const { id: ingredientId } = useParams();
  const { ingredients } = useTypedSelector(getIngredients);
  const ingredient = useMemo(
    () => ingredients.find((ing) => ing._id === ingredientId),
    [ingredients, ingredientId]
  );

  if (!ingredient) {
    return null;
  }

  return (
    <div className={styles.ingredient}>
      <img
        src={ingredient.image_large}
        className={styles.ingredient__image}
        alt=""
      />
      <p
        className={`${styles.ingredient__title} mb-8 text text_type_main-medium`}
      >
        {ingredient.name}
      </p>
      <div className={styles.details}>
        <div className={styles.detail}>
          <span
            className={`${styles.detail__title} text text_type_main-default`}
          >
            Калории,ккал
          </span>
          <span
            className={`${styles.detail__value} text text_type_digits-default`}
          >
            {ingredient.calories}
          </span>
        </div>
        <div className={styles.detail}>
          <span
            className={`${styles.detail__title} text text_type_main-default`}
          >
            Белки, г
          </span>
          <span
            className={`${styles.detail__value} text text_type_digits-default`}
          >
            {ingredient.proteins}
          </span>
        </div>
        <div className={styles.detail}>
          <span
            className={`${styles.detail__title} text text_type_main-default`}
          >
            Жиры, г
          </span>
          <span
            className={`${styles.detail__value} text text_type_digits-default`}
          >
            {ingredient.fat}
          </span>
        </div>
        <div className={styles.detail}>
          <span
            className={`${styles.detail__title} text text_type_main-default`}
          >
            Углеводы, г
          </span>
          <span
            className={`${styles.detail__value} text text_type_digits-default`}
          >
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};
