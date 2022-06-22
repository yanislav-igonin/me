import type { NextPage } from 'next';
import Head from 'next/head';
import { Heading, Layout, ProjectCard } from '@components';
import Image from 'next/image';

const project = [{
  title: 'Micrach',
  text: 'A microblogging platform for the web.',
  imgSrc: '/ok.png',
}, {
  title: 'Face Fucker Bot',
  text: 'Bot for Telegram that users LQR to shakalize images.',
  imgSrc: '/ok.png'
}];

const Projects: NextPage = () => <div>
  <Head>
    <title>Yanislav Igonin</title>
  </Head>

  <Layout>
    {/* <div className="mb-4">
      <Heading text="Projects? How about NO?" />
    </div>

    <div className='w-60 h-60 md:w-96 md:h-96 relative animate-spin-slow'>
      <Image layout='fill' src="/ok.png" alt="site owner's face" />
    </div> */}
    {project.map((p) => <ProjectCard key={p.title} {...p} />)}
  </Layout>
</div>;

export default Projects;
