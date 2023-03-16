import { IngredientsCategoryProps } from "./ingredients-category.props";
import styles from "./ingredients-category.module.css";
import { IngredientCard } from "./ingrdient-card/ingredient-card";
import { Modal } from "../../modal/modal";
import { BurgerIngredient } from "../../../interfaces/burger-ingredient";
import { forwardRef, useCallback } from "react";
import { IngredientDetails } from "./ingredient-details/ingredient-details";
import { useTypedDispatch, useTypedSelector } from "../../../redux/hooks";
import { getIngredientDetails } from "../../../redux/selectors";
import {
  closeIngredientDetailsModal,
  openIngredientDetailsModal,
} from "../../../redux/ingredient-details/ingredient-details.slice";

export const IngredientsCategory = forwardRef<
  HTMLDivElement,
  IngredientsCategoryProps
>(({ className, ingredients, name }, ref) => {
  const dispatch = useTypedDispatch();

  const { ingredient: activeIngredient } =
    useTypedSelector(getIngredientDetails);

  const toggleDelailsModal = useCallback(
    (ingredient?: BurgerIngredient) => {
      if (ingredient) {
        dispatch(openIngredientDetailsModal(ingredient));
        return;
      }
      dispatch(closeIngredientDetailsModal());
    },
    [dispatch]
  );

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
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
});
