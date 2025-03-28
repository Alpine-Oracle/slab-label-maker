/**
 * ExportDataButton.tsx
 * ---------------------------------------------------------------------------
 * Provides a button to export all label data (including global border and
 * label dimensions) to a JSON file named "slab-labels.json".
 * That file can then be imported by the user on another device or session.
 */

import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";

/**
 * ExportDataButtonProps
 * ---------------------------------------------------------------------------
 * Extends Chakra's ButtonProps, so we can style or size this button
 * just like a normal Chakra button.
 */
export interface ExportDataButtonProps extends ButtonProps {}

/**
 * ExportDataButton
 * ---------------------------------------------------------------------------
 * 1) Renders a button labeled "Export Data."
 * 2) When clicked, gathers data from LabelContext (labels, border, label size).
 * 3) Produces a JSON blob and triggers the user to download it.
 */
export function ExportDataButton({ ...props }: ExportDataButtonProps) {
  // Destructure from LabelContext
  const {
    labels,
    borderColor,
    borderSize,
    labelWidthIn,
    labelHeightIn,
  } = useLabelContext();

  /**
   * handleExportData
   * -------------------------------------------------------------------------
   * Gathers context data into a JSON object, creates a Blob,
   * and triggers a file download in the browser.
   */
  const handleExportData = () => {
    // Prepare our export data object
    const data = {
      labels,
      borderColor,
      borderSize,
      labelWidthIn,
      labelHeightIn,
    };

    // Convert to JSON with two-space indentation for readability
    const json = JSON.stringify(data, null, 2);

    // Build a Blob for the JSON data
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a temporary invisible <a> link to trigger the browser download
    const link = document.createElement("a");
    link.href = url;
    link.download = "slab-labels.json"; // default filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object to avoid memory leaks
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExportData} {...props}>
      Export Data
    </Button>
  );
}
