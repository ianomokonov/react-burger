import { FC } from "react";
import styles from "./profile.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTypedDispatch } from "redux/hooks";
import { logoutThunk } from "redux/user/thunks";

export const Profile: FC = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const logout = async () => {
    await dispatch(logoutThunk(() => navigate("/login")));
  };
  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <NavLink
          className={({ isActive }) =>
            `text text_type_main-medium ${styles.menu__item} ${
              isActive ? "" : styles.text_color_inactive
            }`
          }
          to="/profile"
        >
          Профиль
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text text_type_main-medium ${styles.menu__item} ${
              isActive ? "" : styles.text_color_inactive
            }`
          }
          to="/orders-history"
        >
          История заказов
        </NavLink>
        <span
          onClick={logout}
          className={`text text_type_main-medium ${styles.menu__item} ${styles.text_color_inactive}`}
        >
          Выход
        </span>
        <span
          className={`text text_type_main-default ${styles.page__description}`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
