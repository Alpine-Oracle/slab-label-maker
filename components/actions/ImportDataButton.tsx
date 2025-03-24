/**
 * ImportDataButton.tsx
 * ---------------------
 * Provides a button that allows the user to select a .json file
 * previously exported by this app. Once selected, we parse it,
 * validate the structure, and replace/merge existing label data.
 */

import React, { useRef } from "react";
import { Button, ButtonProps, useToast } from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";

/**
 * ImportDataButtonProps
 * Extends Chakra's ButtonProps, letting you style or size the button.
 */
export interface ImportDataButtonProps extends ButtonProps {}

/**
 * ImportDataButton
 * Renders a button and hidden <input type="file" />, allowing the user
 * to select a JSON file containing label data. We parse and load
 * that data into the LabelContext.
 *
 * NOTE: By default, this overwrites existing labels (clearAll + re-adding).
 * Adjust that if you prefer merging instead of overwriting.
 */
export function ImportDataButton({ ...props }: ImportDataButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  // LabelContext consumer
  const { clearAll, addLabel, setBorderColor, setBorderSize } =
    useLabelContext();

  /**
   * handleImportClick
   * -----------------
   * Trigger the hidden file input's click to open a file picker.
   */
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * handleFileChange
   * ----------------
   * When a user selects a file, read its contents as text, parse it as JSON,
   * and load it into LabelContext (overwriting existing labels).
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate data structure
      if (data.labels && Array.isArray(data.labels)) {
        // Clear existing data or merge. Here we choose to clear:
        clearAll();

        // Re-add each label
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

      if (typeof data.borderColor === "string") {
        setBorderColor(data.borderColor);
      }
      if (typeof data.borderSize === "number") {
        setBorderSize(data.borderSize);
      }

      toast({
        title: "Import successful!",
        description: `Imported labels from ${file.name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error importing data:", error);
      toast({
        title: "Import failed",
        description: "Invalid JSON file or structure.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // Reset the file input so user can select again if desired
      e.target.value = "";
    }
  };

  return (
    <>
      <Button onClick={handleImportClick} {...props}>
        Import Data
      </Button>
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
