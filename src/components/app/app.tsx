import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerContructor } from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { FC, useEffect, useMemo, useState } from "react";
import { BurgerIngredient } from "../../interfaces/burger-ingredient";
import { getIngredients } from "../../utils/data-access";
import { BurgerContructorContext } from "../../contexts/burger-constructor.context";
import { IngredientType } from "../../interfaces/ingredient-type";

const App: FC = () => {
  const [ingredients, setIngredients] = useState<BurgerIngredient[]>([]);
  const [orderNumber, setOrderNumber] = useState<number | undefined>();
  const constructorIngredients = useMemo(() => {
    if (!ingredients.length) {
      return [];
    }
    return [
      ingredients.find((ingredient) => ingredient.type === IngredientType.Bun) as BurgerIngredient,
      ...ingredients.filter(
        (ingredient) => ingredient.type !== IngredientType.Bun
      ),
    ];
  }, [ingredients]);
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
            <BurgerContructorContext.Provider
              value={{ ingredients: constructorIngredients, orderNumber, setOrderNumber }}
            >
              <BurgerIngredients ingredients={ingredients} />
              <BurgerContructor />
            </BurgerContructorContext.Provider>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
