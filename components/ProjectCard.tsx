import Image from 'next/image';
import { Heading } from './Heading';
import { Paragraph } from './Paragraph';

type Props = {
  title: string;
  text: string;
}
export const ProjectCard = ({ title, text }: Props) =>
  <div className="flex flex-col mb-2 p-2 w-11/12 md:w-1/2 shadow-md 80 bg-white dark:bg-slate-500 rounded-md">
    <div className="w-full p-2 text-center md:text-left">
      <div className='text-center'>
        <Heading text={title} />
        <Paragraph text={text} />
      </div>
      <div className="text-justify">
      </div>
    </div>
  </div>;
