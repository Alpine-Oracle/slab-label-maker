// components/labels/PSALikeLabel.tsx

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";

/**
 * LabelProps
 * ----------------------------------------------------------------------------
 * Represents the textual data needed to render a single label:
 *   - yearSetLine: e.g. "1999 Pokémon Base Set"
 *   - playerLine: e.g. "Charizard"
 *   - variationLine: e.g. "Holo" or "Reverse Foil"
 *   - cardNumber: typically "#4" or something similar
 *   - gradeTerm: e.g. "MINT" or "NEAR MINT"
 *   - gradeNumber: e.g. "9", "10", etc.
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
 * A React functional component that produces a "PSA-style" label.
 * The label dimension (width/height) and border are controlled by
 * context values (labelWidthIn, labelHeightIn, borderColor, borderSize).
 * Text lines are laid out in two columns (left vs. right).
 *
 * Usage:
 *   <PSALikeLabel
 *     yearSetLine="1999 Pokémon Base Set"
 *     playerLine="Charizard"
 *     ...
 *   />
 */
export const PSALikeLabel: React.FC<LabelProps> = ({
  yearSetLine = "",
  playerLine = "",
  variationLine = "",
  cardNumber = "",
  gradeTerm = "",
  gradeNumber = "",
}) => {
  // Pull global layout settings from LabelContext
  const { borderColor, borderSize, labelWidthIn, labelHeightIn } = useLabelContext();

  /**
   * finalBorder:
   *   - Composes the border style (in px) using the user-selected thickness
   *     and color. Defaults to "none" if borderSize <= 0 or no borderColor.
   */
  const finalBorder =
    borderSize > 0 && borderColor
      ? `${borderSize}px solid ${borderColor}`
      : "none";

  return (
    <Box
      // Convert labelWidthIn & labelHeightIn to inch-based CSS units.
      width={`${labelWidthIn}in`}
      height={`${labelHeightIn}in`}
      border={finalBorder}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      style={{
        // Hardcode padding & styling to achieve a consistent, uniform label look
        padding: "4px", // equivalent to p={1} in Chakra
        backgroundColor: "#ffffff",
        overflow: "hidden",

        // Force Roboto 12px with a consistent line height & letter spacing
        fontFamily: "Roboto, sans-serif",
        fontSize: "12px",
        lineHeight: "1",
        letterSpacing: "0.5px",
        color: "#000000",
      }}
    >
      {/*
        Left column:
        ------------
        Usually contains:
          - yearSetLine (e.g., "1999 Pokémon Base Set")
          - playerLine (the player's name, e.g., "Charizard")
          - variationLine (additional variant info, e.g., "Holo")
      */}
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

      {/*
        Right column:
        -------------
        Typically contains:
          - cardNumber (e.g., "#4" or "No. 15")
          - gradeTerm (e.g., "MINT")
          - gradeNumber (e.g., "9" or "10")
        We right-align text in this column.
      */}
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
