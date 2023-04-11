import { AppHeader } from "components/app-header/app-header";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <>
      <AppHeader />
      <main className={`container pl-5 pr-5`}>
        <Outlet />
      </main>
    </>
  );
};
