import type { NextPage } from 'next';
import Head from 'next/head';
import { DarkModeButton, MainCard } from '@components';

const Home: NextPage = () => {
  return <div>
    <Head>
      <title>NextJS Template</title>
    </Head>

    <div className="absolute top-0 right-0 p-2">
      <DarkModeButton />
    </div>

    <main className="flex h-screen justify-center items-center bg-gradient-to-tr from-emerald-400 to-fuchsia-400 dark:from-emerald-600 dark:to-fuchsia-600">
      <MainCard />
    </main>
  </div>;
};

export default Home;
