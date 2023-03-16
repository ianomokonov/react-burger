import { IngredientCardProps } from "./ingredient-card.props";
import styles from "./ingredient-card.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { useDrag } from "react-dnd";
import { useTypedSelector } from "redux/hooks";
import { getConstructorData } from "redux/selectors";
import { IngredientType } from "interfaces/ingredient-type";

export const IngredientCard: FC<IngredientCardProps> = ({
  price,
  name,
  image,
  type,
  _id,
  onClick,
}) => {
  const { ingredients, bun } = useTypedSelector(getConstructorData);

  const selectedCount = useMemo(() => {
    if (type === IngredientType.Bun) {
      return bun?._id === _id ? 2 : 0;
    }
    return ingredients.filter((ingredient) => ingredient._id === _id).length;
  }, [type, ingredients, bun?._id, _id]);

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
      {!!selectedCount && (
        <Counter
          count={selectedCount}
          size="default"
          extraClass={styles.ingredient__count}
        />
      )}
    </div>
  );
};
