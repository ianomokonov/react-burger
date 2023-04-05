import { FC } from "react";
import styles from "./profile.module.css";
import { NavLink, Outlet } from "react-router-dom";

export const Profile: FC = () => {
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
        <NavLink
          className={({ isActive }) =>
            `text text_type_main-medium ${styles.menu__item} ${
              isActive ? "" : styles.text_color_inactive
            }`
          }
          to="/logout"
        >
          Выход
        </NavLink>
        <span
          className="text text_type_main-default"
          style={{ opacity: "0.4" }}
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
