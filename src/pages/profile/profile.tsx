import { FC } from "react";
import styles from "./profile.module.css";
import { Outlet } from "react-router-dom";

export const Profile: FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.menu}></div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
