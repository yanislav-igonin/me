import Link from 'next/link';
import { DarkModeButton } from './DarkModeButton';
import { GithubIcon, LinkedInIcon } from './Icons';

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

type LinkProps = {
  href: string;
  name: string;
}

const HeaderLink = ({ name, href }: LinkProps) =>
  <li key={href} className="p-2">
    <Link href={href}>
      <a className="text-lg 
        dark:text-white
        font-bold
        hover:text-rose-500
        dark:hover:text-rose-500">{name}</a>
    </Link>
  </li>;

export const Header = () => <header className="w-screen fixed">
  <ul className="flex p-2 items-start flex-wrap">
    {pages.map((page) => <HeaderLink key={page.href} {...page} />)}
    <li className="p-2">
      <a href="https://github.com/yanislav-igonin/me" target="_blank" rel="noopener noreferrer">
        <GithubIcon />
      </a>
    </li>
    <li className="p-2">
      <a href="https://www.linkedin.com/in/yanislav-igonin" target="_blank" rel="noopener noreferrer">
        <LinkedInIcon />
      </a>
    </li>
    <li className="absolute right-0 pr-2">
      <DarkModeButton />
    </li>
  </ul>
</header>;
