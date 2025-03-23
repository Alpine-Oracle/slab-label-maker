// components/LabelsArea.tsx

import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { LabelProps } from "./PSALikeLabel";
import { LabelCard } from "./LabelCard";

interface LabelsAreaProps {
  labels: LabelProps[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  editingIndex?: number;
}

/**
 * LabelsArea:
 * -------------
 * Shows an 8.5" x 11" .paper-mock with a
 * grid of label cells (2.65in x 0.8in).
 * The parent container handles overflow & minWidth/minHeight logic.
 */
export const LabelsArea: React.FC<LabelsAreaProps> = ({
  labels,
  onDelete,
  onEdit,
  editingIndex = -1,
}) => {
  const outerBg = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      className="labels-area-container"
      width="100%"
      height="auto"
      // We reduce padding to avoid extra margin on the right
      p={{ base: 2, md: 2 }}
      bg={outerBg}
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      {/*
        .paper-mock: pinned in print. 
        Size 8.5" x 11". 
        We'll define internal margins so the final print matches.
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
          Internal margins for the label grid:
          px="0.25in" => left/right margin
          We can ensure there's enough space so the right side isn't cut off.
        */}
        <Box
          px="0.25in"
          py="0.25in"
          display="grid"
          gridTemplateColumns="repeat(3, 2.65in)"
          gridAutoRows="0.8in"
          // Slight gap between columns & rows
          gridColumnGap="0.01in"
          gridRowGap="0.03in"
          gridAutoFlow="row"
          width="auto"
          height="auto"
        >
          {labels.map((labelData, index) => (
            <Box key={index} width="2.65in" height="0.8in">
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
