import type { NextPage } from 'next';
import Head from 'next/head';
import { DarkModeButton, Card, Header, Paragraph, GithubIcon } from '@components';

const Home: NextPage = () => {
  return <div>
    <Head>
      <title>Yanislav Igonin</title>
    </Head>

    <div className="absolute top-0 right-0 p-2">
      <DarkModeButton />
    </div>

    <main className="flex h-screen justify-center items-center bg-gradient-to-tr from-emerald-400 to-fuchsia-400 dark:from-emerald-600 dark:to-fuchsia-600">
      <Card>
        <Header text="What's up? I'm Yan." />
        <Paragraph text="I'm a software engineer based in Israel. I'm currently working on a project called Next.js, which is a framework for building fast, responsive websites." />
        <div className='flex justify-center items-center mt-10'>
          <a href="https://github.com/yanislav-igonin/me" target="_blank" rel="noreferrer">
            <GithubIcon />
          </a>
        </div>
      </Card>
    </main>
  </div>;
};

export default Home;
