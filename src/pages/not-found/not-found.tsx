import { FC } from "react";
import styles from "./not-found.module.css";

export const NotFound: FC = () => {
  return (
    <div className={`text text_type_main-large ${styles.container}`}>
      Страница не найдена
    </div>
  );
};
