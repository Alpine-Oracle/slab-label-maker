/**
 * ImportDataButton.tsx
 * ---------------------------------------------------------------------------
 * Provides a button that allows the user to select a .json file
 * previously exported by this app. Once selected, we parse it,
 * validate the structure, and replace/merge existing label data
 * in LabelContext.
 */

import React, { useRef } from "react";
import { Button, ButtonProps, useToast } from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";

/**
 * ImportDataButtonProps
 * ---------------------------------------------------------------------------
 * Extends Chakra's ButtonProps, allowing you to style/size
 * the button just like a normal Chakra button.
 */
export interface ImportDataButtonProps extends ButtonProps {}

/**
 * ImportDataButton
 * ---------------------------------------------------------------------------
 * 1) Renders a visible button labeled "Import Data."
 * 2) Renders a hidden <input type="file" /> (accepting .json files only).
 * 3) When the button is clicked, we programmatically click the hidden input.
 * 4) On file selection, we parse the file and update LabelContext with
 *    the new data (labels, border settings, label size, etc.).
 */
export function ImportDataButton({ ...props }: ImportDataButtonProps) {
  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Chakra toast for user feedback (success/fail messages)
  const toast = useToast();

  // Destructure relevant methods from LabelContext
  const {
    clearAll,
    addLabel,
    setBorderColor,
    setBorderSize,
    setLabelWidthIn,
    setLabelHeightIn,
  } = useLabelContext();

  /**
   * handleImportClick
   * -------------------------------------------------------------------------
   * Triggered when the user clicks the "Import Data" button;
   * forces a click on the hidden file input to open the file picker dialog.
   */
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * handleFileChange
   * -------------------------------------------------------------------------
   * Called whenever the file input's value changes (i.e., user selects a file).
   * Reads the file as text, parses JSON, and updates LabelContext accordingly.
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return; // No file => do nothing

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // We first check for .labels array in the JSON
      if (data.labels && Array.isArray(data.labels)) {
        // Clear existing data. If you prefer merging, remove "clearAll()".
        clearAll();

        // Re-add each label from the file
        data.labels.forEach((lbl: any) => {
          addLabel({
            yearSetLine: lbl.yearSetLine || "",
            playerLine: lbl.playerLine || "",
            variationLine: lbl.variationLine || "",
            cardNumber: lbl.cardNumber || "",
            gradeTerm: lbl.gradeTerm || "",
            gradeNumber: lbl.gradeNumber || "",
          });
        });
      }

      // Update border color/size if present
      if (typeof data.borderColor === "string") {
        setBorderColor(data.borderColor);
      }
      if (typeof data.borderSize === "number") {
        setBorderSize(data.borderSize);
      }

      // Update label width/height if present
      if (typeof data.labelWidthIn === "number") {
        setLabelWidthIn(data.labelWidthIn);
      }
      if (typeof data.labelHeightIn === "number") {
        setLabelHeightIn(data.labelHeightIn);
      }

      // If everything parsed successfully, show a success toast
      toast({
        title: "Import successful!",
        description: `Imported labels from ${file.name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // If JSON parsing or data structure fails, show an error toast
      console.error("Error importing data:", error);
      toast({
        title: "Import failed",
        description: "Invalid JSON file or structure.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // Reset the file input so user can re-select the same file if needed
      e.target.value = "";
    }
  };

  return (
    <>
      {/* Visible Button: triggers file input on click */}
      <Button onClick={handleImportClick} {...props}>
        Import Data
      </Button>

      {/* Hidden file input for .json */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
}
