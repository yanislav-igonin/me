import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="dark">
      <Head>
        <meta name="description" content="Yanislav Igonin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className="bg-gradient-to-r from-rose-200 to-orange-200
        dark:bg-gradient-to-r dark:from-emerald-700 dark:to-teal-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
