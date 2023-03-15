import { IngredientsCategoryProps } from "./ingredients-category.props";
import styles from "./ingredients-category.module.css";
import { IngredientCard } from "./ingrdient-card/ingredient-card";
import { Modal } from "../../modal/modal";
import { BurgerIngredient } from "../../../interfaces/burger-ingredient";
import { forwardRef, useState } from "react";
import { IngredientDetails } from "./ingredient-details/ingredient-details";

export const IngredientsCategory = forwardRef<
  HTMLDivElement,
  IngredientsCategoryProps
>(({ className, ingredients, name }, ref) => {
  const [activeIngredient, setActiveIngredient] = useState<
    BurgerIngredient | undefined
  >();

  const toggleDelailsModal = (ingredient?: BurgerIngredient) => {
    setActiveIngredient(ingredient);
  };

  return (
    <>
      <div className={className} ref={ref}>
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
});
