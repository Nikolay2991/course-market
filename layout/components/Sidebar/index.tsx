import { memo } from 'react';
import cn from 'classnames';

import { Menu } from '../index';

import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';

const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
  return (
    <div {...props}>
      <Menu />
    </div>
  );
};

export default memo(Sidebar);