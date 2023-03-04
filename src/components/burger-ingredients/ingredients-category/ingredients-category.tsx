import { IngredientsCategoryProps } from "./ingredients-category.props";
import styles from "./ingredients-category.module.css";
import { IngredientCard } from "./ingrdient-card/ingredient-card";

export function IngredientsCategory({
  className,
  ingredients,
  name,
}: IngredientsCategoryProps) {
  return (
    <div className={className}>
      <h3 className="text text_type_main-medium">{name}</h3>
      <div className={`${styles["ingredient-category__items"]} pt-6 pl-4 pr-4`}>
        {ingredients.map((ingredient) => (
          <IngredientCard {...ingredient} key={ingredient._id} />
        ))}
      </div>
    </div>
  );
}
