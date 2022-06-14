import type { NextPage } from 'next';
import Head from 'next/head';
import { DarkModeButton, Header, Paragraph, GithubIcon } from '@components';
import Image from 'next/image';

const Home: NextPage = () => {
  return <div>
    <Head>
      <title>Yanislav Igonin</title>
    </Head>

    <div className="absolute top-0 right-0 p-2">
      <DarkModeButton />
    </div>

    <main className="flex h-screen justify-center items-center dark:bg-slate-600">
      <div className='w-96 h-96 relative'>
        <Image layout='fill' src="/eblo.webp" alt="site owner's face" />
      </div>
    </main>
  </div>;
};

export default Home;
