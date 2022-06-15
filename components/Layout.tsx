import { Header } from './Header';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => <>
  <Header />
  
  <main className="flex flex-col h-screen justify-center items-center dark:bg-slate-600">
    {children}
  </main>
</>;
