import Image from 'next/image';
import { Heading } from './Heading';
import { Paragraph } from './Paragraph';

interface Props {
  title: string;
  text: string;
  imgSrc: string;
}
export const ProjectCard = ({ title, text, imgSrc }: Props) =>
  <div className="flex flex-col md:flex-row m-2 w-11/12 md:w-1/2 shadow-md bg-gray-100 dark:bg-slate-500 rounded-md">
    <div className="w-full md:w-2/6 flex justify-center">
      <Image src={imgSrc} alt={title} width="200px" height="200px" />
    </div>
    <div className="w-full md:w-4/6 p-2 text-center md:text-left">
      <Heading text={title} />
      <Paragraph text={text} />
    </div>
  </div>;
