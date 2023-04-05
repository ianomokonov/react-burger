import { IngredientsCategoryProps } from "./ingredients-category.props";
import styles from "./ingredients-category.module.css";
import { IngredientCard } from "./ingrdient-card/ingredient-card";
import { forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const IngredientsCategory = forwardRef<
  HTMLDivElement,
  IngredientsCategoryProps
>(({ className, ingredients, name }, ref) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className={className} ref={ref}>
        <h3 className="text text_type_main-medium">{name}</h3>
        <div
          className={`${styles["ingredient-category__items"]} pt-6 pl-4 pr-4`}
        >
          {ingredients.map((ingredient) => (
            <IngredientCard
              key={ingredient._id}
              {...ingredient}
              onClick={() =>
                navigate(`/ingredients/${ingredient._id}`, {
                  state: { background: location },
                })
              }
            />
          ))}
        </div>
      </div>
    </>
  );
});
