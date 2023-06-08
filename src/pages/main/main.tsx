import { BurgerContructor } from "components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "components/burger-ingredients/burger-ingredients";
import { Loader } from "components/loader/loader";
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTypedSelector } from "redux/hooks";
import { getIngredients } from "redux/selectors";
import styles from "./main.module.css";

export const Main: FC = () => {
  const { ingredients, isLoading } = useTypedSelector(getIngredients);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }
  return (
    <div className="pt-10">
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      {!!ingredients.length && (
        <div className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerContructor />
          </DndProvider>
        </div>
      )}
    </div>
  );
};
