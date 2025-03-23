// pages/_app.tsx

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { LabelProvider } from "@/context/LabelContext";
import { Header } from "@/components/layout/Header";
import "@/styles/globals.css";

/**
 * MyApp:
 * ----------------------------------------------------------------------------
 * The Next.js custom App component that wraps every page with:
 *   - ChakraProvider for styling/theme
 *   - LabelProvider for label data & border settings in local storage
 *
 * The Header is enclosed in a .no-print container so that
 * it won't appear in the printed output. Only the .paper-mock region
 * within LabelsArea is visible in print mode, preventing "double"
 * or duplicated pages.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      {/* 
        Provides global label state, including borderColor/size and 
        the label array in local storage.
      */}
      <LabelProvider>
        {/*
          The global site header (navigation bar) is wrapped with .no-print. 
          That ensures the header is fully hidden in print mode via 
          our globals.css rule:
          
            @media print {
              .no-print {
                display: none !important;
              }
            }
        */}
        <div className="no-print">
          <Header />
        </div>

        {/*
          The main page content is rendered here. 
          e.g. pages/index.tsx (HomePage) or any other Next.js page. 
        */}
        <Component {...pageProps} />
      </LabelProvider>
    </ChakraProvider>
  );
}

export default MyApp;
