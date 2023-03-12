import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerContructor } from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { FC, useEffect, useReducer, useState } from "react";
import { BurgerIngredient } from "../../interfaces/burger-ingredient";
import { getIngredients } from "../../utils/data-access";
import { BurgerContructorContext } from "../../contexts/burger-constructor.context";
import { constructorDataReducer } from "../../reducers/constructor-data/constructor-data.reducer";
import { ConstructorDataActionType } from "../../reducers/constructor-data/constructor-data.action";
import { IngredientType } from "../../interfaces/ingredient-type";

const App: FC = () => {
  const [ingredients, setIngredients] = useState<BurgerIngredient[]>([]);
  const [orderNumber, setOrderNumber] = useState<number | undefined>();
  const [constructorData, constructorDataDispatcher] = useReducer(
    constructorDataReducer,
    {
      ingredients: [],
      totalPrice: 0,
    }
  );
  useEffect(() => {
    getIngredients()
      .then(({ data }) => {
        setIngredients(data);
        constructorDataDispatcher({
          type: ConstructorDataActionType.Add,
          ingredient: data.find((d) => d.type === IngredientType.Bun),
        });
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main className={`container pt-10 pl-5 pr-5`}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        {!!ingredients.length && (
          <div className={styles.content}>
            <BurgerContructorContext.Provider
              value={{
                constructorData,
                orderNumber,
                setOrderNumber,
                dispatchConstructorData: constructorDataDispatcher,
              }}
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
