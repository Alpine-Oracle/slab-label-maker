// pages/_app.tsx

import type { AppProps } from "next/app";
import React, { useState, useEffect, useRef } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { LabelProvider } from "@/context/LabelContext";
import { Header } from "@/components/layout/Header";
import { ALL_BRAND_THEMES } from "@/theme";
import "@/styles/globals.css";

/**
 * MyApp (Next.js Custom App):
 * ----------------------------------------------------------------------------
 *  1) Tracks the user's chosen themeIndex, loads/saves it in localStorage.
 *  2) Provides ChakraProvider + LabelProvider for the entire app.
 *  3) Wraps the Header in a .no-print container so it's hidden in print mode.
 */
function MyApp({ Component, pageProps }: AppProps) {
  // 1) Keep track of theme index
  const [themeIndex, setThemeIndex] = useState(0);

  // 2) Load theme from localStorage on mount
  useEffect(() => {
    const saved = window.localStorage.getItem("themeIndex");
    if (saved !== null) {
      setThemeIndex(parseInt(saved, 10));
    }
  }, []);

  // 3) Save theme to localStorage whenever it changes
  useEffect(() => {
    window.localStorage.setItem("themeIndex", String(themeIndex));
  }, [themeIndex]);

  // 4) Determine which brand theme to use
  const currentTheme = ALL_BRAND_THEMES[themeIndex].theme;


  return (
    <ChakraProvider theme={currentTheme}>
      <LabelProvider>
        {/* .no-print => hide the header in print mode */}
        <div className="no-print">
          <Header
            themeIndex={themeIndex}
            setThemeIndex={setThemeIndex}
          />
        </div>

        <Component {...pageProps} />
      </LabelProvider>
    </ChakraProvider>
  );
}

export default MyApp;
