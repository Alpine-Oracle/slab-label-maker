// theme/brandPokemonYellow.ts

import { extendTheme } from "@chakra-ui/react";
import { baseTheme } from "../base";

/**
 * brandColors: Pokémon Yellow palette
 * ------------------------------------------
 * Main accent at (500) = #FFCB05 (Pokémon Yellow).
 * Ranges from light 50 to dark 900.
 */
const brandColors = {
  50: "#fffdf0",
  100: "#fff3c4",
  200: "#ffe999",
  300: "#ffdf6d",
  400: "#ffd342",
  500: "#FFCB05", // Pokémon Yellow
  600: "#e0af00",
  700: "#b58900",
  800: "#8c6600",
  900: "#664400",
};

/**
 * brandPokemonYellowTheme
 * ------------------------------------------
 * Extends our base theme with a Pokémon Yellow color palette.
 * Keeps defaultProps colorScheme="brand" for Button.
 */
export const brandPokemonYellowTheme = extendTheme(baseTheme, {
  colors: {
    brand: brandColors,
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
      },
    },
  },
});
