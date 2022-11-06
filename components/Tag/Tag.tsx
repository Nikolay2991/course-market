import {memo} from 'react';
import {TagProps} from './Tag.props';
import cn from 'classnames';
import styles from './Tag.module.css';

export const Tag = ({
  size = 'm',
  color = 'ghost',
  href,
  className,
  children,
  ...props
}: TagProps): JSX.Element => {
  
  return (
    <div 
      className={cn(
        styles.tag,
        styles[size],
        styles[color],
        className)}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : {children}}
    </div>
  )
};