import { FC } from "react";
import { AppHeader } from "components/app-header/app-header";
import { Outlet } from "react-router-dom";

const App: FC = () => {
  return (
    <div className="App">
      <AppHeader />
      <main className={`container pl-5 pr-5`}>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
