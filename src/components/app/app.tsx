import { FC } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ForgotPassword } from "pages/forgot-password/forgot-password";
import { Ingredient } from "pages/ingredient/ingredient";
import { Login } from "pages/login/login";
import { Main } from "pages/main/main";
import { NotFound } from "pages/not-found/not-found";
import { EditForm } from "pages/profile/edit-form/edit-form";
import { Profile } from "pages/profile/profile";
import { Register } from "pages/register/register";
import { ResetPassword } from "pages/reset-password/reset-password";
import { Layout } from "components/layout/layout";
import { Modal } from "components/modal/modal";
import { IngredientDetails } from "components/burger-ingredients/ingredients-category/ingredient-details/ingredient-details";
import { ProtectedRoute } from "components/protected-route/protected-route";

const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  return (
    <>
      <Routes location={state?.background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="profile"
            element={<ProtectedRoute element={<Profile />} />}
          >
            <Route index element={<EditForm />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="ingredients/:id" element={<Ingredient />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {state?.background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal
                title="Детали ингредиента"
                onClose={() => navigate(state.background)}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
