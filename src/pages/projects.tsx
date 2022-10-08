import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout, ProjectCard } from '@/components';

const project = [{
  title: 'Micrach',
  text: 'Single board imageboard',
  github: 'https://github.com/yanislav-igonin/micrach',
  live: 'https://micrach.igonin.dev/',
}, {
  title: 'Face Fucker Bot',
  text: 'Telegram bot that uses LQR to fuck up images',
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
