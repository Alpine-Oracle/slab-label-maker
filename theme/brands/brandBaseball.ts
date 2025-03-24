// theme/brandBaseball.ts

import { extendTheme } from "@chakra-ui/react";
import { baseTheme } from "../base";

const brandColors = {
  50: "#f9fafb",
  100: "#f0f0f0",
  200: "#e2e2e2",
  300: "#cccccc",
  400: "#999999",
  500: "#BA3A26", // Baseball seam red
  600: "#7a2417",
  700: "#5a1b11",
  800: "#3a110b",
  900: "#1a0704",
};

/**
 * Baseball theme, using "Bungee" font with slightly increased letterSpacing/lineHeight,
 * giving a bigger appearance without truly increasing font-size.
 */
export const brandBaseballTheme = extendTheme(baseTheme, {
  colors: {
    brand: brandColors,
  },

  fonts: {
    heading: "'Bungee', cursive",
    body: "'Bungee', cursive",
  },

  /**
   * Instead of increasing fontSize, we add a bit of letterSpacing & lineHeight
   * so text feels more open. This does not affect label text forcibly using "Roboto."
   */
  styles: {
    global: {
      "html, body": {
        // Keep the default ~14px base font size from baseTheme
        fontSize: "14px",
        // Slightly open up text horizontally
        letterSpacing: "0.5px",
        // Slightly taller lines
        lineHeight: "1.3",
      },
    },
  },

  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
      },
    },
  },
});
