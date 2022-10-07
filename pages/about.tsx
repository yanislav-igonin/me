import type { NextPage } from 'next';
import Head from 'next/head';
import { Heading, Layout } from '@components';
import Image from 'next/image';

const About: NextPage = () => <div>
  <Head>
    <title>Yanislav Igonin</title>
  </Head>

  <Layout>
    <div className="mb-4 text-center">
      <Heading text="About? How about NO?" />
    </div>

    <div className='w-60 h-60 md:w-72 md:h-72 relative animate-spin-slow'>
      <Image layout='fill' src="/ok.png" alt="site owner's face" />
    </div>
  </Layout>
</div>;

export default About;
