import { IngredientCardProps } from "./ingredient-card.props";
import styles from "./ingredient-card.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function IngredientCard({
  price,
  name,
  __v,
  image,
  onClick,
}: IngredientCardProps) {
  return (
    <div className={styles.ingredient} onClick={onClick}>
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
}
