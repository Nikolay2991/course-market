import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
} from "next";
import { withLayout } from "../../layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import { TopPageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";
import { ParsedUrlQuery } from "querystring";

const firstCategory = 0;

interface CourseProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}

const Course = ({ menu, page, products }: CourseProps): JSX.Element => {
  return (
    <>
      {products.length}
    </>
  );
};

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "api/top-page/find", {
		firstCategory
	});

  return {
    paths: menu.flatMap(m => m.pages.map(p => "/courses/" + p.alias)),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

  console.log(process.env.NEXT_PUBLIC_DOMAIN + "api/product/find" + params.alias);

  if (!params) {
    return {
      notFound: true
    };
  }

	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "api/top-page/find", {
		firstCategory
	});

  const { data: page } = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + "api/top-page/byAlias/" + params.alias);

  const { data: products } = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + "api/product/find", {
    category: page.category,
    limit: 10,
  });
	return {
		props: {
			menu,
			firstCategory,
      page,
      products
		}
	};
};