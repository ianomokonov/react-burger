import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";
import { FunctionComponent } from "react";

export interface MenuItemProps {
  icon: FunctionComponent<TIconProps>;
  isActive?: boolean;
  className?: string;
}
