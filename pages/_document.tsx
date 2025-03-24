// pages/_document.tsx

import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document:
 * ----------------------------------------------------------------------------
 * Overrides Next.js's default <Document> to insert global tags:
 *   - Preconnect to Google Fonts
 *   - Link to multiple fonts (Press Start 2P, Roboto, plus new baseball/hockey fonts)
 *   - Provide a standardized <Html> / <Head> / <body> structure
 *
 * This ensures your brand themes (Pokémon, Baseball, Hockey) have access to
 * the relevant fonts, so you can override them in your brand theme files
 * if you wish to replace the default "Press Start 2P" or "Roboto."
 */
export default function Document() {
  return (
    <Html>
      <Head>
        {/**
         * Preconnect for faster Google Fonts loading
         * (Helps performance by establishing early connection to fonts.gstatic.com)
         */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/**
         * Load multiple fonts:
         *  1) Press Start 2P & Roboto (existing)
         *  2) "Bungee" (fun, bold style suitable for Baseball theme)
         *  3) "Anton" (a strong condensed font that can fit a Hockey vibe)
         *
         * You can add or remove families as you see fit.
         */}
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto:wght@400;700&family=Bungee&family=Anton&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        {/* 
          The Main component is where Next.js renders your pages.
          NextScript contains the scripts needed for client-side interactivity.
        */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
