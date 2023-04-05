import { FC } from "react";
import { AppHeader } from "components/app-header/app-header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "pages/main/main";
import { Login } from "pages/login/login";
import { Register } from "pages/register/register";
import { ResetPassword } from "pages/reset-password/reset-password";
import { ForgotPassword } from "pages/forgot-password/forgot-password";
import { Profile } from "pages/profile/profile";
import { Ingredient } from "pages/ingredient/ingredient";

const App: FC = () => {
  return (
    <div className="App">
      <AppHeader />
      <main className={`container pl-5 pr-5`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ingredient/:id" element={<Ingredient />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
};

export default App;
