import cn from 'classnames';

import {PtagProps} from './Ptag.props';
import styles from './Ptag.module.css';

export const Ptag = ({ size = 'm', className, children, ...props }: PtagProps): JSX.Element => {
  return <p className={cn(styles[size], className)} {...props}>{children}</p>;
};