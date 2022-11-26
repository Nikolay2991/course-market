import { type FC } from "react";
import { LayoutProps } from "./Layout.props";
import {
  Header,
  Footer,
  Sidebar,
} from "./components";
import cn from "classnames";
import styles from "./Ptag.module.css";

const Layout = ({children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Header />

      <div>
        <Sidebar />

        <div>
          {children}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FC<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};