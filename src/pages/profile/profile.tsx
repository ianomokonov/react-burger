import { FC, useMemo } from "react";
import styles from "./profile.module.css";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTypedDispatch } from "redux/hooks";
import { logoutThunk } from "redux/user/thunks";

export const Profile: FC = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const location = useLocation();

  const label = useMemo(() => {
    if (location.state?.label) {
      return location.state?.label;
    }

    return location.pathname.includes("orders")
      ? "В этом разделе вы можете просмотреть свою историю заказов"
      : "В этом разделе вы можете изменить свои персональные данные";
  }, [location.pathname, location.state]);

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
          to="/profile/"
          state={{
            label: "В этом разделе вы можете изменить свои персональные данные",
          }}
        >
          Профиль
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text text_type_main-medium ${styles.menu__item} ${
              isActive ? "" : styles.text_color_inactive
            }`
          }
          to="/profile/orders"
          state={{
            label: "В этом разделе вы можете просмотреть свою историю заказов",
          }}
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
          {label}
        </span>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
