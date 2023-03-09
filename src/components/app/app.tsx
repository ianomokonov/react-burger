import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerContructor } from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { FC, useEffect, useState } from "react";
import { BurgerIngredient } from "../../interfaces/burger-ingredient";
import { getIngredients } from "../../utils/data-access";

const App: FC = () => {
  const [ingredients, setIngredients] = useState<BurgerIngredient[]>([]);
  useEffect(() => {
    getIngredients()
      .then(({ data }) => setIngredients(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main className={`container pt-10 pl-5 pr-5`}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        {ingredients.length && (
          <div className={styles.content}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerContructor ingredients={ingredients} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
