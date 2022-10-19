export { reportWebVitals } from 'next-axiom';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics, Layout } from '@/components';

const App = ({ Component, pageProps }: AppProps) => {
  return <Layout>
    <Analytics />
    <Component {...pageProps} />
  </Layout>;
};

export default App;
