type Props = {
  text: string;
}

export const Paragraph = ({ text }: Props) =>
  <p className="text-lg mb-2 dark:text-white">{text}</p>;
