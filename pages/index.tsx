import Head from 'next/head'
import { Button, Htag, Ptag, Tag } from '../components';

export default function Home() {
  return (
    <>
      <Head>
        <title>MyTop - наш лучший топ</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Htag tag='h1'>Home</Htag>
        <Button appearance='primary' arrow='right'>Button</Button>
        <Button appearance='ghost' arrow='down'>Button</Button>
        <Ptag size='m'>Привет</Ptag>
        <Tag size='m' color='primary' href='/'>123123</Tag>
        <Tag size='m' color='ghost' href='/'>123123</Tag>
        <Tag size='m' color='red' href='/'>123123</Tag>
        <Tag size='m' color='green' href='/'>123123</Tag>
      </div>
    </>
  )
}
