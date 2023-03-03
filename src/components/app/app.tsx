import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerContructor } from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { data } from "../../utils/data";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={`container pt-10 pl-5 pr-5`}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        <div className={styles.content}>
          <BurgerIngredients />
          <BurgerContructor ingredients={data} />
        </div>
      </main>
    </div>
  );
}

export default App;
