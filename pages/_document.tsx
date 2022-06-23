import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="dark">
      <Head>
        <meta name="description" content="Yanislav Igonin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className="bg-gradient-to-r from-pink-200 via-emerald-200 to-sky-300 
        dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
