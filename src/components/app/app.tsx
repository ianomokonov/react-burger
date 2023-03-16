import styles from "./app.module.css";
import { FC, useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useTypedDispatch, useTypedSelector } from "redux/hooks";
import { getIngredientsThank } from "redux/ingredients/thunks";
import { AppHeader } from "components/app-header/app-header";
import { Loader } from "components/loader/loader";
import { BurgerIngredients } from "components/burger-ingredients/burger-ingredients";
import { BurgerContructor } from "components/burger-constructor/burger-constructor";
import { getIngredients } from "redux/selectors";

const App: FC = () => {
  const { ingredients, isLoading } = useTypedSelector(getIngredients);

  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getIngredientsThank());
  }, [dispatch]);
  return (
    <div className="App">
      <AppHeader />
      <main
        className={`container pt-10 pl-5 pr-5 ${
          isLoading ? styles.loading : ""
        }`}
      >
        {isLoading ? (
          <Loader />
        ) : (
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
        )}
      </main>
    </div>
  );
};

export default App;
