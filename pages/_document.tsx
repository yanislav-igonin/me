import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="dark">
      <Head>
        <meta name="description" content="Yanislav Igonin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className="bg-gradient-to-b from-rose-300 to-orange-200
        dark:bg-gradient-to-b dark:from-purple-900 dark:to-stone-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
