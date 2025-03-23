// context/LabelContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { LabelProps } from "@/components/labels/PSALikeLabel";

/**
 * LabelContextProps:
 * -------------------
 * Defines the shape of the data and methods provided by LabelContext:
 *  - labels: array of label data (Title, variation, etc.)
 *  - addLabel / updateLabel / removeLabel / clearAll: CRUD ops for label array
 *  - borderColor / borderSize: global border styling used by all labels
 *  - setBorderColor / setBorderSize: methods to change the global border
 */
interface LabelContextProps {
  labels: LabelProps[];
  addLabel: (label: LabelProps) => void;
  updateLabel: (index: number, updated: LabelProps) => void;
  removeLabel: (index: number) => void;
  clearAll: () => void;

  // Global border settings for all labels
  borderColor: string;
  borderSize: number;
  setBorderColor: (c: string) => void;
  setBorderSize: (s: number) => void;
}

/**
 * LabelContext:
 * --------------
 * A React context that centralizes label data and global border configuration.
 * We store these in localStorage so user data & styling persist across sessions
 * without needing a backend.
 */
const LabelContext = createContext<LabelContextProps | null>(null);

/**
 * LabelProvider:
 * ---------------
 * The higher-order component (provider) that:
 *  1) Maintains labels in state, loading/saving them from localStorage.
 *  2) Stores a global borderColor & borderSize, also saved to localStorage.
 *  3) Exposes CRUD functions for labels, plus setBorderColor/setBorderSize.
 */
export function LabelProvider({ children }: { children: React.ReactNode }) {
  const [labels, setLabels] = useState<LabelProps[]>([]);

  // Global border color/size for all labels
  const [borderColor, setBorderColor] = useState("");
  const [borderSize, setBorderSize] = useState(0);

  // -------------------------------------------
  // Load from localStorage on initial mount
  // -------------------------------------------
  useEffect(() => {
    // Attempt to load label array
    const stored = localStorage.getItem("labels");
    if (stored) {
      try {
        setLabels(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing labels from localStorage:", err);
      }
    } else {
      // Provide a default example label if none found
      setLabels([
        {
          yearSetLine: "1999 Pokémon Base Set",
          playerLine: "Charizard",
          variationLine: "Holo",
          cardNumber: "#4",
          gradeTerm: "MINT",
          gradeNumber: "9",
        },
      ]);
    }

    // Also load global border settings
    const storedBorder = localStorage.getItem("globalBorder");
    if (storedBorder) {
      try {
        const { color, size } = JSON.parse(storedBorder);
        setBorderColor(color || "");
        setBorderSize(size || 0);
      } catch (err) {
        console.error("Error parsing globalBorder from localStorage:", err);
      }
    }
  }, []);

  // -------------------------------------------
  // Save labels array whenever it changes
  // -------------------------------------------
  useEffect(() => {
    localStorage.setItem("labels", JSON.stringify(labels));
  }, [labels]);

  // -------------------------------------------
  // Save border settings whenever they change
  // -------------------------------------------
  useEffect(() => {
    localStorage.setItem(
      "globalBorder",
      JSON.stringify({
        color: borderColor,
        size: borderSize,
      })
    );
  }, [borderColor, borderSize]);

  // CRUD methods for label array
  const addLabel = (label: LabelProps) => {
    setLabels((prev) => [...prev, label]);
  };

  const updateLabel = (index: number, updated: LabelProps) => {
    setLabels((prev) =>
      prev.map((item, idx) => (idx === index ? updated : item))
    );
  };

  const removeLabel = (index: number) => {
    setLabels((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setLabels([]);
  };

  return (
    <LabelContext.Provider
      value={{
        labels,
        addLabel,
        updateLabel,
        removeLabel,
        clearAll,
        borderColor,
        borderSize,
        setBorderColor,
        setBorderSize,
      }}
    >
      {children}
    </LabelContext.Provider>
  );
}

/**
 * useLabelContext:
 * -----------------
 * A custom hook that ensures we only consume the context
 * if it's valid (i.e. within the LabelProvider).
 */
export function useLabelContext() {
  const context = useContext(LabelContext);
  if (!context) {
    throw new Error("useLabelContext must be used within a LabelProvider");
  }
  return context;
}
