// theme/index.ts

import { brandPokemonRedTheme } from "./brands/brandPokemonRed";
import { brandPokemonBlueTheme } from "./brands/brandPokemonBlue";
import { brandPokemonYellowTheme } from "./brands/brandPokemonYellow";
import { brandBaseballTheme } from "./brands/brandBaseball";
import { brandHockeyTheme } from "./brands/brandHockey";

/**
 * Each theme has a display name plus the actual Chakra theme object.
 * This makes it easy to map over them in a dropdown or toggle system.
 */
export const ALL_BRAND_THEMES = [
  { name: "Pokémon Red", theme: brandPokemonRedTheme },
  { name: "Pokémon Blue", theme: brandPokemonBlueTheme },
  { name: "Pokémon Yellow", theme: brandPokemonYellowTheme },
  { name: "Baseball", theme: brandBaseballTheme },
  { name: "Hockey", theme: brandHockeyTheme },
];

/**
 * Optionally, export them individually if you prefer:
 */
export {
  brandPokemonRedTheme,
  brandPokemonBlueTheme,
  brandPokemonYellowTheme,
  brandBaseballTheme,
  brandHockeyTheme,
};
