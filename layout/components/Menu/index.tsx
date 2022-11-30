import { memo, useContext } from "react";
import { AppContext } from "../../../context/app.context";
import { format } from "date-fns";
import cn from "classnames";
import styles from "./Menu.module.css";
import { FirstLevelMenuItem, PageItem } from "../../../interfaces/menu.interface";
import CoursesIcon from "./icons/courses-icon.svg";
import BookIcon from "./icons/Books-icon.svg";
import ProductIcon from "./icons/products-icon.svg";
import ServiceIcon from "./icons/services-icon.svg";
import { TopLevelCategory } from "../../../interfaces/page.interface";

const FirstLevelMenu: FirstLevelMenuItem[] = [
  { route: "courses", name: "Курсы", icon: <CoursesIcon />, id: TopLevelCategory.Courses},
  { route: "services", name: "Сервисы", icon: <ServiceIcon />, id: TopLevelCategory.Services},
  { route: "books", name: "Книги", icon: <BookIcon />, id: TopLevelCategory.Books},
  { route: "products", name: "Продукты", icon: <ProductIcon />, id: TopLevelCategory.Products},
];

const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);

  const buildFirstLevel = () => {
    return (
      <>
        {FirstLevelMenu.map(m => (
          <div key={m.route}>
            <a href={`/${m.route}`}>
              <div className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: m.id == firstCategory
              })}>
                {m.icon}
                <span>
                  {m.name}
                </span>
              </div>
            </a>
            {m.id == firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map(m => (
          <div key={m._id.secondCategory}>
            <div className={styles.secondLevel}>
              {m._id.secondCategory}
            </div>
            <div className={cn(styles.secondLevelBlock, {
              [styles.secondLevelBlockOpen]: m.isOpened
            })}>
              {buildThirdLevel(m.pages, menuItem.route)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      pages.map(page => (
        <a
          className={cn(
            styles.thirtLevel,
            {[styles.thirdLevelActive]: false}
          )}
          href={`/${route}/${page.alias}`}
          key={page.alias}
        >
          {page.category}
        </a>
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