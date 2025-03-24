// components/theme/ThemeSelectorMenu.tsx

import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { ALL_BRAND_THEMES } from "@/theme";
import {
  FaBaseballBall,
  FaHockeyPuck,
  FaFire,
  FaTint,
  FaBolt,
} from "react-icons/fa";

/**
 * ThemeSelectorMenuProps:
 * ----------------------------------------------------------------------------
 * - themeIndex: The currently selected index in ALL_BRAND_THEMES.
 * - setThemeIndex: A function to change the active theme index.
 */
interface ThemeSelectorMenuProps {
  themeIndex: number;
  setThemeIndex: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * getThemeIcon:
 * ----------------------------------------------------------------------------
 * Returns a React Icon based on the brand name (Pokémon Red/Blue/Yellow,
 * Baseball, Hockey, etc.). Adjust or expand as your brand list grows.
 */
function getThemeIcon(brandName: string) {
  if (brandName.includes("Red")) return FaFire; // Pokémon Red
  if (brandName.includes("Blue")) return FaTint; // Pokémon Blue
  if (brandName.includes("Yellow")) return FaBolt; // Pokémon Yellow
  if (brandName.includes("Baseball")) return FaBaseballBall;
  if (brandName.includes("Hockey")) return FaHockeyPuck;
  return FaFire; // fallback icon
}

/**
 * ThemeSelectorMenu:
 * ----------------------------------------------------------------------------
 * 1) Displays an icon-only <MenuButton> sized ~3rem, using colorScheme="brand"
 *    so the button matches the active theme's brand color.
 * 2) Renders a <MenuList> of all brand themes. Each <MenuItem> sets the
 *    themeIndex to switch themes on click, while also showing an icon and label.
 *
 * This design avoids the nesting of <button> tags. <MenuItem> is itself a
 * button, so we don't place any other <Button> inside it—preventing hydration errors.
 */
export function ThemeSelectorMenu({
  themeIndex,
  setThemeIndex,
}: ThemeSelectorMenuProps) {
  // Determine the current theme's display name & icon
  const currentThemeName = ALL_BRAND_THEMES[themeIndex].name;
  const currentThemeIcon = getThemeIcon(currentThemeName);

  return (
    <Menu>
      {/**
       * MenuButton:
       *  - An IconButton that shows only the current theme's icon (no text).
       *  - colorScheme="brand" ensures it uses the active theme's brand palette.
       */}
      <MenuButton
        as={IconButton}
        aria-label="Select Theme"
        icon={<Icon as={currentThemeIcon} boxSize="1.4em" />}
        colorScheme="brand"
        variant="solid"
        borderRadius="full"
        height="3rem"
        width="3rem"
      />

      {/**
       * MenuList:
       *  - For each brand theme, we create a <MenuItem> with an icon and label.
       *  - Clicking a menu item calls setThemeIndex(...) to switch themes.
       *  - No nested <Button>, so there's no invalid <button> nesting.
       */}
      <MenuList>
        {ALL_BRAND_THEMES.map((themeObj, idx) => {
          const IconComp = getThemeIcon(themeObj.name);
          return (
            <MenuItem
              key={themeObj.name}
              onClick={() => setThemeIndex(idx)}
              icon={<Icon as={IconComp} />}
            >
              {themeObj.name}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
