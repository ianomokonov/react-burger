import { IngredientDetails } from "components/burger-ingredients/ingredients-category/ingredient-details/ingredient-details";
import { FC, useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "redux/hooks";
import { getIngredientsThank } from "redux/ingredients/thunks";
import { getIngredients } from "redux/selectors";
import styles from "../main/main.module.css";
import { Loader } from "components/loader/loader";
import { Navigate, useParams } from "react-router-dom";

export const Ingredient: FC = () => {
  const { ingredients, isLoading } = useTypedSelector(getIngredients);
  const { id } = useParams();

  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (ingredients?.length) {
      return;
    }
    dispatch(getIngredientsThank());
  }, [dispatch, ingredients]);

  if (!ingredients?.length || isLoading) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }

  if (!ingredients.find((i) => i._id === id)) {
    return <Navigate to={"/not-found"} />;
  }
  return (
    <div
      className="centered"
      style={{
        flexDirection: "column",
        paddingTop: "calc(var(--offset-base-size) * 30)",
      }}
    >
      <p className="text text_type_main-large">Детали ингредиента</p>
      <div style={{ maxWidth: "calc(var(--offset-base-size) * 160)" }}>
        <IngredientDetails />
      </div>
    </div>
  );
};
