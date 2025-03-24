// pages/index.tsx

import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";
import { FormPanel } from "@/components/forms/FormPanel";
import { LabelsArea } from "@/components/labels/LabelsArea";

/**
 * HomePage
 * ----------------------------------------------------------------------------
 * A standard layout for the Slab Label Maker:
 *  - On mobile (base breakpoint):
 *      * FormPanel appears at the top,
 *      * LabelsArea below (scrollable if needed).
 *  - On desktop (md+ breakpoint):
 *      * FormPanel on the left (400px wide),
 *      * LabelsArea on the right filling remaining space.
 *
 * The "no-print" class ensures the form is hidden in print mode,
 * so only the .paper-mock region (LabelsArea) is visible on paper/PDF.
 */
export default function HomePage() {
  const { labels, removeLabel } = useLabelContext();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  /**
   * handleDelete
   * ------------
   * Removes a label at the given index; if it was being edited, reset editing state.
   */
  const handleDelete = (index: number) => {
    removeLabel(index);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  /**
   * handleEdit
   * ----------
   * Activates editing mode for the label at the given index.
   */
  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  return (
    <Flex
      flexDirection={{ base: "column", md: "row" }}
      width="100vw"
      height={{ base: "auto", md: "calc(100vh - 4rem)" }}
      overflow={{ base: "visible", md: "hidden" }}
    >
      {/* 
        Left side (desktop) or top (mobile):
        The .no-print class hides the FormPanel in print mode.
      */}
      <Box
        className="no-print"
        width={{ base: "100%", md: "400px" }}
        height={{ base: "calc(100vh - 4rem)", md: "100%" }}
        overflowY="auto"
      >
        <FormPanel
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
        />
      </Box>

      {/* 
        Right side (desktop) or below (mobile):
        A Box that contains the 8.5"x11" LabelsArea.
      */}
      <Box
        flex={{ base: "none", md: "1" }}
        width={{ base: "100%", md: "auto" }}
        height={{ base: "auto", md: "100%" }}
        overflow={{ base: "auto", md: "auto" }}
      >
        <Box minWidth="8.5in" minHeight="11in">
          <LabelsArea
            labels={labels}
            onDelete={handleDelete}
            onEdit={handleEdit}
            editingIndex={editingIndex ?? -1}
          />
        </Box>
      </Box>
    </Flex>
  );
}
