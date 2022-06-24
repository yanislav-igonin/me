import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout, ProjectCard } from '@components';

const project = [{
  title: 'Micrach',
  text: 'A microblogging platform for the web.',
  imgSrc: '/ok.png',
  github: 'https://github.com/yanislav-igonin/micrach',
  live: 'https://micrach.igonin.dev/',
}, {
  title: 'Face Fucker Bot',
  text: 'Bot for Telegram that users LQR to shakalize images.',
  imgSrc: '/ok.png',
  github: 'https://github.com/yanislav-igonin/face-fucker-bot',
  live: 'https://t.me/face_fucker_bot',
}];

const Projects: NextPage = () => <div>
  <Head>
    <title>Yanislav Igonin</title>
  </Head>

  <Layout>
    {project.map((p) => <ProjectCard key={p.title} {...p} />)}
  </Layout>
</div>;

export default Projects;
