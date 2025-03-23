// components/BorderSettingsPanel.tsx

import React from "react";
import { Box, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";

/**
 * BorderSettingsPanelProps:
 * --------------------------------
 * (Currently empty. You can add optional fields later, such as
 * show/hide flags or additional advanced settings.)
 */
interface BorderSettingsPanelProps {
  // e.g. showAdvanced?: boolean
}

/**
 * BorderSettingsPanel
 * --------------------------------
 * A subcomponent that manages the global borderColor & borderSize
 * for all labels in the app. These values are stored in the
 * LabelContext and applied across every label.
 *
 * It displays:
 *   - A color picker for setting the border's color
 *   - A numeric input for the border's thickness (in px)
 *
 * Production-Ready Notes:
 *   - This panel can be displayed in a collapsible (like <Collapse />)
 *     when toggled from the main FormPanel.
 *   - Additional fields or advanced settings can be added if needed.
 */
export function BorderSettingsPanel(_: BorderSettingsPanelProps) {
  // Access the global border configuration from LabelContext
  const { borderColor, setBorderColor, borderSize, setBorderSize } =
    useLabelContext();

  /**
   * handleColorChange:
   *  - Called whenever the user picks a new color in the <input type="color" />
   *  - Updates the context's borderColor, which refreshes all labels at once.
   */
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorderColor(e.target.value);
  };

  /**
   * handleSizeChange:
   *  - Called whenever the user types a new size in px.
   *  - If the user types non-numeric, we default to 0.
   *  - Also ensures the entire UI re-renders with the new size.
   */
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setBorderSize(isNaN(val) ? 0 : val);
  };

  return (
    <Box
      p={2}
      border="1px solid"
      borderColor="gray.300"
      mb={2}
      borderRadius="md"
    >
      <Heading size="sm" mb={2}>
        Border Settings
      </Heading>

      <FormControl mb={2}>
        <FormLabel>Color</FormLabel>
        <Input type="color" value={borderColor} onChange={handleColorChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Size (px)</FormLabel>
        <Input
          type="number"
          value={borderSize}
          onChange={handleSizeChange}
          placeholder="e.g. 2"
        />
      </FormControl>
    </Box>
  );
}
