import React, { PropsWithChildren } from "react";
import { MenuItemProps } from "./menu-item.props";
import styles from "./menu-item.module.css";

export function MenuItem({
  icon,
  className,
  isAcive,
  children,
}: PropsWithChildren<MenuItemProps>) {
  return (
    <a
      href="/"
      className={`${className} ${styles.link} p-5 text text_type_main-default ${
        isAcive ? "" : "text_color_inactive"
      }`}
    >
      {icon}
      <span className={`pl-2 ${isAcive ? "" : "text_color_inactive"}`}>
        {children}
      </span>
    </a>
  );
}
