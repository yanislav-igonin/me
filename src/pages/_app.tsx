export { reportWebVitals } from 'next-axiom';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '@/components';
import Script from 'next/script';

const App = ({ Component, pageProps }: AppProps) => {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  return <Layout>
    <Script strategy='lazyOnload'
      src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
    <Script id='ga' strategy='lazyOnload' dangerouslySetInnerHTML={{
      __html: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', {
        page_path: window.location.pathname,
      });`
    }} />
    
    <Component {...pageProps} />
  </Layout>;
};

export default App;
