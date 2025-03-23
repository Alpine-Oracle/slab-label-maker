// pages/index.tsx

import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { FormPanel } from "@/components/forms/FormPanel";
import { LabelsArea } from "@/components/labels/LabelsArea";
import { useLabelContext } from "@/context/LabelContext";

/**
 * HomePage:
 * ----------------------------------------------------------------------------
 *  - Mobile (base):
 *      The FormPanel is 100% width & height below the nav (calc(100vh - 4rem)).
 *      The LabelsArea is stacked below that, letting the user scroll down
 *      to see or horizontally scroll if narrower than 8.5in.
 *
 *  - Desktop (md+):
 *      The screen is split horizontally:
 *        - Left: FormPanel (400px wide, auto scroll).
 *        - Right: label container (flex=1, overflow=auto, minWidth=8.5in).
 *      We hide page-level scroll (overflow="hidden") so only the label
 *      area container can scroll horizontally or vertically.
 *
 * The crucial fix to prevent "double print" is tagging the non-.paper-mock
 * container with "no-print," ensuring the normal layout is hidden in print
 * and only the .paper-mock region remains visible.
 */
export default function HomePage() {
  const { labels, removeLabel } = useLabelContext();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  /**
   * handleDelete:
   * Removes a label at the given index; if that label was in edit mode,
   * we reset the editing state.
   */
  const handleDelete = (index: number) => {
    removeLabel(index);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  /**
   * handleEdit:
   * Switches to editing mode for the label at the given index.
   */
  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  return (
    <Flex
      // On mobile => stacked (column). On desktop => side-by-side (row).
      flexDirection={{ base: "column", md: "row" }}
      width="100vw"
      // On mobile => let the entire page grow. On desktop => fix to (100vh - 4rem),
      // so only the label area container scrolls horizontally/vertically.
      height={{ base: "auto", md: "calc(100vh - 4rem)" }}
      // On mobile => page can scroll, on desktop => hide page scroll,
      // letting the label container do so.
      overflow={{ base: "visible", md: "hidden" }}
    >
      {/*
        Wrap the normal layout (FormPanel) in .no-print so it’s
        completely hidden in print mode. Only .paper-mock remains visible
        when printing, avoiding the “double page” phenomenon.
      */}
      <Box
        className="no-print" // <--- ensures the form won't appear in print
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
        Labels container:
        On mobile => stacked below the form panel.
        On desktop => takes remaining space (flex=1) with overflow=auto.
      */}
      <Box
        flex={{ base: "none", md: "1" }}
        width={{ base: "100%", md: "auto" }}
        height={{ base: "auto", md: "100%" }}
        overflow={{ base: "auto", md: "auto" }}
      >
        {/*
          We give minWidth=8.5in and minHeight=11in, so if the container is smaller,
          horizontal/vertical scrollbars appear. On mobile, the user can also horizontally
          scroll if the screen is narrower than 8.5in.
        */}
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
