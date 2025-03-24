// components/labels/PSALikeLabel.tsx

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";

/**
 * LabelProps
 * ----------------------------------------------------------------------------
 * Defines user-entered data for a single label: 
 * year/set, player, variation, card number, grade, etc.
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
 * Renders a fixed-size ~2.65in x 0.8in label with "Roboto" font, 12px size,
 * forcing letter-spacing, color, etc. We ignore the global theme here,
 * ensuring all brand or global overrides do not affect the actual label text.
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

  // Determine user-chosen border or none
  const finalBorder =
    borderSize > 0 && borderColor
      ? `${borderSize}px solid ${borderColor}`
      : "none";

  return (
    <Box
      width="2.65in"
      height="0.8in"
      border={finalBorder}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      style={{
        // Hardcode padding, background, font styles
        padding: "4px", // ~Chakra's p={1}
        backgroundColor: "#ffffff",
        overflow: "hidden",

        // Force "Roboto, 12px" ignoring any theme
        fontFamily: "Roboto, sans-serif",
        fontSize: "12px",
        lineHeight: "1",
        letterSpacing: "0.5px", // ensures consistent spacing
        color: "#000000",
      }}
    >
      {/* Left column: year/set, player, variation */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        maxW="50%"
      >
        {yearSetLine && (
          <Text
            style={{
              fontWeight: 700,
              lineHeight: "1",
              letterSpacing: "0.5px",
            }}
          >
            {yearSetLine}
          </Text>
        )}
        {playerLine && (
          <Text
            style={{
              fontWeight: 700,
              lineHeight: "1",
              letterSpacing: "0.5px",
            }}
          >
            {playerLine}
          </Text>
        )}
        {variationLine && (
          <Text
            style={{
              lineHeight: "1",
              letterSpacing: "0.5px",
            }}
          >
            {variationLine}
          </Text>
        )}
      </Box>

      {/* Right column: card number, grade term, grade number */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="space-evenly"
        maxW="40%"
      >
        {cardNumber && (
          <Text
            style={{
              fontWeight: 700,
              lineHeight: "1",
              letterSpacing: "0.5px",
              textAlign: "right",
            }}
          >
            {cardNumber}
          </Text>
        )}
        {gradeTerm && (
          <Text
            style={{
              fontWeight: 700,
              lineHeight: "1",
              letterSpacing: "0.5px",
              textAlign: "right",
            }}
          >
            {gradeTerm}
          </Text>
        )}
        {gradeNumber && (
          <Text
            style={{
              fontWeight: 700,
              lineHeight: "1",
              letterSpacing: "0.5px",
              textAlign: "right",
            }}
          >
            {gradeNumber}
          </Text>
        )}
      </Box>
    </Box>
  );
};
