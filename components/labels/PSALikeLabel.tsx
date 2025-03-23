// components/PSALikeLabel.tsx

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";

/**
 * LabelProps defines the user-entered data for a single label:
 *  - yearSetLine: e.g. "1999 Pokémon Base Set"
 *  - playerLine: e.g. "Charizard"
 *  - variationLine: e.g. "Holo"
 *  - cardNumber: e.g. "#4"
 *  - gradeTerm: e.g. "MINT"
 *  - gradeNumber: e.g. "9"
 *
 * This component does not store or update these fields;
 * it simply displays them in a "PSA-like" layout.
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
 * -------------
 * Renders a single slab label at ~2.65in x 0.8in (slightly larger
 * than official PSA size to allow for trimming). Uses Roboto
 * for text, ensures the user-defined border is applied from context.
 */
export const PSALikeLabel: React.FC<LabelProps> = ({
  yearSetLine = "",
  playerLine = "",
  variationLine = "",
  cardNumber = "",
  gradeTerm = "",
  gradeNumber = "",
}) => {
  // Retrieve global border settings (color & size) from the context
  const { borderColor, borderSize } = useLabelContext();

  // If the user sets borderSize=0 or borderColor is blank,
  // we set 'none' to avoid showing any border.
  const finalBorder =
    borderSize > 0 && borderColor
      ? `${borderSize}px solid ${borderColor}`
      : "none";

  return (
    <Box
      // We choose 2.65" x 0.8" to allow a bit more margin for cutting
      width="2.65in"
      height="0.8in"
      border={finalBorder}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      p={1}
      backgroundColor="white"
      overflow="hidden"
      // Force Roboto font for clarity at smaller text sizes
      fontFamily="Roboto, sans-serif"
      fontSize="sm"
      color="gray.900"
    >
      {/* Left Column: primarily the year/set, Pokémon name, variation */}
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

      {/* Right Column: card number, grade term, and grade number */}
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
