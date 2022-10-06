import { Heading } from './Heading';
import { ExternalLink, GithubIcon } from './icons';
import { Paragraph } from './Paragraph';

type Props = {
  title: string;
  text: string;
  github: string;
  live: string;
}
export const ProjectCard = ({ title, text, github, live }: Props) =>
  <div className="border border-rose-300 mb-2 p-2 w-11/12 md:w-1/2 bg-white dark:bg-slate-500 rounded-md hover:scale-150 duration-100">
    <div className="w-full p-4">
      <div className='text-center'>
        <Heading text={title} />
        <Paragraph text={text} />
      </div>
      <div className='flex flex-row items-center justify-evenly w-full mt-6'>
        <a href={github} target="_blank" rel="noopener noreferrer">
          <GithubIcon />
        </a>
        <a href={live} target="_blank" rel="noopener noreferrer">
          <ExternalLink />
        </a>
      </div>
    </div>
  </div>;
