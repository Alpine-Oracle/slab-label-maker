// components/LabelSizeSettingsPanel.tsx

import React from "react";
import { Box, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";

/**
 * LabelSizeSettingsPanel
 * ----------------------
 * Allows the user to pick an inch-based width & height
 * for every label label. Stored in context -> updated in real-time.
 */
export function LabelSizeSettingsPanel() {
  const {
    labelWidthIn,
    setLabelWidthIn,
    labelHeightIn,
    setLabelHeightIn,
  } = useLabelContext();

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setLabelWidthIn(isNaN(val) ? 2.65 : val);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setLabelHeightIn(isNaN(val) ? 0.8 : val);
  };

  return (
    <Box
          p={2}
          border="1px solid"
          borderColor="gray.300"
          mb={2}
          borderRadius="md"
        >


      <FormControl mb={2}>
        <FormLabel>Label Width (inches)</FormLabel>
        <Input
          type="number"
          step="0.01"
          value={labelWidthIn}
          onChange={handleWidthChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Label Height (inches)</FormLabel>
        <Input
          type="number"
          step="0.01"
          value={labelHeightIn}
          onChange={handleHeightChange}
        />
      </FormControl>
    </Box>
  );
}
