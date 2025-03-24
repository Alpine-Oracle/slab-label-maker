/**
 * ExportDataButton.tsx
 * --------------------
 * Provides a button to export label data (and global border settings)
 * to a JSON file. The user can import this file elsewhere to replicate
 * their label setup.
 */

import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";

/**
 * ExportDataButtonProps
 * Extends Chakra's ButtonProps, so we can style or size this button.
 */
export interface ExportDataButtonProps extends ButtonProps {}

/**
 * ExportDataButton
 * Renders a button that, when clicked, generates a 'slab-labels.json' file
 * containing all label/border data from LabelContext, and prompts the user
 * to download it.
 */
export function ExportDataButton({ ...props }: ExportDataButtonProps) {
  const { labels, borderColor, borderSize } = useLabelContext();

  /**
   * handleExportData
   * ----------------
   * Converts the relevant context data to JSON, creates a Blob URL,
   * and triggers the browser to download that URL as 'slab-labels.json'.
   */
  const handleExportData = () => {
    const data = { labels, borderColor, borderSize };
    const json = JSON.stringify(data, null, 2);

    // Build a Blob for the JSON data
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = "slab-labels.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExportData} {...props}>
      Export Data
    </Button>
  );
}
