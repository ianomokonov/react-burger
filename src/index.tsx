import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { ForgotPassword } from "pages/forgot-password/forgot-password";
import { Ingredient } from "pages/ingredient/ingredient";
import { Login } from "pages/login/login";
import { Main } from "pages/main/main";
import { EditForm } from "pages/profile/edit-form/edit-form";
import { Profile } from "pages/profile/profile";
import { Register } from "pages/register/register";
import { ResetPassword } from "pages/reset-password/reset-password";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "components/app/app";
import { NotFound } from "pages/not-found/not-found";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="profile" element={<Profile />}>
              <Route path="" element={<EditForm />} />
            </Route>
            <Route path="ingredient/:id" element={<Ingredient />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
