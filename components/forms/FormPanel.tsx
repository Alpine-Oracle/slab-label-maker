// components/FormPanel.tsx

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  useToast,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";
import { LabelFieldsForm } from "./LabelFieldsForm";
import { BorderSettingsPanel } from "./BorderSettingsPanel";
import { LabelSizeSettingsPanel } from "./LabelSizeSettingsPanel";
import { ClearAllDialog } from "../dialogs/ClearAllDialog";

/**
 * FormPanelProps
 * ---------------------------------------------------------------------------
 * - editingIndex: index of the label currently being edited (null if creating)
 * - setEditingIndex: function that toggles edit mode on/off
 */
interface FormPanelProps {
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

/**
 * FormPanel
 * ---------------------------------------------------------------------------
 * High-level form container providing:
 *    1) An Accordion to configure global label settings (Border & Size).
 *    2) A form for creating/updating a label (LabelFieldsForm).
 *    3) Buttons to Save, Cancel, and "Clear All" labels.
 *    4) A confirmation dialog for clearing all labels.
 */
export function FormPanel({ editingIndex, setEditingIndex }: FormPanelProps) {
  /**
   * useToast: Chakra-UI hook for showing user notifications.
   * e.g. "Label added!" or "Please enter a Card Name."
   */
  const toast = useToast();

  /**
   * We load the label array and CRUD methods from LabelContext,
   * which handles persistent storage in localStorage, etc.
   */
  const { labels, addLabel, updateLabel, clearAll } = useLabelContext();

  // Local state for each field that belongs to a single label
  const [yearSetLine, setYearSetLine] = useState("");
  const [playerLine, setPlayerLine] = useState("");
  const [variationLine, setVariationLine] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [gradeTerm, setGradeTerm] = useState("");
  const [gradeNumber, setGradeNumber] = useState("");

  /**
   * "Clear All" dialog state:
   * - isClearDialogOpen determines whether the modal is visible.
   * - cancelButtonRef references the cancel button to focus it automatically.
   */
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // isEditing: derived boolean indicating whether we have a valid editingIndex
  const isEditing = editingIndex !== null;

  /**
   * Whenever editingIndex changes (meaning we switched to editing a particular label),
   * load that label’s existing data into our local form states.
   */
  useEffect(() => {
    if (
      editingIndex !== null &&
      editingIndex >= 0 &&
      editingIndex < labels.length
    ) {
      const label = labels[editingIndex];
      setYearSetLine(label.yearSetLine ?? "");
      setPlayerLine(label.playerLine ?? "");
      setVariationLine(label.variationLine ?? "");
      setCardNumber(label.cardNumber ?? "");
      setGradeTerm(label.gradeTerm ?? "");
      setGradeNumber(label.gradeNumber ?? "");
    }
  }, [editingIndex, labels]);

  /**
   * handleSave
   * -------------------------------------------------------------------------
   * Validate user input, then either:
   *   - create a new label if we're not editing, or
   *   - update the existing label if we are editing.
   */
  const handleSave = () => {
    // Require at least a year/set or a player line
    if (!yearSetLine && !playerLine) {
      toast({
        title: "Please enter at least a Card Name or Set!",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (editingIndex === null) {
      // CREATE mode: add a new label
      addLabel({
        yearSetLine,
        playerLine,
        variationLine,
        cardNumber,
        gradeTerm,
        gradeNumber,
      });

      toast({
        title: "Label added!",
        description: "Your label has been added to the list.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      // EDIT mode: update existing label
      updateLabel(editingIndex, {
        yearSetLine,
        playerLine,
        variationLine,
        cardNumber,
        gradeTerm,
        gradeNumber,
      });

      toast({
        title: "Label updated!",
        description: `Label #${editingIndex + 1} has been updated.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // Return to create mode
      setEditingIndex(null);
    }
  };

  /**
   * handleCancelEdit
   * -------------------------------------------------------------------------
   * Cancels editing and reverts to the initial create mode.
   */
  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  /**
   * handleClearAllClick
   * -------------------------------------------------------------------------
   * Opens the confirmation dialog to clear all labels from localStorage.
   */
  const handleClearAllClick = () => {
    setIsClearDialogOpen(true);
  };

  /**
   * handleConfirmClearAll
   * -------------------------------------------------------------------------
   * Called if user confirms clearing all labels.
   * It removes all labels from storage, resets form fields, and shows a toast.
   */
  const handleConfirmClearAll = () => {
    clearAll();
    setIsClearDialogOpen(false);
    setEditingIndex(null);

    // (Optional) Reset all form fields to blank
    setYearSetLine("");
    setPlayerLine("");
    setVariationLine("");
    setCardNumber("");
    setGradeTerm("");
    setGradeNumber("");

    toast({
      title: "All labels cleared.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  /**
   * handleCancelClearAll
   * -------------------------------------------------------------------------
   * Closes the "Clear All" confirmation dialog without deleting data.
   */
  const handleCancelClearAll = () => {
    setIsClearDialogOpen(false);
  };

  return (
    <Box
      w={{ base: "full", md: "400px" }}
      p={4}
      borderRight="1px solid"
      borderColor="gray.200"
      bg="white"
      height="calc(100vh - 4rem)"
      overflowY="auto"
    >
      {/* Form heading: "Edit Label" (if editing) or "Create Label" (if new) */}
      <Heading size="md" mb={2} color="brand.600">
        {isEditing ? "Edit Label" : "Create Label"}
      </Heading>

      {/*
       * Accordion for global label settings
       *   1) BorderSettingsPanel
       *   2) LabelSizeSettingsPanel
       */}
      <Accordion allowMultiple mb={4}>
        {/* BORDER SETTINGS */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Border Settings
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <BorderSettingsPanel />
          </AccordionPanel>
        </AccordionItem>

        {/* LABEL SIZE SETTINGS */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Label Size Settings
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <LabelSizeSettingsPanel />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/*
       * Form fields for the label’s text lines: 
       * year/set, player, variation, card number, grade, etc.
       */}
      <LabelFieldsForm
        yearSetLine={yearSetLine}
        setYearSetLine={setYearSetLine}
        playerLine={playerLine}
        setPlayerLine={setPlayerLine}
        variationLine={variationLine}
        setVariationLine={setVariationLine}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        gradeTerm={gradeTerm}
        setGradeTerm={setGradeTerm}
        gradeNumber={gradeNumber}
        setGradeNumber={setGradeNumber}
      />

      {/*
       * Buttons for:
       *   - Save / Add (dependent on editing vs. create)
       *   - Cancel editing (only visible if isEditing)
       *   - Clear All -> opens confirmation dialog
       */}
      <Box pt={4}>
        <Stack direction={{ base: "column", md: "row" }} spacing={3}>
          <Button onClick={handleSave}>
            {isEditing ? "Save" : "Add Label"}
          </Button>

          {isEditing && (
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
          )}

          <Button
            onClick={handleClearAllClick}
            colorScheme="red"
            variant="outline"
          >
            Clear All
          </Button>
        </Stack>
      </Box>

      {/*
       * Confirmation dialog for removing all labels from storage.
       * We pass in the isOpen state and the respective confirm/cancel handlers.
       */}
      <ClearAllDialog
        isOpen={isClearDialogOpen}
        leastDestructiveRef={cancelButtonRef}
        onClose={handleCancelClearAll}
        onConfirm={handleConfirmClearAll}
      />
    </Box>
  );
}
