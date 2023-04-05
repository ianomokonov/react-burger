import React, { FC, PropsWithChildren } from "react";
import { MenuItemProps } from "./menu-item.props";
import styles from "./menu-item.module.css";
import { NavLink } from "react-router-dom";

export const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({
  icon,
  className,
  children,
  to,
}) => {
  return (
    <NavLink
      to={to}
      className={`${className} ${styles.link} p-5 text text_type_main-default`}
      children={({ isActive }) => (
        <>
          {React.createElement(icon, {
            type: isActive ? "primary" : "secondary",
          })}
          <span className={`pl-2 ${isActive ? "" : "text_color_inactive"}`}>
            {children}
          </span>
        </>
      )}
    ></NavLink>
  );
};
