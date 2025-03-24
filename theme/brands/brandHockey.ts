// theme/brandHockey.ts

import { extendTheme } from "@chakra-ui/react";
import { baseTheme } from "../base";

/**
 * A dark navy/black palette for an NHL-like hockey theme,
 * using "Anton" as a bold, condensed sports font.
 */
const brandColors = {
  50: "#f7f9fc",
  100: "#eef2f9",
  200: "#d3d7e0",
  300: "#b8bbcf",
  400: "#8b90af",
  500: "#0B1736", // Dark navy
  600: "#0a1236",
  700: "#080e2a",
  800: "#06091d",
  900: "#03040f",
};

export const brandHockeyTheme = extendTheme(baseTheme, {
  colors: {
    brand: brandColors,
  },

  fonts: {
    heading: "'Anton', sans-serif",
    body: "'Anton', sans-serif",
  },

  /**
   * Provide more horizontal and vertical spacing:
   * - letterSpacing helps "Anton" not feel too squished
   * - lineHeight improves readability
   */
  styles: {
    global: {
      "html, body": {
        fontSize: "14px",
        letterSpacing: "0.9px",
        lineHeight: "1.25",
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
