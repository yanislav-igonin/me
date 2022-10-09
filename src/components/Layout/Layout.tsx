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

    <main className={'flex h-screen justify-center items-center'}>
      <div className={`${s.background} fixed -z-10 w-screen h-screen`}>
        <RetrowaveLandscape />
        <RetrowaveSun />
      </div>
      
      {children}
    </main>
  </div>;
