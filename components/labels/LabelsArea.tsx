// components/LabelsArea.tsx

import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { LabelProps } from "./PSALikeLabel";
import { LabelCard } from "./LabelCard";
import { useLabelContext } from "@/context/LabelContext";

interface LabelsAreaProps {
  labels: LabelProps[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  editingIndex?: number;
}

/**
 * LabelsArea
 * ----------------------------------------------------------------------------
 * 1) Renders an 8.5" x 11" "paper-mock" for printing.
 * 2) Uses a grid to display all labels in either 2 or 3 columns,
 *    depending on user-chosen card width (in inches).
 * 3) Includes a conditional column gap to ensure there's visible
 *    separation between columns, especially when only 2 columns are shown.
 */
export const LabelsArea: React.FC<LabelsAreaProps> = ({
  labels,
  onDelete,
  onEdit,
  editingIndex = -1,
}) => {
  // Determine background color depending on Light/Dark mode
  const outerBg = useColorModeValue("gray.200", "gray.700");

  // Global label width/height from LabelContext
  const { labelWidthIn, labelHeightIn } = useLabelContext();

  /**
   * Decide how many columns to display in the grid.
   * If the user picks a width that is larger than ~2.7in,
   * we'll drop down to 2 columns. Otherwise, we do 3 columns.
   */
  const columns = labelWidthIn > 2.7 ? 2 : 3;

  /**
   * For readability when only 2 columns are shown, we increase
   * the gap a bit more so there's clear separation between the labels.
   */
  const columnGap = columns === 2 ? "0.2in" : "0.01in";

  return (
    <Box
      className="labels-area-container"
      width="100%"
      height="auto"
      p={{ base: 2, md: 2 }}
      bg={outerBg}
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      {/*
        .paper-mock: 
        Represents an 8.5" x 11" sheet of paper. 
        The position/overflow styles ensure everything lines up for printing.
      */}
      <Box
        className="paper-mock"
        width="8.5in"
        height="11in"
        bg="white"
        boxShadow="md"
        border="1px solid"
        borderColor="gray.100"
        position="relative"
        overflow="hidden"
      >
        {/*
          Inner container for the labels grid:
          - "px"/"py" add 0.25in of margin around edges so the print
            won't cut off the right or bottom labels.
          - "justifyContent" and "justifyItems" help center the labels horizontally.
          - A conditional "columnGap" for extra separation when columns === 2.
        */}
        <Box
          px="0.25in"
          py="0.25in"
          display="grid"
          width="full"
          height="auto"
          // Center the entire grid along the horizontal axis
          justifyContent="center"
          // Center the contents (individual items) within each grid cell
          justifyItems="center"
          // Dynamic columns & row height using user's chosen inches
          gridTemplateColumns={`repeat(${columns}, ${labelWidthIn}in)`}
          gridAutoRows={`${labelHeightIn}in`}
          // Use our conditional gap for columns
          gridColumnGap={columnGap}
          // Row gap can remain fairly small
          gridRowGap="0.03in"
          gridAutoFlow="row"
        >
          {labels.map((labelData, index) => (
            <Box
              key={index}
              width={`${labelWidthIn}in`}
              height={`${labelHeightIn}in`}
            >
              <LabelCard
                {...labelData}
                onEdit={() => onEdit(index)}
                onDelete={() => onDelete(index)}
                isSelected={index === editingIndex}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
