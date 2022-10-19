import Script from 'next/script';

export const Analytics = () => {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return <>
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
  </>;
};
