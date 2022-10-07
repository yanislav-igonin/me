import { Header } from '../Header';
import { RetrowaveSun } from './RetrowaveSun';
import s from './Layout.module.css';
import { RetrowaveLandscape } from './RetrowaveLandscape';

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) =>
  <div>
    <Header />

    <main className={`${s.layout} flex flex-col h-screen justify-center items-center`}>
      <div className='-z-10 fixed'>
        <RetrowaveLandscape />
      </div>
      <div className='-z-10'>
        <RetrowaveSun />
      </div>
      {children}
    </main>
  </div>;
