// components/FormPanel.tsx

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  useToast,
  Collapse,
  Stack,
} from "@chakra-ui/react";
import { useLabelContext } from "@/context/LabelContext";
import { LabelFieldsForm } from "./LabelFieldsForm";
import { BorderSettingsPanel } from "./BorderSettingsPanel";
import { ClearAllDialog } from "../dialogs/ClearAllDialog";

/**
 * FormPanelProps:
 * -----------------
 * - editingIndex: index of the label currently being edited (or null if creating)
 * - setEditingIndex: function to switch between edit mode and create mode
 */
interface FormPanelProps {
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

/**
 * FormPanel:
 * -----------
 * A top-level component for creating/updating labels and managing global border settings.
 *
 * Features:
 *   1) Toggle "Border Settings" for all labels via BorderSettingsPanel.
 *   2) Input fields for label data (LabelFieldsForm).
 *   3) A "Clear All" dialog to remove all labels from local storage (ClearAllDialog).
 *
 * The Save / Cancel / Clear All buttons can wrap (stack vertically) on small screens
 * if there's not enough horizontal space.
 */
export function FormPanel({ editingIndex, setEditingIndex }: FormPanelProps) {
  const toast = useToast();
  const { labels, addLabel, updateLabel, clearAll } = useLabelContext();

  // Toggles the "Border Settings" collapsible panel
  const [showBorderMenu, setShowBorderMenu] = useState(false);

  // Local states for label data fields
  const [yearSetLine, setYearSetLine] = useState("");
  const [playerLine, setPlayerLine] = useState("");
  const [variationLine, setVariationLine] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [gradeTerm, setGradeTerm] = useState("");
  const [gradeNumber, setGradeNumber] = useState("");

  // "Clear All" dialog state
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  // Button ref for focusing on "Cancel" in the dialog
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // Are we editing an existing label, or creating a new one?
  const isEditing = editingIndex !== null;

  /**
   * If editingIndex is valid, load that label's data into our form fields.
   * If it's null, we keep the existing input states so the user can
   * create multiple labels in sequence using the same data as a template.
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
   * handleSave:
   *   - If editingIndex is null, we create a new label.
   *   - Otherwise, update the existing label, show a success toast,
   *     and revert to create mode.
   */
  const handleSave = () => {
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
      // CREATE mode
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
      // EDIT mode
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
      setEditingIndex(null);
    }
  };

  // Cancels editing -> revert to create mode
  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  // Opens the "Clear All" confirmation dialog
  const handleClearAllClick = () => {
    setIsClearDialogOpen(true);
  };

  /**
   * handleConfirmClearAll:
   *   - Clears all labels from context,
   *   - resets local fields if desired,
   *   - shows a toast message.
   */
  const handleConfirmClearAll = () => {
    clearAll();
    setIsClearDialogOpen(false);
    setEditingIndex(null);
    // Optionally reset form fields
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

  // Closes the "Clear All" dialog without clearing
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
      <Heading size="md" mb={2} color="brand.600">
        {isEditing ? "Edit Label" : "Create Label"}
      </Heading>

      {/* Toggle border settings panel (applies to all labels) */}
      <Button
        size="sm"
        variant="outline"
        mb={2}
        onClick={() => setShowBorderMenu(!showBorderMenu)}
      >
        {showBorderMenu ? "Hide Border Settings" : "Show Border Settings"}
      </Button>

      {/* Collapsible border configuration UI */}
      <Collapse in={showBorderMenu} animateOpacity>
        <BorderSettingsPanel />
      </Collapse>

      {/* The form fields for label data */}
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

      {/* Buttons to Save, Cancel (if editing), or Clear All. Stack on mobile. */}
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

      {/* Confirmation dialog for removing all labels */}
      <ClearAllDialog
        isOpen={isClearDialogOpen}
        leastDestructiveRef={cancelButtonRef}
        onClose={handleCancelClearAll}
        onConfirm={handleConfirmClearAll}
      />
    </Box>
  );
}
