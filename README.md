# Slab Label Maker

Easily create, customize, and **print** PSA-like slab labels for **Pokémon**, **sports**, and other collectible cards.  
Built with **Next.js**, **Chakra UI** (with brand themes), and **TypeScript**, the Slab Label Maker offers **border customization**, **label size** configuration, local storage persistence, and a print-ready 8.5" × 11" layout for precise label dimensions.

---

## Live Demo & GitHub

- **Live Demo**: [slab-label-maker.vercel.app](https://slab-label-maker.vercel.app/)
- **GitHub**: [github.com/Alpine-Oracle/slab-label-maker](https://github.com/Alpine-Oracle/slab-label-maker)

Try the live site instantly, or clone the repo for local development.

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
  - [Brand Theming](#brand-theming)
  - [Border Customization](#border-customization)
  - [Import/Export Data](#importexport-data)
  - [Example Supplies](#example-supplies)
  - [Future Improvements](#future-improvements)
  - [Contributing](#contributing)
  - [License](#license)
  - [Dev Note](#dev-note)
  - [Disclaimer](#disclaimer)

---

## Overview

The **Slab Label Maker** allows you to:

- **Add/Edit** label data (year/set, card name, variation, card #, grade).
- **Configure** a global border color & thickness for a PSA-like appearance.
- **Adjust** the **label size** (default 2.65" × 0.8") via the **Label Size Settings** panel.
- **Print** an **8.5" × 11"** layout with real-size label cells—no PDF libraries needed; we rely on the browser’s **Print** dialog.
- **Persist** data in local storage—no external server or database.
- **Customize** the site’s overall appearance via multiple brand themes (Pokémon Red/Blue/Yellow, Baseball, Hockey).

Labels themselves forcibly use **Roboto** (font size locked at ~12px) to maintain a consistent and professional look, while the rest of the UI can be styled using your chosen brand theme.

---

## Features

1. **Local Storage** – Label data, border settings, **label size**, and theme preference are saved client-side.
2. **Print-Ready Layout** – `.paper-mock` is pinned for **accurate** printing at 100% scale.
3. **Brand Themes** – Choose from Pokémon Red/Blue/Yellow, Baseball, Hockey, or create your own.
4. **Label Size Customization** – Change the width/height in inches to accommodate different slab styles or custom label dimensions (via the `LabelSizeSettingsPanel`).
5. **Import/Export Data** – Transfer label data **(including label size and border settings)** between devices via JSON.
6. **No Third-Party APIs** – Purely client-side Next.js app.

---

## Technologies

- **Next.js** – React-based framework with server/client integration
- **Chakra UI** – Provides theming, brand color schemes, component library
- **TypeScript** – Strongly typed codebase
- **Local Storage** – Persists label data & settings
- **Google Fonts** – (Press Start 2P, Roboto, Bungee, Anton) loaded in `_document.tsx`

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
3. **Run** the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

> **Print Tip**:  
> In your print dialog, pick **No margins** and **Scale=100%** (Actual Size) for the correct label size. By default, we use **2.65" × 0.8"**, but you can customize this in the **Label Size Settings** panel.

---

## Project Structure

```
.
├── components/
│   ├── actions/
│   │   ├── ExportDataButton.tsx
│   │   ├── ImportDataButton.tsx
│   │   └── PrintButton.tsx
│   ├── dialogs/
│   │   └── ClearAllDialog.tsx
│   ├── forms/
│   │   ├── BorderSettingsPanel.tsx
│   │   ├── FormPanel.tsx
│   │   ├── LabelFieldsForm.tsx
│   │   └── LabelSizeSettingsPanel.tsx
│   ├── labels/
│   │   ├── LabelCard.tsx
│   │   ├── LabelsArea.tsx
│   │   └── PSALikeLabel.tsx
│   └── layout/
│       └── Header.tsx
├── context/
│   └── LabelContext.tsx
├── pages/
│   ├── _app.tsx           # ChakraProvider, LabelProvider, Theme logic
│   ├── _document.tsx      # Loads fonts (Press Start 2P, Roboto, Bungee, Anton)
│   └── index.tsx          # Main page with FormPanel & LabelsArea
├── styles/
│   └── globals.css        # @media print rules, base styling
├── theme/
│   ├── base.ts            # Base Chakra config (Press Start 2P, global overrides)
│   ├── index.ts           # Exports the ALL_BRAND_THEMES array
│   ├── ThemeSelector.tsx  # Menu to select brand theme
│   └── brands/
│       ├── brandBaseball.ts
│       ├── brandHockey.ts
│       ├── brandPokemonBlue.ts
│       ├── brandPokemonRed.ts
│       └── brandPokemonYellow.ts
├── package.json
├── LICENSE
└── README.md
```

---

## Printing & Margins

- **`.paper-mock`**: pinned for printing at 8.5" × 11".
- **No PDF libraries** – we rely on your browser’s **window.print()**.
- **No margins** and **Scale=100%** ensures accurate label dimensions.
- You can customize the label size via the **Label Size Settings** panel (default is 2.65" × 0.8").

---

## Brand Theming

You can pick from **Pokémon Red/Blue/Yellow**, **Baseball**, or **Hockey** brand themes. Each sets:

- **`colors.brand`** – The primary color scheme
- **`fonts`** – For headings/body (e.g., _Bungee_ for Baseball, _Anton_ for Hockey)
- Possibly **`styles.global`** for letterSpacing & lineHeight

**Switch Themes** in the UI using the **ThemeSelector** menu. Each brand theme inherits from `theme/base.ts`, preserving common styling (like Press Start 2P defaults).

> **Note**: Label text remains forcibly **Roboto** at `12px` for a PSA-like aesthetic, unaffected by brand themes.

---

## Border Customization

- **BorderSettingsPanel** & **FormPanel** let you set a global **border color** and **border size**.
- The **`LabelContext`** manages these settings and applies them to all labels (via `PSALikeLabel`).

---

## Import/Export Data

- **ExportDataButton** – Saves your labels, **border settings**, and **label dimensions** to a `.json` file.
- **ImportDataButton** – Reads a `.json` file and **overwrites** your current data (or you can modify it to merge). This includes restoring **border settings** and **label dimensions**.
- This ensures easy transfer of all label data across devices or for backups.

---

## Example Supplies

1. **Empty Slabs**:
   - [Amazon link – Graded Slabs](https://www.amazon.ca/Empty-Graded-Trading-Sports-Cards/dp/B0D37BHK81/)
     So you can place your printed labels inside.
2. **Full-Sheet Shipping Labels**:
   - [Amazon link – 8.5×11" Shipping Labels](https://www.amazon.ca/LIKED-Full-Sheet-Shipping-Labelsfor-Printer-30/dp/B0CFY6CCR8/)
     Print, then cut each label cell.

---

## Future Improvements

- **Multi-Page**: Support for more than one sheet.
- **Drag & Drop**: Reorder label positions on the sheet.
- **QR/Barcode**: Encode your label data for scans.

---

## Contributing

1. **Fork** the repo & create a feature or bugfix branch.
2. **Commit** with a descriptive message.
3. **Open a Pull Request**, referencing any relevant issues.
4. We’ll review & merge changes that align with the project’s direction.

Feel free to open an **Issue** for questions or suggestions!

---

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## Dev Note

Originally built for generating PSA-like slab labels as a quick solution, now open-sourced for anyone needing consistent, professional label printing. We’ll keep improving theming, label-size customization, and real-world usage tips.

_Signed by alpine_ — a small gift for card collectors seeking a **custom label solution** with easy printing, theming, and local data storage.

---

## Disclaimer

This project is **not affiliated** with PSA or any official grading service. Use at your own discretion for personal or hobbyist purposes.
