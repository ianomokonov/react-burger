import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import styles from "./app-header.module.css";
import { MenuItem } from "./menu-item/menu-item";

export const AppHeader: FC = () => {
  return (
    <header className={styles["app-header"]}>
      <div className={`container pt-4 pb-4 ${styles["app-header__content"]}`}>
        <div className={styles.links}>
          <MenuItem icon={BurgerIcon} isActive={true}>
            Конструктор
          </MenuItem>
          <MenuItem icon={ListIcon} isActive={false}>
            Лента заказов
          </MenuItem>
        </div>
        <Logo />
        <div className={styles.links}>
          <MenuItem icon={ProfileIcon} isActive={false}>
            Личный кабинет
          </MenuItem>
        </div>
      </div>
    </header>
  );
};
