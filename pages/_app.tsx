// pages/_app.tsx

import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { LabelProvider } from "@/context/LabelContext";
import { Header } from "@/components/layout/Header";
import { ALL_BRAND_THEMES } from "@/theme";
import "@/styles/globals.css";

/**
 * MyApp (Next.js Custom App):
 * ----------------------------------------------------------------------------
 *  1) Force dark mode by setting 'chakra-ui-color-mode' to 'dark'.
 *  2) Track the user's chosen brand theme (themeIndex).
 *  3) Provide Chakra + Label contexts globally.
 */
function MyApp({ Component, pageProps }: AppProps) {
  const [themeIndex, setThemeIndex] = useState(0);

  // 1) Force color mode => "dark"
  useEffect(() => {
    // Overwrite user preference with 'dark' 
    window.localStorage.setItem("chakra-ui-color-mode", "dark");

    // Also load brand theme index from local storage
    const saved = window.localStorage.getItem("themeIndex");
    if (saved !== null) {
      setThemeIndex(parseInt(saved, 10));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("themeIndex", String(themeIndex));
  }, [themeIndex]);

  // 2) Determine brand theme
  const currentTheme = ALL_BRAND_THEMES[themeIndex].theme;

  // 3) ChakraProvider with forced dark color mode
  return (
    <ChakraProvider theme={currentTheme}>
      <LabelProvider>
        <div className="no-print">
          <Header themeIndex={themeIndex} setThemeIndex={setThemeIndex} />
        </div>
        <Component {...pageProps} />
      </LabelProvider>
    </ChakraProvider>
  );
}

export default MyApp;
