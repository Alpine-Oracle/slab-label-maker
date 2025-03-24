// theme/base.ts

import { extendTheme, ThemeConfig, ThemeOverride } from "@chakra-ui/react";

/**
 * Base Chakra config that applies across all brand themes.
 * - initialColorMode: 'dark' => default to dark mode
 * - useSystemColorMode: false => do not auto-detect OS theme
 */
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

/**
 * Global font definitions.
 * You can easily switch or add new fonts here, and all brand themes will inherit.
 */
const fonts = {
  heading: `'Press Start 2P', sans-serif`,
  body: `'Press Start 2P', sans-serif`,
};

/**
 * Shared component overrides that most brand themes will inherit.
 * Each brand theme can override these again if needed.
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
    // We intentionally leave out "defaultProps.colorScheme" here
    // so each brand theme can supply its own "brand" color scheme.
    sizes: {
      md: {
        fontSize: "sm",
        px: 5,
        py: 3,
      },
    },

    /**
     * 1) Add or override variants here.
     *    We'll define a custom "outline" variant to
     *    ensure it matches our "brand" color by default.
     */
    variants: {
      /**
       * Our custom outline variant:
       * - Uses brand.500 for the border & text color.
       * - On hover, a subtle brand.50 background.
       * - On active, slightly deeper brand.100 background.
       */
      outline: {
        border: "2px solid",
        borderColor: "brand.500",
        color: "brand.500",
        _hover: {
          bg: "brand.50",
        },
        _active: {
          bg: "brand.100",
        },
      },
      // You can add more variants (e.g., "ghost", "solid", etc.) if desired.
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
            // Subtle glow effect on focus. The brand color
            // can be applied in each brand theme if desired.
            boxShadow: "0 0 0 1px",
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
 * Shared global styles (HTML/body, scrollbars, etc.)
 * These are "neutral" by default; brand themes can override them if desired.
 */
const styles: ThemeOverride["styles"] = {
  global: {
    // Base HTML/Body
    "html, body": {
      fontSize: "14px",
      backgroundColor: "gray.50",
      color: "gray.900",
      margin: 0,
      padding: 0,
      lineHeight: "1.4",
    },
    // Scrollbar theming
    "::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "gray.50",
    },
    "::-webkit-scrollbar-thumb": {
      background: "gray.300",
      borderRadius: "4px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "gray.400",
    },
    scrollbarWidth: "thin",
    scrollbarColor: "gray.300 gray.50",
  },
};

/**
 * Export the "base" theme so brand themes can extend it.
 * This keeps your code DRY and consistent across variants.
 */
export const baseTheme = extendTheme({
  config,
  fonts,
  components,
  styles,
});
