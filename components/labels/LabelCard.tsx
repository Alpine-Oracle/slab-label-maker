// components/LabelCard.tsx

import React from "react";
import {
  Box,
  IconButton,
  Flex,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { LabelProps, PSALikeLabel } from "./PSALikeLabel";

/**
 * LabelCardProps extends the standard label fields (LabelProps)
 * and adds callbacks for Edit/Delete actions, plus an isSelected flag
 * to highlight a currently edited label.
 */
interface LabelCardProps extends LabelProps {
  onEdit: () => void;
  onDelete: () => void;
  isSelected?: boolean;
}

/**
 * LabelCard:
 * -----------
 * A wrapper around the PSALikeLabel, normally showing a minimal
 * 1px gray border. If isSelected is true, we draw an internal
 * highlight (4px) so it isn't cut off externally. On desktop,
 * Edit/Delete icons appear on hover; on mobile, they're always visible
 * via a CSS media query.
 */
export const LabelCard: React.FC<LabelCardProps> = ({
  yearSetLine,
  playerLine,
  variationLine,
  cardNumber,
  gradeTerm,
  gradeNumber,
  onEdit,
  onDelete,
  isSelected = false,
}) => {
  // For a default "no user-specified border," we do 1px gray.
  const borderColor = "gray.900";
  const highlightColor = "#FFCB05"; // internal highlight color

  return (
    <Box
      position="relative"
      display="inline-block"
      width="fit-content"
      backgroundColor="white"
      // A minimal default border so the label doesn't look borderless

      p={0}
      mb={4}
      overflow="visible"
      _hover={{
        ".card-icons": { opacity: 1, pointerEvents: "auto" },
        boxShadow: "lg",
      }}
    >
      {/*
        If isSelected is true, render a child box that applies 
        a 4px internal border highlight (inset). 
        This won't expand the card size or get cut off externally.
      */}
      {isSelected && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          pointerEvents="none"
          borderRadius="md"
          boxShadow={`inset 0 0 0 4px ${highlightColor}`}
        />
      )}

      {/*
        The actual label content (PSALikeLabel)
        handles the text layout, measuring 2.65" x 0.8" in inches.
      */}
      <PSALikeLabel
        yearSetLine={yearSetLine}
        playerLine={playerLine}
        variationLine={variationLine}
        cardNumber={cardNumber}
        gradeTerm={gradeTerm}
        gradeNumber={gradeNumber}
      />

      {/*
        Edit/Delete icons, hidden by default unless hovered on desktop.
        On mobile (hover: none), a global CSS snippet always shows them:
        
        @media (hover: none) {
          .card-icons {
            opacity: 1 !important;
            pointer-events: auto !important;
          }
        }
      */}
      <Flex
        className="card-icons"
        position="absolute"
        top="4px"
        right="4px"
        align="center"
        gap={1}
        opacity={0}
        pointerEvents="none"
        transition="opacity 0.2s ease"
      >
        <Tooltip label="Edit Label" hasArrow>
          <IconButton
            size="xs"
            variant="solid"
            colorScheme="blue"
            aria-label="Edit label"
            icon={<EditIcon />}
            onClick={onEdit}
          />
        </Tooltip>

        <Tooltip label="Delete Label" hasArrow>
          <IconButton
            size="xs"
            variant="solid"
            colorScheme="red"
            aria-label="Delete label"
            icon={<DeleteIcon />}
            onClick={onDelete}
          />
        </Tooltip>
      </Flex>
    </Box>
  );
};
