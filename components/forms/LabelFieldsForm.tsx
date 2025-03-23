// components/LabelFieldsForm.tsx

import React from "react";
import { VStack, FormControl, FormLabel, Input } from "@chakra-ui/react";

/**
 * LabelFieldsFormProps:
 * -------------------------------------
 * The form requires both the current values and the setters for:
 *  - yearSetLine
 *  - playerLine (the card's name or player)
 *  - variationLine
 *  - cardNumber
 *  - gradeTerm (e.g., MINT)
 *  - gradeNumber (e.g., 9)
 *
 * Each is controlled by a piece of state in the parent
 * (like FormPanel), which means this component is "dumb/presentational"
 * and only reflects and updates the parent's data.
 */
interface LabelFieldsFormProps {
  yearSetLine: string;
  setYearSetLine: (val: string) => void;

  playerLine: string;
  setPlayerLine: (val: string) => void;

  variationLine: string;
  setVariationLine: (val: string) => void;

  cardNumber: string;
  setCardNumber: (val: string) => void;

  gradeTerm: string;
  setGradeTerm: (val: string) => void;

  gradeNumber: string;
  setGradeNumber: (val: string) => void;
}

/**
 * LabelFieldsForm:
 * -----------------
 * A purely presentational component that renders the label data fields:
 *   - Year & Set
 *   - Card Name
 *   - Variation
 *   - Card #
 *   - Grade Term (e.g., MINT)
 *   - Grade Number (e.g., 9)
 *
 * It relies on the parent for state management and updates:
 * each field reads from a prop (e.g., yearSetLine) and calls
 * a corresponding setter (e.g., setYearSetLine) on change.
 */
export function LabelFieldsForm({
  yearSetLine,
  setYearSetLine,
  playerLine,
  setPlayerLine,
  variationLine,
  setVariationLine,
  cardNumber,
  setCardNumber,
  gradeTerm,
  setGradeTerm,
  gradeNumber,
  setGradeNumber,
}: LabelFieldsFormProps) {
  return (
    <VStack spacing={1} align="stretch">
      <FormControl>
        <FormLabel>Year & Set</FormLabel>
        <Input
          value={yearSetLine}
          onChange={(e) => setYearSetLine(e.target.value)}
          placeholder="e.g. 1999 Pokémon Base Set"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Card Name</FormLabel>
        <Input
          value={playerLine}
          onChange={(e) => setPlayerLine(e.target.value)}
          placeholder="e.g. Charizard"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Variation</FormLabel>
        <Input
          value={variationLine}
          onChange={(e) => setVariationLine(e.target.value)}
          placeholder="e.g. Holo"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Card #</FormLabel>
        <Input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="e.g. #4"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Grade Term</FormLabel>
        <Input
          value={gradeTerm}
          onChange={(e) => setGradeTerm(e.target.value)}
          placeholder="e.g. MINT"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Grade Number</FormLabel>
        <Input
          value={gradeNumber}
          onChange={(e) => setGradeNumber(e.target.value)}
          placeholder="e.g. 9"
        />
      </FormControl>
    </VStack>
  );
}
