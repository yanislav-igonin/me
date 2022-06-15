import Link from 'next/link';
import { DarkModeButton } from './DarkModeButton';
import { GithubIcon } from './GithubIcon';

const pages: LinkProps[] = [{
  name: 'Home',
  href: '/'
}, {
  name: 'About',
  href: '/about'
}, {
  name: 'Projects',
  href: '/projects'
}];

interface LinkProps {
  href: string;
  name: string;
}

const HeaderLink = ({ name, href }: LinkProps) =>
  <li key={href} className="p-2">
    <Link href={href}>
      <a className="dark:text-white">{name}</a>
    </Link>
  </li>;

export const Header = () => <header className="absolute w-screen">
  <ul className="flex p-2">
    {pages.map((page) => <HeaderLink key={page.href} {...page} />)}
    <li className="p-2">
      <a href="https://github.com/yanislav-igonin/me" target="_blank" rel="noopener noreferrer">
        <GithubIcon />
      </a>
    </li>
    <li className="absolute right-0 pr-2">
      <DarkModeButton />
    </li>
  </ul>
</header>;
