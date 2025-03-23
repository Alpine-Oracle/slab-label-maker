// theme/index.ts

import { extendTheme, ThemeConfig, ThemeOverride } from "@chakra-ui/react";

/**
 * 1. Chakra Config:
 *    - initialColorMode: 'light'  => Start the site in light mode
 *    - useSystemColorMode: false => Don't auto-detect OS setting
 */
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

/**
 * 2. Brand Colors:
 *    - A fun Pokémon-like palette for your site,
 *      including a bold 'brand' yellow (#FFCB05) reminiscent of Pokémon branding.
 */
const colors = {
  brand: {
    50: "#FFFDF0",
    100: "#FFF3C4",
    200: "#FFE999",
    300: "#FFDF6D",
    400: "#FFD342",
    500: "#FFCB05", // Pokémon Yellow
    600: "#E0AF00",
    700: "#B58900",
    800: "#8C6600",
    900: "#664400",
  },
  red: {
    500: "#CC0000", // Charizard red
  },
  blue: {
    500: "#3B4CCA", // Pokémon Blue
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
};

/**
 * 3. Site Fonts:
 *    - "Press Start 2P" for headings & body => Retro gaming style
 *    - We specifically override label text to Roboto in PSALikeLabel
 */
const fonts = {
  heading: `'Press Start 2P', sans-serif`,
  body: `'Press Start 2P', sans-serif`,
};

/**
 * 4. Global Styles:
 *    - We scale Press Start 2P down to 14px or smaller so it isn't too large.
 *    - Also set background color, text color, and custom scrollbar styling.
 */
const styles: ThemeOverride["styles"] = {
  global: {
    // Decrease default site text
    "html, body": {
      fontSize: "14px",
      backgroundColor: "gray.50",
      color: "gray.900",
      margin: 0,
      padding: 0,
      lineHeight: "1.4",
    },
    // Optional: Scrollbar theming
    "::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "brand.50",
    },
    "::-webkit-scrollbar-thumb": {
      background: "brand.400",
      borderRadius: "4px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "brand.600",
    },
    scrollbarWidth: "thin",
    scrollbarColor: "brand.400 brand.50",
  },
};

/**
 * 5. Component Overrides:
 *    - Here we tweak default Chakra components,
 *      e.g. Button, Input, FormLabel, etc.
 *    - Setting brand color schemes, new sizes, or custom states.
 */
const components: ThemeOverride["components"] = {
  Button: {
    baseStyle: {
      fontWeight: "bold",
      textTransform: "uppercase",
      borderRadius: "lg",
      letterSpacing: "wide",
      shadow: "md",
    },
    defaultProps: {
      colorScheme: "brand", // default brand color scheme
    },
    variants: {
      solid: {
        bg: "brand.500",
        color: "white",
        _hover: {
          bg: "brand.600",
          boxShadow: "lg",
        },
        _active: {
          bg: "brand.700",
        },
      },
      outline: {
        borderColor: "brand.500",
        color: "brand.600",
        _hover: {
          bg: "brand.50",
        },
        _active: {
          bg: "brand.100",
        },
      },
      ghost: {
        color: "brand.600",
        _hover: {
          bg: "brand.50",
        },
        _active: {
          bg: "brand.100",
        },
      },
    },
    sizes: {
      md: {
        fontSize: "sm",
        px: 5,
        py: 3,
      },
    },
  },

  Input: {
    variants: {
      filled: {
        field: {
          bg: "gray.100",
          _hover: { bg: "gray.200" },
          _focus: {
            bg: "white",
            borderColor: "brand.500",
            // Subtle glow effect on focus
            boxShadow: "0 0 0 1px #FFCB05",
          },
          _placeholder: { color: "gray.500" },
        },
      },
    },
    defaultProps: {
      variant: "filled",
      focusBorderColor: "brand.500",
    },
  },

  FormLabel: {
    baseStyle: {
      fontWeight: "semibold",
      color: "gray.700",
      fontSize: "sm",
      mb: 1,
    },
  },

  Badge: {
    baseStyle: {
      borderRadius: "full",
      px: 2,
      py: 1,
      fontSize: "xs",
      textTransform: "uppercase",
      letterSpacing: "wider",
      fontWeight: "bold",
    },
  },

  Card: {
    baseStyle: {
      borderRadius: "xl",
      shadow: "md",
      bg: "white",
      p: 4,
    },
  },
};

/**
 * 6. Export the final theme:
 *    Combine config, colors, fonts, styles, and component overrides
 *    into a single extended theme for Chakra.
 */
const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
  components,
});

export default theme;
