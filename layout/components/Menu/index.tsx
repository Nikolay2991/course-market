import { memo, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import cn from 'classnames';

import { AppContext } from '../../../context/app.context';

import { FirstLevelMenuItem, PageItem } from '../../../interfaces/menu.interface';

import { TopLevelCategory } from '../../../interfaces/page.interface';

import CoursesIcon from './icons/courses-icon.svg';
import BookIcon from './icons/Books-icon.svg';
import ProductIcon from './icons/products-icon.svg';
import ServiceIcon from './icons/services-icon.svg';

import styles from './Menu.module.css';



const FirstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses},
  { route: 'services', name: 'Сервисы', icon: <ServiceIcon />, id: TopLevelCategory.Services},
  { route: 'books', name: 'Книги', icon: <BookIcon />, id: TopLevelCategory.Books},
  { route: 'products', name: 'Продукты', icon: <ProductIcon />, id: TopLevelCategory.Products},
];

const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);

  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      if(m._id.secondCategory == secondCategory) {
        m.isOpened = !m.isOpened;
      }
      return m;
    }));
  };

  const buildFirstLevel = () => {
    return (
      <>
        {FirstLevelMenu.map(m => (
          <div key={m.route}>
            <Link href={`/${m.route}`}>
              <div className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: m.id == firstCategory
              })}>
                {m.icon}
                <span>
                  {m.name}
                </span>
              </div>
            </Link>
            {m.id == firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map(m => {
          if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            m.isOpened = true;
          }
          return (
            <div key={m._id.secondCategory}>
              <div
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
              >
                {m._id.secondCategory}
              </div>
              <div
                className={cn(
                  styles.secondLevelBlock,
                  {[ styles.secondLevelBlockOpen]: m.isOpened }
                )}
              >
                {buildThirdLevel(m.pages, menuItem.route)}
              </div>
            </div>
          )
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      pages.map(page => (
        <Link
          className={cn(
            styles.thirtLevel,
            {[styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath}
          )}
          href={`/${route}/${page.alias}`}
          key={page.alias}
        >
          {page.category}
        </Link>
      ))
    );
  };

  return (
    <div className={styles.menu}>
      {buildFirstLevel()}
    </div>
  );
};

export default memo(Menu);