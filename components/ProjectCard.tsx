import Image from 'next/image';
import { Heading } from './Heading';
import { Paragraph } from './Paragraph';

interface Props {
  title: string;
  text: string;
  imgSrc: string;
}
export const ProjectCard = ({ title, text, imgSrc }: Props) =>
  <div className="flex flex-col m-2 md:flex-row w-80 shadow-md bg-gray-100 dark:bg-slate-500 rounded-md">
    <div className="md:w-full">
      <Image src={imgSrc} alt={title} width="200px" height="200px" />
    </div>
    <div className="">
      <Heading text={title} />
      <Paragraph text={text} />
    </div>
  </div>;
