import { Header } from '../Header';
import { RetrowaveSun } from './RetrowaveSun';
import s from './Layout.module.css';
import { RetrowaveLandscape } from './RetrowaveLandscape';
import Head from 'next/head';
import { Metatags } from './Metatags';

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) =>
  <div>
    <Head>
      <Metatags />
    </Head>

    <Header />

    <main className={'flex h-screen justify-center items-center'}>
      <div className={`${s.background} fixed -z-10 w-screen h-screen`}>
        <RetrowaveLandscape />
        <RetrowaveSun />
      </div>
      <div className='fixed w-screen h-screen top-0 -z-20
        bg-gradient-to-b from-rose-300 to-orange-200
        dark:bg-gradient-to-b dark:from-purple-900 dark:to-stone-800' />

      {children}
    </main>
  </div>;
