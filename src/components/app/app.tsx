import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerContructor } from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { FC, useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useTypedDispatch, useTypedSelector } from "../../redux/hooks";
import { getIngredientsThank } from "../../redux/ingredients/thunks";
import { Loader } from "../loader/loader";

const App: FC = () => {
  const { ingredients, isLoading } = useTypedSelector(
    (store) => store.ingredients
  );

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
