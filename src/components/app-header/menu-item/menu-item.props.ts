import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";
import { FunctionComponent } from "react";

export interface MenuItemProps {
  to: string;
  icon: FunctionComponent<TIconProps>;
  className?: string;
}
