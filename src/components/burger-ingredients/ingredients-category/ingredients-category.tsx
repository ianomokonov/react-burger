import { IngredientsCategoryProps } from "./ingredients-category.props";
import styles from "./ingredients-category.module.css";
import { IngredientCard } from "./ingrdient-card/ingredient-card";
import { Modal } from "../../modal/modal";
import { BurgerIngredient } from "../../../interfaces/burger-ingredient";
import { useState } from "react";
import { IngredientDetails } from "./ingredient-details/ingredient-details";
import { FC } from "react";
import { useTypedDispatch } from "../../../redux/hooks";
import {
  addIngredient,
  setBun,
} from "../../../redux/constructor/constructor.slice";
import { IngredientType } from "../../../interfaces/ingredient-type";

export const IngredientsCategory: FC<IngredientsCategoryProps> = ({
  className,
  ingredients,
  name,
}) => {
  const [activeIngredient, setActiveIngredient] = useState<
    BurgerIngredient | undefined
  >();
  const dispatch = useTypedDispatch();

  const toggleDelailsModal = (ingredient?: BurgerIngredient) => {
    if (ingredient) {
      dispatch(
        ingredient.type === IngredientType.Bun
          ? setBun(ingredient)
          : addIngredient(ingredient)
      );
    }
    // setActiveIngredient(ingredient);
  };

  return (
    <>
      <div className={className}>
        <h3 className="text text_type_main-medium">{name}</h3>
        <div
          className={`${styles["ingredient-category__items"]} pt-6 pl-4 pr-4`}
        >
          {ingredients.map((ingredient) => (
            <IngredientCard
              {...ingredient}
              key={ingredient._id}
              onClick={() => toggleDelailsModal(ingredient)}
            />
          ))}
        </div>
      </div>
      {activeIngredient && (
        <Modal title="Детали ингредиента" onClose={() => toggleDelailsModal()}>
          <IngredientDetails ingredient={activeIngredient} />
        </Modal>
      )}
    </>
  );
};
