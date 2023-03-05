import React, { FC, PropsWithChildren } from "react";
import { MenuItemProps } from "./menu-item.props";
import styles from "./menu-item.module.css";

export const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({
  icon,
  className,
  isActive,
  children,
}) => {
  return (
    <a
      href="/"
      className={`${className} ${styles.link} p-5 text text_type_main-default ${
        isActive ? "" : "text_color_inactive"
      }`}
    >
      {React.createElement(icon, { type: isActive ? "primary" : "secondary" })}
      <span className={`pl-2 ${isActive ? "" : "text_color_inactive"}`}>
        {children}
      </span>
    </a>
  );
};
