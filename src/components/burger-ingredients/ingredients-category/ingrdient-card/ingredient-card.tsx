import { IngredientCardProps } from "./ingredient-card.props";
import styles from "./ingredient-card.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { useDrag } from "react-dnd";
import { IngredientType } from "../../../../interfaces/ingredient-type";

export const IngredientCard: FC<IngredientCardProps> = ({
  price,
  name,
  __v,
  image,
  type,
  _id,
  onClick,
}) => {
  const [, ingredientRef] = useDrag(
    () => ({
      type: type === IngredientType.Bun ? "bun" : "main",
      item: { id: _id },
    }),
    []
  );
  return (
    <div className={styles.ingredient} onClick={onClick} ref={ingredientRef}>
      <img src={image} alt="" className={styles.ingredient__img} />
      <p className={styles.ingredient__price}>
        <span className="mr-4 text text_type_main-default">{price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${styles.ingredient__title} text text_type_main-default`}>
        {name}
      </p>
      {!!__v && (
        <Counter
          count={__v}
          size="default"
          extraClass={styles.ingredient__count}
        />
      )}
    </div>
  );
};
