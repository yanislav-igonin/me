interface Props {
  text: string;
}

export const Header = ({ text }: Props) =>
  <h1 className="text-3xl mb-4 dark:text-white">{text}</h1>;
