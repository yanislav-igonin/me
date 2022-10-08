import type { NextPage } from 'next';
import Head from 'next/head';
import { Heading, Layout } from '@/components';
import Image from 'next/image';

const Home: NextPage = () => <div>
  <Head>
    <title>Yanislav Igonin</title>
  </Head>

  <Layout>
    <div className="mb-4 text-center">
      <Heading text="What's up guys?" />
    </div>

    <div className='w-60 h-60 md:w-72 md:h-72 relative animate-spin-slow'>
      <Image layout='fill' src="/eblo.webp" alt="site owner's face" />
    </div>
  </Layout>
</div>;

export default Home;
