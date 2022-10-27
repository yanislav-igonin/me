import type { NextPage } from 'next';
import Head from 'next/head';
import { Heading } from '@/components';
import Image from 'next/image';

const Home: NextPage = () => <>
  <Head>
    <title>Yanislav Igonin</title>
  </Head>

  <div className='flex flex-col h-screen justify-center items-center'>
    <div className="mb-4 text-center">
      <Heading text="What's up guys?" />
    </div>

    <div className='w-60 h-60 md:w-72 md:h-72 relative animate-spin-slow'>
      <Image fill src="/eblo.webp" alt="site owner's face" />
    </div>
  </div>
</>;

export default Home;
