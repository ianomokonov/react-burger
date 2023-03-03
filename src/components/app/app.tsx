import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerContructor } from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <BurgerIngredients />
        <BurgerContructor />
      </main>
    </div>
  );
}

export default App;
