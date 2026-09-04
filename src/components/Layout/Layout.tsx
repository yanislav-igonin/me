import { Header } from '../Header';
import Head from 'next/head';
import { Metatags } from './Metatags';
import { SynthwaveBackground } from './SynthwaveBackground';

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) =>
  <div>
    <Head>
      <Metatags />
    </Head>

    <Header />

    <main className={'flex h-screen justify-center items-center'}>
      <SynthwaveBackground />

      {children}
    </main>
  </div>;
