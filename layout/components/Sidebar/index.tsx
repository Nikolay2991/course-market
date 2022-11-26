import {memo} from "react";
import { SidebarProps } from "./Sidebar.props";
import cn from "classnames";
import styles from "./Sidebar.module.css";

const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
  return (
    <div {...props}>
      Sidebar
    </div>
  );
};

export default memo(Sidebar);