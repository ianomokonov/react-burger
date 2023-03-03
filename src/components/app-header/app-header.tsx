import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { MenuItem } from "./menu-item/menu-item";

export function AppHeader() {
  return (
    <header className={`container p-4 ${styles["app-header"]}`}>
      <div className={styles.links}>
        <MenuItem icon={<BurgerIcon type="primary" />} isAcive={true}>
          Конструктор
        </MenuItem>
        <MenuItem icon={<ListIcon type="secondary" />} isAcive={false}>
          Лента заказов
        </MenuItem>
      </div>
      <Logo />
      <div className={styles.links}>
        <MenuItem icon={<ProfileIcon type="secondary" />} isAcive={false}>
          Личный кабинет
        </MenuItem>
      </div>
    </header>
  );
}
