import { useState } from 'react';

import axios from 'axios';

import { GetStaticProps } from 'next';

import { Button, Htag, Ptag, Tag, Rating } from '../components';
import { withLayout } from '../layout';
import { MenuItem } from '../interfaces/menu.interface';



interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}

const Home = ({ menu, firstCategory }: HomeProps): JSX.Element => {
  const [rating, setRating] = useState(4);

  return (
    <>
      <Htag tag="h1">Home</Htag>
      <Button appearance="primary" arrow="right">Button</Button>
      <Button appearance="ghost" arrow="down">Button</Button>
      <Ptag size="m">Привет</Ptag>
      <Tag size="m" color="primary" href="/">123123</Tag>
      <Tag size="m" color="ghost" href="/">123123</Tag>
      <Tag size="m" color="red" href="/">123123</Tag>
      <Tag size="m" color="green" href="/">123123</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
    </>
  );
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/find', {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};