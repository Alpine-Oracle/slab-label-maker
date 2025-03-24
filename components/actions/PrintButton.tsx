/**
 * PrintButton.tsx
 * ----------------
 * Simple button that invokes the browser's print dialog.
 * The user can print physically or "Save as PDF" from that dialog.
 */

import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

/**
 * PrintButtonProps
 * Extends Chakra's ButtonProps, so we can pass variant, size, etc.
 */
export interface PrintButtonProps extends ButtonProps {}

/**
 * PrintButton
 * Renders a button that calls window.print() on click.
 * This triggers the standard print dialog, referencing
 * the .paper-mock layout for Slab Label Maker.
 */
export function PrintButton({ ...props }: PrintButtonProps) {
  /**
   * handlePrint
   * ----------
   * Opens the native browser print dialog,
   * letting the user choose a printer or "Save as PDF."
   */
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button onClick={handlePrint} {...props}>
      Print
    </Button>
  );
}
