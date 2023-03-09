import { BurgerIngredient } from "../../../../interfaces/burger-ingredient";

export interface IngredientCardProps
  extends Pick<BurgerIngredient, "price" | "name" | "__v" | "image" | "_id"> {
  onClick?: () => void;
}
