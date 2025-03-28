// context/LabelContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { LabelProps } from "@/components/labels/PSALikeLabel";

/**
 * LabelContextProps
 * ----------------------------------------------------------------------------
 * Defines the shape of the data and methods exposed via our LabelContext:
 *
 *  - labels: an array of label data objects
 *  - addLabel, updateLabel, removeLabel, clearAll: CRUD operations for the labels array
 *
 *  - borderColor, borderSize: global border styling (in px)
 *    - setBorderColor, setBorderSize: set/update those global styles
 *
 *  - labelWidthIn, labelHeightIn: global label dimensions (in inches)
 *    - setLabelWidthIn, setLabelHeightIn: set/update these dimensions
 */
interface LabelContextProps {
  // Labels array + CRUD
  labels: LabelProps[];
  addLabel: (label: LabelProps) => void;
  updateLabel: (index: number, updated: LabelProps) => void;
  removeLabel: (index: number) => void;
  clearAll: () => void;

  // Global border settings
  borderColor: string;
  borderSize: number;
  setBorderColor: (c: string) => void;
  setBorderSize: (s: number) => void;

  // Global label size settings (in inches)
  labelWidthIn: number;
  labelHeightIn: number;
  setLabelWidthIn: (w: number) => void;
  setLabelHeightIn: (h: number) => void;
}

/**
 * LabelContext
 * ----------------------------------------------------------------------------
 * Creates a React context to store all label data, plus some global UI settings:
 *  - The actual "labels" array.
 *  - The border styling (borderColor, borderSize).
 *  - The label size (labelWidthIn, labelHeightIn).
 * This context is consumed by various components throughout the app.
 */
const LabelContext = createContext<LabelContextProps | null>(null);

/**
 * LabelProvider
 * ----------------------------------------------------------------------------
 * React provider component that wraps your app and provides:
 *  1) Labels state in localStorage (persisted across sessions).
 *  2) Global border settings (also persisted).
 *  3) Global label size settings (width/height in inches, persisted).
 */
export function LabelProvider({ children }: { children: React.ReactNode }) {
  // State: labels array
  const [labels, setLabels] = useState<LabelProps[]>([]);

  // State: border configuration
  const [borderColor, setBorderColor] = useState("");
  const [borderSize, setBorderSize] = useState(0);

  // State: label size configuration (in inches)
  const [labelWidthIn, setLabelWidthIn] = useState(2.65); // default 2.65in
  const [labelHeightIn, setLabelHeightIn] = useState(0.8); // default 0.8in

  // ---------------------------------------------------------
  // Load from localStorage on the initial mount
  // ---------------------------------------------------------
  useEffect(() => {
    // 1) Load Labels
    const stored = localStorage.getItem("labels");
    if (stored) {
      try {
        setLabels(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing labels from localStorage:", err);
      }
    } else {
      // Provide a default sample label if none exists
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

    // 2) Load Border Settings
    const storedBorder = localStorage.getItem("globalBorder");
    if (storedBorder) {
      try {
        const { color, size } = JSON.parse(storedBorder);
        setBorderColor(color || "");
        setBorderSize(size || 0);
      } catch (err) {
        console.error("Error parsing globalBorder:", err);
      }
    }

    // 3) Load Label Size
    const storedSize = localStorage.getItem("globalLabelSize");
    if (storedSize) {
      try {
        const { widthIn, heightIn } = JSON.parse(storedSize);
        setLabelWidthIn(widthIn || 2.65);
        setLabelHeightIn(heightIn || 0.8);
      } catch (err) {
        console.error("Error parsing globalLabelSize:", err);
      }
    }
  }, []);

  // ---------------------------------------------------------
  // Persist labels array whenever it changes
  // ---------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("labels", JSON.stringify(labels));
  }, [labels]);

  // ---------------------------------------------------------
  // Persist border settings whenever they change
  // ---------------------------------------------------------
  useEffect(() => {
    localStorage.setItem(
      "globalBorder",
      JSON.stringify({ color: borderColor, size: borderSize })
    );
  }, [borderColor, borderSize]);

  // ---------------------------------------------------------
  // Persist label size whenever it changes
  // ---------------------------------------------------------
  useEffect(() => {
    localStorage.setItem(
      "globalLabelSize",
      JSON.stringify({ widthIn: labelWidthIn, heightIn: labelHeightIn })
    );
  }, [labelWidthIn, labelHeightIn]);

  // ----------------------------------------------------------------------------
  // CRUD METHODS
  // ----------------------------------------------------------------------------

  /**
   * addLabel
   * ----------------------------------------------------------------------------
   * Pushes a new LabelProps object into the labels array.
   * Triggers a re-render & persists to localStorage automatically.
   */
  const addLabel = (label: LabelProps) => {
    setLabels((prev) => [...prev, label]);
  };

  /**
   * updateLabel
   * ----------------------------------------------------------------------------
   * Updates an existing label at index `index` with the data in `updated`.
   */
  const updateLabel = (index: number, updated: LabelProps) => {
    setLabels((prev) =>
      prev.map((item, idx) => (idx === index ? updated : item))
    );
  };

  /**
   * removeLabel
   * ----------------------------------------------------------------------------
   * Removes a label at the given index from the labels array.
   */
  const removeLabel = (index: number) => {
    setLabels((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * clearAll
   * ----------------------------------------------------------------------------
   * Completely clears the labels array. 
   * Intended to be used in a "Clear All" scenario in the UI.
   */
  const clearAll = () => {
    setLabels([]);
  };

  // Return the provider, exposing state & methods to consumers
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
        labelWidthIn,
        labelHeightIn,
        setLabelWidthIn,
        setLabelHeightIn,
      }}
    >
      {children}
    </LabelContext.Provider>
  );
}

/**
 * useLabelContext
 * ----------------------------------------------------------------------------
 * A custom hook to consume our LabelContext safely.
 * Throws an error if used outside of LabelProvider.
 */
export function useLabelContext() {
  const context = useContext(LabelContext);
  if (!context) {
    throw new Error("useLabelContext must be used within a LabelProvider");
  }
  return context;
}
