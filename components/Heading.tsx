type Props = {
  text: string;
}

export const Heading = ({ text }: Props) =>
  <h1 className="text-4xl mb-4 dark:text-white font-bold drop-shadow-lg shadow-gray-600">{text}</h1>;
