interface Props {
  text: string;
}

export const Heading = ({ text }: Props) =>
  <h1 className="text-4xl mb-4 dark:text-white font-extralight">{text}</h1>;
