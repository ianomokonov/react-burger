import { IngredientDetails } from "components/burger-ingredients/ingredients-category/ingredient-details/ingredient-details";
import { FC, useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "redux/hooks";
import { getIngredientsThunk } from "redux/ingredients/thunks";
import { getIngredients } from "redux/selectors";
import mainStyles from "../main/main.module.css";
import { Loader } from "components/loader/loader";
import { Navigate, useParams } from "react-router-dom";
import styles from "./ingredient.module.css";

export const Ingredient: FC = () => {
  const { ingredients, isLoading } = useTypedSelector(getIngredients);
  const { id } = useParams();

  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (ingredients?.length) {
      return;
    }
    dispatch(getIngredientsThunk());
  }, [dispatch, ingredients]);

  if (!ingredients?.length || isLoading) {
    return (
      <div className={mainStyles.loading}>
        <Loader />
      </div>
    );
  }

  if (!ingredients.find((i) => i._id === id)) {
    return <Navigate to={"/not-found"} />;
  }
  return (
    <div className={`centered ${styles.container}`}>
      <p className="text text_type_main-large">Детали ингредиента</p>
      <div className={styles.ingredient}>
        <IngredientDetails />
      </div>
    </div>
  );
};
