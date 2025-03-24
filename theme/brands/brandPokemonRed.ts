// theme/brandPokemonRed.ts

import { extendTheme } from "@chakra-ui/react";
import { baseTheme } from "../base";

/**
 * brandColors: Pokémon Red palette
 * ------------------------------------------
 * Partially scaled from 50-900, main accent at (500) = #CC0000 (Pokémon Red).
 */
const brandColors = {
  50: "#fff5f5",
  100: "#fed7d7",
  200: "#feb2b2",
  300: "#fc8181",
  400: "#f56565",
  500: "#CC0000", // Pokémon Red
  600: "#9b2c2c",
  700: "#742a2a",
  800: "#63171b",
  900: "#3c0d0f",
};

/**
 * brandPokemonRedTheme
 * ------------------------------------------
 * Extends our base theme with a Pokémon Red color palette.
 * Button "solid" variant is customized to have a brand.500 background,
 * turning deeper on hover/active.
 */
export const brandPokemonRedTheme = extendTheme(baseTheme, {
  colors: {
    brand: brandColors,
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
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
      },
    },
  },
});
