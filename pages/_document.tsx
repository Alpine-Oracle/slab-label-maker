// pages/_document.tsx

import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document:
 * ----------------
 * Used to override the default Next.js Document.
 * Here, we can load Google Fonts (Press Start 2P & Roboto)
 * to ensure they're available globally.
 */
export default function Document() {
  return (
    <Html>
      <Head>
        {/* Preconnect for faster Google Fonts loading */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        {/*
          Loading both "Press Start 2P" and "Roboto" from Google Fonts.
          The site uses Press Start 2P for headings / body (by default),
          while labels forcibly use Roboto.
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        {/* 
          <Main /> is where Next.js renders the app pages.
          <NextScript /> loads the Next.js scripts required for client-side behavior.
        */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
