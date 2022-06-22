import { Header } from './Header';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => <div className="dark:bg-slate-600">
  <Header />
  
  <main className="flex flex-col h-screen justify-center items-center">
    {children}
  </main>
</div>;
