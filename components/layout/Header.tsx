// components/Header.tsx

import React from "react";
import { Flex, Heading, Spacer, Button } from "@chakra-ui/react";

/**
 * Header
 * -------------
 * A simple top bar with a "Print" button.
 * This entire nav is typically tagged as `.no-print` (in the parent),
 * so it remains hidden during printing.
 * The user can click the Print button to call window.print().
 */
export function Header() {
  // Trigger the browser's print dialog
  const handlePrint = () => {
    window.print();
  };

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
      // Tag or className="no-print" could be added here if you want to hide it in print
    >
      <Heading size="md">Slab Label Maker</Heading>
      <Spacer />

      {/* Clicking this will open the print dialog.
         The .paper-mock region is pinned in print, so only that is shown. */}
      <Button variant="solid" onClick={handlePrint}>
        Print
      </Button>
    </Flex>
  );
}
