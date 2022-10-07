import { Header } from './Header';
import s from './Layout.module.css';

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) =>
  <div>
    <Header />

    <main className={`${s.layout} flex flex-col h-screen justify-center items-center`}>
      {/* Retrowave Landscape */}
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <div className={s.landscape}></div>
        </div>
      </div>npm

      {children}
    </main>
  </div>;
