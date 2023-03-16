import { FC } from "react";
import { useTypedSelector } from "../../../../redux/hooks";
import { getIngredientDetails } from "../../../../redux/selectors";
import styles from "./ingredient-details.module.css";

export const IngredientDetails: FC = () => {
  const { ingredient } = useTypedSelector(getIngredientDetails);

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
