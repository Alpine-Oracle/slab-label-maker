// components/layout/Header.tsx

import React from "react";
import {
  Flex,
  Heading,
  Button,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { PrintButton } from "@/components/actions/PrintButton";
import { ExportDataButton } from "@/components/actions/ExportDataButton";
import { ImportDataButton } from "@/components/actions/ImportDataButton";
import { ThemeSelectorMenu } from "@/theme/ThemeSelector";

/**
 * HeaderProps
 * ----------------------------------------------------------------------------
 * - themeIndex: current index in ALL_BRAND_THEMES
 * - setThemeIndex: function to change the theme
 */
interface HeaderProps {
  themeIndex: number;
  setThemeIndex: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Header
 * ----------------------------------------------------------------------------
 * Displays a top bar with:
 *   - Title: "Slab Label Maker"
 *   - Print / Export / Import actions
 *   - ThemeSelector for brand theme changes
 *
 * MOBILE:
 *   - Collapses actions into a Menu, anchored at bottom-right of the “Actions” button.
 *   - Uses strategy="fixed" to prevent horizontal shifting.
 *
 * DESKTOP:
 *   - Lays out action buttons and theme menu inline on the right side.
 */
export function Header({ themeIndex, setThemeIndex }: HeaderProps) {
  // Determine mobile vs. desktop layout
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Example stubs for menu item handlers
  const handlePrintMobile = () => window.print();
  const handleExportMobile = () => console.log("Export Data");
  const handleImportMobile = () => console.log("Import Data");

  // ------------------
  // 1) MOBILE LAYOUT
  // ------------------
  if (isMobile) {
    return (
      <Flex
        h="4rem"
        bg="brand.600"
        color="white"
        align="center"
        px={4}
        boxShadow="md"
        position="sticky"
        top="0"
        zIndex="10"
      >
        <Heading size="md">Slab Label Maker</Heading>
        {/* Push the menu button to the right */}
        <Box flex="1" />

        <Menu
          // Renders the dropdown as a fixed overlay,
          // preventing the page from shifting horizontally
          strategy="fixed"
          placement="bottom-end"
          offset={[0, 6]}
        >
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Actions
          </MenuButton>

          <MenuList>
            {/* 
              Each <MenuItem> is a button, so we use onClick instead 
              of nesting <Button> to avoid nested <button> hydration errors.
            */}
            <MenuItem onClick={handlePrintMobile}>Print</MenuItem>
            <MenuItem onClick={handleExportMobile}>Export Data</MenuItem>
            <MenuItem onClick={handleImportMobile}>Import Data</MenuItem>

            {/* 
              Theme selection goes here; we use <MenuItem as="div">
              if it's interactive (to avoid nested button issues).
            */}
            <MenuItem closeOnSelect={false} as="div">
              <Box py={2}>
                <ThemeSelectorMenu
                  themeIndex={themeIndex}
                  setThemeIndex={setThemeIndex}
                />
              </Box>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  }

  // -------------------
  // 2) DESKTOP LAYOUT
  // -------------------
  return (
    <Flex
      h="4rem"
      bg="brand.600"
      color="white"
      align="center"
      justify="space-between"
      px={4}
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Heading size="md">Slab Label Maker</Heading>

      {/* Right-side actions + theme, spaced with gap={2} */}
      <Flex align="center" gap={2}>
        <PrintButton variant="solid" />
        <ExportDataButton variant="solid" />
        <ImportDataButton variant="solid" />
        <ThemeSelectorMenu
          themeIndex={themeIndex}
          setThemeIndex={setThemeIndex}
        />
      </Flex>
    </Flex>
  );
}
