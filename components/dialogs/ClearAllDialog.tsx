// components/ClearAllDialog.tsx

import React, { RefObject } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

/**
 * ClearAllDialogProps
 * ---------------------------------
 * - isOpen: whether the dialog is visible
 * - leastDestructiveRef: ref to the 'Cancel' button
 *   typed as HTMLButtonElement | null to accommodate typical React useRef
 * - onClose: callback to close the dialog
 * - onConfirm: callback to confirm clearing all labels
 */
interface ClearAllDialogProps {
  isOpen: boolean;
  leastDestructiveRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * ClearAllDialog
 * ---------------------------------
 * A confirmation dialog for removing all labels from storage.
 * We pass the Cancel button's ref as leastDestructiveRef,
 * which Chakra uses to focus that button automatically,
 * preventing accidental destructive actions.
 */
export function ClearAllDialog({
  isOpen,
  leastDestructiveRef,
  onClose,
  onConfirm,
}: ClearAllDialogProps) {
  return (
    <AlertDialog
      isOpen={isOpen}
      // Type-cast so Chakra sees it as a FocusableElement ref
      leastDestructiveRef={
        leastDestructiveRef as unknown as React.RefObject<HTMLElement>
      }
      onClose={onClose}
    >
      <AlertDialogOverlay bg="blackAlpha.800">
        <AlertDialogContent bg="gray.300">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Clear All Labels
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? All labels will be permanently removed. You can’t undo
            this action.
          </AlertDialogBody>

          <AlertDialogFooter>
            {/* Attach the same ref to the Cancel button */}
            <Button ref={leastDestructiveRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              Clear All
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
