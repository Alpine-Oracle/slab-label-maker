# Slab Label Maker

Create, customize, and print **PSA-like** labels for **any slabbed or graded cards**—Pokémon, sports, trading cards, or other collectibles. This Next.js + Chakra UI project offers customizable border settings, local storage persistence, and a print-ready 8.5" × 11" layout to generate labels at the correct size.

---

## Live Demo & GitHub

- **Live Demo**: [slab-label-maker.vercel.app](https://slab-label-maker.vercel.app/)
- **GitHub**: [github.com/Alpine-Oracle/slab-label-maker](https://github.com/Alpine-Oracle/slab-label-maker)

Visit the live site to try it out instantly, or clone the repo for local development and customization.

---

## Table of Contents

- [Slab Label Maker](#slab-label-maker)
  - [Live Demo \& GitHub](#live-demo--github)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
  - [Project Structure](#project-structure)
  - [Printing \& Margins](#printing--margins)
  - [Border Customization](#border-customization)
  - [Example Supplies](#example-supplies)
  - [Future Improvements](#future-improvements)
  - [Contributing](#contributing)
  - [License](#license)
  - [Dev Note](#dev-note)
  - [Disclaimer](#disclaimer)

---

## Overview

The **Slab Label Maker** enables you to:

- **Add/Edit** labels with year/set, card name, variation, card #, and grade.
- **Configure** a global border color/size (e.g., 2px red for a PSA-like look).
- **Print** on an 8.5" × 11" “paper mock” with label cells sized at **2.65" × 0.8"** for easy trimming.
- **Persist** data in local storage—no backend or database required.

All site text uses **Press Start 2P** (fun, retro aesthetic), while actual labels forcibly use **Roboto** for a professional look.

---

## Features

1. **Local Storage** – Saves label data & border settings automatically.
2. **FormPanel** – Create/edit label data, toggle border settings, or confirm “Clear All.”
3. **Hoverable Cards** – Each label card shows Edit/Delete icons on desktop hover, always visible on mobile.
4. **Responsive Print** – `.paper-mock` is pinned in print mode; each label is real-size at 100% scale.
5. **No Additional APIs** – Purely client-side Next.js app.

---

## Technologies

- **Next.js** (React-based framework)
- **Chakra UI** (component library + theming)
- **TypeScript**
- **Local Storage** for data persistence
- **Google Fonts** (Press Start 2P & Roboto)

---

## Getting Started

1. **Clone** the repository:

   ```bash
   git clone https://github.com/Alpine-Oracle/slab-label-maker.git
   cd slab-label-maker
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn
   ```

3. **Run** in development mode:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Print Tip**: Select **Actual Size** (100% scale) and **No margins** in your print dialog to ensure precise label dimensions.

---

## Project Structure

```
.
├── components/
│   ├── dialogs/
│   │   └── ClearAllDialog.tsx      # Confirmation dialog for removing all labels
│   ├── forms/
│   │   ├── BorderSettingsPanel.tsx # Border color/size settings (context-based)
│   │   ├── FormPanel.tsx           # Main panel: label data, border settings, Clear All
│   │   └── LabelFieldsForm.tsx     # Input fields (year/set, card #, grade, etc.)
│   ├── labels/
│   │   ├── LabelCard.tsx           # Wrapper for each label w/ hover icons
│   │   ├── LabelsArea.tsx          # 8.5"x11" layout, hosting multiple label cards
│   │   └── PSALikeLabel.tsx        # Renders text for a single label (Roboto)
│   └── layout/
│       └── Header.tsx              # Nav bar (print button), hidden in print
├── context/
│   └── LabelContext.tsx            # Manages local storage for label data & border settings
├── pages/
│   ├── _app.tsx                    # ChakraProvider, LabelProvider, .no-print nav
│   ├── _document.tsx               # Loads Google Fonts (Press Start 2P & Roboto)
│   └── index.tsx                   # Main page, rendering FormPanel & LabelsArea
├── styles/
│   └── globals.css                 # @media print rules, hide everything but .paper-mock
├── theme/
│   └── index.ts                    # Chakra theme config (colors, fonts)
├── package.json
├── LICENSE
├── README.md
└── ...
```

---

## Printing & Margins

- **`.paper-mock`** is pinned at `(0,0)` in print mode via CSS.
- Print with **No margins** and **Scale=100%** for precise sizing (2.65" × 0.8").
- You can adjust the label size in **`PSALikeLabel.tsx`** if you prefer exactly 2.625" × 0.75" or a different dimension.

---

## Border Customization

- **BorderSettingsPanel** modifies a global border color/size in the LabelContext.
- If `borderSize=0`, effectively no border; otherwise, e.g. `2px solid #FF0000`.
- All labels are updated instantly to reflect the new border.

---

## Example Supplies

1. **Graded Slabs / Resealable Sleeves**

   - [Empty Slabs (Amazon.ca)](https://www.amazon.ca/Empty-Graded-Trading-Sports-Cards/dp/B0D37BHK81/)
     Empty slabs to apply your labels to.

2. **Full-Sheet Shipping Labels**
   - [LIKED Full Sheet Shipping Labels (Amazon.ca)](https://www.amazon.ca/LIKED-Full-Sheet-Shipping-Labelsfor-Printer-30/dp/B0CFY6CCR8/)
     Print your layout on a single sticker sheet, then cut out each label.

---

## Future Improvements

- **Multi-Page** printing if labels exceed one 8.5" × 11" sheet.
- **QR Codes / Barcodes** referencing your card data.
- **Drag & Drop** label reordering for custom page layout.
- **Cloud Sync** (Firebase or Supabase) for cross-device usage.

---

## Contributing

1. **Fork** the repo & create a branch for your feature or bugfix.
2. **Commit** with a descriptive message.
3. **Open a Pull Request**, referencing any associated issues.
4. We’ll review & merge changes that align with the project’s direction.

Feel free to open an **Issue** for questions or suggestions!

---

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## Dev Note

I originally built this as a quick solution for a friend’s request to generate PSA-like slab labels. It’s not part of a larger project, but I’m open-sourcing it so anyone can adapt it for their own card collections. As we discover more real-world usage tips, we’ll update this README.

_I may also explore **NFT integration** in the future, letting you reference or mint each slab label on-chain, tying a digital component to your physical collection._

_Signed by alpine_ — a small gift for card collectors seeking a custom label solution!

---

## Disclaimer

This project is **not affiliated** with PSA or any official grading service. Use at your own discretion for personal or hobbyist purposes.
