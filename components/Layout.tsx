import { Header } from './Header';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => <div className="bg-pattern bg-[length:30rem]">
  <Header />

  <main className="flex flex-col h-screen justify-center items-center">
    {children}
  </main>
</div>;
