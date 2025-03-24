// components/labels/PSALikeLabel.tsx

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";

/**
 * LabelProps defines the user-entered data for a single label.
 */
export interface LabelProps {
  yearSetLine?: string;
  playerLine?: string;
  variationLine?: string;
  cardNumber?: string;
  gradeTerm?: string;
  gradeNumber?: string;
}

/**
 * PSALikeLabel
 * ----------------------------------------------------------------------------
 * Renders a single slab label ~2.65in x 0.8in, using a forced font size of 12px 
 * and "Roboto" font. We also apply the user-defined border from context.
 */
export const PSALikeLabel: React.FC<LabelProps> = ({
  yearSetLine = "",
  playerLine = "",
  variationLine = "",
  cardNumber = "",
  gradeTerm = "",
  gradeNumber = "",
}) => {
  const { borderColor, borderSize } = useLabelContext();

  // Convert borderSize & borderColor into a valid CSS border
  const finalBorder =
    borderSize > 0 && borderColor
      ? `${borderSize}px solid ${borderColor}`
      : "none";

  return (
    <Box
      // Keep the container at 2.65in x 0.8in
      width="2.65in"
      height="0.8in"
      border={finalBorder}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      p={1}
      backgroundColor="white"
      overflow="hidden"

      /**
       * Force a small, fixed font size so brand or global theme 
       * increases do NOT apply here. 
       * We also keep "Roboto" for a PSA-like style.
       */
      fontFamily="Roboto, sans-serif"
      fontSize="12px" 
      lineHeight="1"
      color="gray.900"
    >
      {/* Left Column */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        maxW="50%"
      >
        {yearSetLine && (
          <Text fontWeight="700" lineHeight="1">
            {yearSetLine}
          </Text>
        )}
        {playerLine && (
          <Text fontWeight="700" lineHeight="1">
            {playerLine}
          </Text>
        )}
        {variationLine && <Text lineHeight="1">{variationLine}</Text>}
      </Box>

      {/* Right Column */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="space-evenly"
        maxW="40%"
      >
        {cardNumber && (
          <Text fontWeight="700" lineHeight="1" textAlign="right">
            {cardNumber}
          </Text>
        )}
        {gradeTerm && (
          <Text fontWeight="700" lineHeight="1" textAlign="right">
            {gradeTerm}
          </Text>
        )}
        {gradeNumber && (
          <Text fontWeight="700" lineHeight="1" textAlign="right">
            {gradeNumber}
          </Text>
        )}
      </Box>
    </Box>
  );
};
