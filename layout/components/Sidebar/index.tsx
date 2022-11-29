import {memo} from "react";
import { SidebarProps } from "./Sidebar.props";
import cn from "classnames";
import styles from "./Sidebar.module.css";
import { Menu } from "../index";

const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
  return (
    <div {...props}>
      <Menu />
    </div>
  );
};

export default memo(Sidebar);