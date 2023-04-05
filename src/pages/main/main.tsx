import { BurgerContructor } from "components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "components/burger-ingredients/burger-ingredients";
import { Loader } from "components/loader/loader";
import { FC, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTypedDispatch, useTypedSelector } from "redux/hooks";
import { getIngredientsThank } from "redux/ingredients/thunks";
import { getIngredients } from "redux/selectors";
import styles from "./main.module.css";

export const Main: FC = () => {
  const { ingredients, isLoading } = useTypedSelector(getIngredients);

  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getIngredientsThank());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      {!!ingredients.length && (
        <div className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerContructor />
          </DndProvider>
        </div>
      )}
    </>
  );
};
