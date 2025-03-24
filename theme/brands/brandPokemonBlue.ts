// theme/brandPokemonBlue.ts

import { extendTheme } from "@chakra-ui/react";
import { baseTheme } from "../base";

/**
 * brandColors: Pokemon Blue-inspired palette
 * ------------------------------------------
 * Shades from light (50) to dark (900),
 * with a main accent at (500) = #3B4CCA (official Pokémon Blue).
 */
const brandColors = {
  50: "#ebf0ff",
  100: "#c2cbff",
  200: "#99a6ff",
  300: "#7080ff",
  400: "#475aff",
  500: "#3B4CCA", // Pokémon Blue
  600: "#2f3da2",
  700: "#232e7a",
  800: "#182052",
  900: "#0e1230",
};

/**
 * brandPokemonBlueTheme
 * ------------------------------------------
 * Extends our base theme with a Pokémon Blue color palette.
 * Also sets "brand" as the default colorScheme for Chakra buttons.
 * Inherits fonts/styling from baseTheme.
 */
export const brandPokemonBlueTheme = extendTheme(baseTheme, {
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
