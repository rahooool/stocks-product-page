# Mint Core Foundations - Design System Rules

> **Source**: [Figma - Mint Core Foundations](https://www.figma.com/design/weB0C2FvodBnFKLeoQtrVL/%F0%9F%8C%B1-Mint-Core-Foundations)
> **Library**: `🌱 Mint Core Foundations`
> **Last synced**: 2026-03-26

---

## Table of Contents

1. [Overview](#overview)
2. [Primitive Colour Palette](#primitive-colour-palette)
3. [Token Architecture](#token-architecture)
4. [Colour Tokens](#colour-tokens)
   - [Content Tokens](#content-tokens)
   - [ContentOn Tokens](#contenton-tokens)
   - [Background Tokens](#background-tokens)
   - [Background Surface Tokens](#background-surface-tokens)
   - [Background Overlay Tokens](#background-overlay-tokens)
   - [Border Tokens](#border-tokens)
   - [OnSurface Tokens](#onsurface-tokens)
   - [Data Visualization Tokens](#data-visualization-tokens)
5. [Component Library Reference](#component-library-reference)
6. [Token Naming Convention](#token-naming-convention)
7. [Usage Rules](#usage-rules)
8. [Deprecated Tokens](#deprecated-tokens)

---

## Overview

Mint Core Foundations is the foundational design token library for the Mint product ecosystem. It provides semantic colour tokens organised into a structured variable collection called **`🟢 colour-tokens`**. All tokens in this library are `COLOR` type variables with `ALL_SCOPES` applied.

### Key Principles

- **Semantic naming**: Tokens describe *purpose* (e.g. `contentPrimary`), not *appearance* (e.g. not `grey900`).
- **Surface-aware**: Tokens adapt based on which surface layer (Z1 or Z2) they sit on.
- **Theme-ready**: The same token name resolves to different values in light and dark modes.
- **Hierarchical**: Tokens are grouped by their role — `content`, `background`, `border`, `contentOn`, etc.

---

## Primitive Colour Palette

Primitives V2.2 is the foundational colour palette. Semantic tokens reference these primitives by name (e.g. `green500`, `gray900`). The palette has 7 hues, each with 12 steps from lightest (01) to darkest (12). Step 02 is labelled **Subtle**, step 09 is **Base**, and step 11 is **Emphasis**.

> **IMPORTANT**: Never use primitive hex values directly in code. Always use the semantic token which references the primitive. Primitives are documented here so developers can verify correctness and debug theme issues.

### Green (Accent / Positive)

| Step | Name | Hex | Swatch |
|---|---|---|---|
| 01 | green50 | `#FAFEFC` | ![#FAFEFC](https://placehold.co/20x20/FAFEFC/FAFEFC) |
| 02 | green100 | `#E9FAF3` | ![#E9FAF3](https://placehold.co/20x20/E9FAF3/E9FAF3) |
| 03 | green150 | `#E0F8EE` | ![#E0F8EE](https://placehold.co/20x20/E0F8EE/E0F8EE) |
| 04 | green200 | `#CDF3E3` | ![#CDF3E3](https://placehold.co/20x20/CDF3E3/CDF3E3) |
| 05 | green300 | `#B7ECD6` | ![#B7ECD6](https://placehold.co/20x20/B7ECD6/B7ECD6) |
| 06 | green400 | `#9CE2C6` | ![#9CE2C6](https://placehold.co/20x20/9CE2C6/9CE2C6) |
| 07 | green450 | `#75D3B0` | ![#75D3B0](https://placehold.co/20x20/75D3B0/75D3B0) |
| 08 | green480 | `#24BF92` | ![#24BF92](https://placehold.co/20x20/24BF92/24BF92) |
| **09** | **green500** | **`#04B488`** | ![#04B488](https://placehold.co/20x20/04B488/04B488) |
| 10 | green600 | `#00A87D` | ![#00A87D](https://placehold.co/20x20/00A87D/00A87D) |
| 11 | green700 | `#00825C` | ![#00825C](https://placehold.co/20x20/00825C/00825C) |
| 12 | green900 | `#0D3D2E` | ![#0D3D2E](https://placehold.co/20x20/0D3D2E/0D3D2E) |

### Blue (Accent Secondary in some contexts)

| Step | Name | Hex | Swatch |
|---|---|---|---|
| 01 | blue50 | `#FDFDFE` | ![#FDFDFE](https://placehold.co/20x20/FDFDFE/FDFDFE) |
| 02 | blue100 | `#F2F5FF` | ![#F2F5FF](https://placehold.co/20x20/F2F5FF/F2F5FF) |
| 03 | blue150 | `#EDF2FF` | ![#EDF2FF](https://placehold.co/20x20/EDF2FF/EDF2FF) |
| 04 | blue200 | `#E0E9FF` | ![#E0E9FF](https://placehold.co/20x20/E0E9FF/E0E9FF) |
| 05 | blue300 | `#D1DEFF` | ![#D1DEFF](https://placehold.co/20x20/D1DEFF/D1DEFF) |
| 06 | blue400 | `#BFCFFF` | ![#BFCFFF](https://placehold.co/20x20/BFCFFF/BFCFFF) |
| 07 | blue450 | `#A9BCFF` | ![#A9BCFF](https://placehold.co/20x20/A9BCFF/A9BCFF) |
| 08 | blue480 | `#8BA1FB` | ![#8BA1FB](https://placehold.co/20x20/8BA1FB/8BA1FB) |
| **09** | **blue500** | **`#5669FF`** | ![#5669FF](https://placehold.co/20x20/5669FF/5669FF) |
| 10 | blue600 | `#4D5FE4` | ![#4D5FE4](https://placehold.co/20x20/4D5FE4/4D5FE4) |
| 11 | blue700 | `#4452D6` | ![#4452D6](https://placehold.co/20x20/4452D6/4452D6) |
| 12 | blue900 | `#212A63` | ![#212A63](https://placehold.co/20x20/212A63/212A63) |

### Purple (Accent Secondary)

| Step | Name | Hex | Swatch |
|---|---|---|---|
| 01 | purple50 | `#FCFCFF` | ![#FCFCFF](https://placehold.co/20x20/FCFCFF/FCFCFF) |
| 02 | purple100 | `#F0F4FF` | ![#F0F4FF](https://placehold.co/20x20/F0F4FF/F0F4FF) |
| 03 | purple150 | `#EEF0FD` | ![#EEF0FD](https://placehold.co/20x20/EEF0FD/EEF0FD) |
| 04 | purple200 | `#E4E8FC` | ![#E4E8FC](https://placehold.co/20x20/E4E8FC/E4E8FC) |
| 05 | purple250 | `#DADEF9` | ![#DADEF9](https://placehold.co/20x20/DADEF9/DADEF9) |
| 06 | purple300 | `#CED4F4` | ![#CED4F4](https://placehold.co/20x20/CED4F4/CED4F4) |
| 07 | purple400 | `#BEC5EE` | ![#BEC5EE](https://placehold.co/20x20/BEC5EE/BEC5EE) |
| 08 | purple450 | `#A6AFE5` | ![#A6AFE5](https://placehold.co/20x20/A6AFE5/A6AFE5) |
| **09** | **purple500** | **`#5E659A`** | ![#5E659A](https://placehold.co/20x20/5E659A/5E659A) |
| 10 | purple600 | `#51578B` | ![#51578B](https://placehold.co/20x20/51578B/51578B) |
| 11 | purple700 | `#5B6297` | ![#5B6297](https://placehold.co/20x20/5B6297/5B6297) |
| 12 | purple900 | `#252944` | ![#252944](https://placehold.co/20x20/252944/252944) |

### Yellow (Warning)

| Step | Name | Hex | Swatch |
|---|---|---|---|
| 01 | yellow50 | `#FEFDFB` | ![#FEFDFB](https://placehold.co/20x20/FEFDFB/FEFDFB) |
| 02 | yellow100 | `#FFF7DE` | ![#FFF7DE](https://placehold.co/20x20/FFF7DE/FFF7DE) |
| 03 | yellow150 | `#FFF1C3` | ![#FFF1C3](https://placehold.co/20x20/FFF1C3/FFF1C3) |
| 04 | yellow200 | `#FFE7AA` | ![#FFE7AA](https://placehold.co/20x20/FFE7AA/FFE7AA) |
| 05 | yellow300 | `#FFDC8B` | ![#FFDC8B](https://placehold.co/20x20/FFDC8B/FFDC8B) |
| 06 | yellow400 | `#FFCD65` | ![#FFCD65](https://placehold.co/20x20/FFCD65/FFCD65) |
| 07 | yellow450 | `#F5BC57` | ![#F5BC57](https://placehold.co/20x20/F5BC57/F5BC57) |
| 08 | yellow480 | `#E4A417` | ![#E4A417](https://placehold.co/20x20/E4A417/E4A417) |
| **09** | **yellow500** | **`#E7A71E`** | ![#E7A71E](https://placehold.co/20x20/E7A71E/E7A71E) |
| 10 | yellow600 | `#DB9C00` | ![#DB9C00](https://placehold.co/20x20/DB9C00/DB9C00) |
| 11 | yellow700 | `#A16B00` | ![#A16B00](https://placehold.co/20x20/A16B00/A16B00) |
| 12 | yellow900 | `#4A3819` | ![#4A3819](https://placehold.co/20x20/4A3819/4A3819) |

### Brown

| Step | Name | Hex | Swatch |
|---|---|---|---|
| 01 | brown50 | `#FEFDFB` | ![#FEFDFB](https://placehold.co/20x20/FEFDFB/FEFDFB) |
| 02 | brown100 | `#FEF5E3` | ![#FEF5E3](https://placehold.co/20x20/FEF5E3/FEF5E3) |
| 03 | brown150 | `#FEF1D6` | ![#FEF1D6](https://placehold.co/20x20/FEF1D6/FEF1D6) |
| 04 | brown200 | `#FBE8C1` | ![#FBE8C1](https://placehold.co/20x20/FBE8C1/FBE8C1) |
| 05 | brown300 | `#F6DEAB` | ![#F6DEAB](https://placehold.co/20x20/F6DEAB/F6DEAB) |
| 06 | brown400 | `#EAD19D` | ![#EAD19D](https://placehold.co/20x20/EAD19D/EAD19D) |
| 07 | brown450 | `#DBC28D` | ![#DBC28D](https://placehold.co/20x20/DBC28D/DBC28D) |
| 08 | brown480 | `#CAAB68` | ![#CAAB68](https://placehold.co/20x20/CAAB68/CAAB68) |
| **09** | **brown500** | **`#C7A865`** | ![#C7A865](https://placehold.co/20x20/C7A865/C7A865) |
| 10 | brown600 | `#C09C4A` | ![#C09C4A](https://placehold.co/20x20/C09C4A/C09C4A) |
| 11 | brown700 | `#856926` | ![#856926](https://placehold.co/20x20/856926/856926) |
| 12 | brown900 | `#3F3728` | ![#3F3728](https://placehold.co/20x20/3F3728/3F3728) |

### Red (Negative / Error)

| Step | Name | Hex | Swatch |
|---|---|---|---|
| 01 | red50 | `#FFFCFB` | ![#FFFCFB](https://placehold.co/20x20/FFFCFB/FFFCFB) |
| 02 | red100 | `#FFF1ED` | ![#FFF1ED](https://placehold.co/20x20/FFF1ED/FFF1ED) |
| 03 | red150 | `#FFEBE6` | ![#FFEBE6](https://placehold.co/20x20/FFEBE6/FFEBE6) |
| 04 | red200 | `#FFDACF` | ![#FFDACF](https://placehold.co/20x20/FFDACF/FFDACF) |
| 05 | red300 | `#FFCBBC` | ![#FFCBBC](https://placehold.co/20x20/FFCBBC/FFCBBC) |
| 06 | red400 | `#FFBBAB` | ![#FFBBAB](https://placehold.co/20x20/FFBBAB/FFBBAB) |
| 07 | red450 | `#F7A895` | ![#F7A895](https://placehold.co/20x20/F7A895/F7A895) |
| 08 | red480 | `#EE8E78` | ![#EE8E78](https://placehold.co/20x20/EE8E78/EE8E78) |
| **09** | **red500** | **`#ED5533`** | ![#ED5533](https://placehold.co/20x20/ED5533/ED5533) |
| 10 | red600 | `#DF4622` | ![#DF4622](https://placehold.co/20x20/DF4622/DF4622) |
| 11 | red700 | `#D23A15` | ![#D23A15](https://placehold.co/20x20/D23A15/D23A15) |
| 12 | red900 | `#5B291D` | ![#5B291D](https://placehold.co/20x20/5B291D/5B291D) |

### Gray (Neutral)

| Step | Name | Hex | Swatch |
|---|---|---|---|
| 01 | gray00 | `#FCFDFF` | ![#FCFDFF](https://placehold.co/20x20/FCFDFF/FCFDFF) |
| 02 | gray50 | `#F7F8FC` | ![#F7F8FC](https://placehold.co/20x20/F7F8FC/F7F8FC) |
| 03 | gray100 | `#EFF1FC` | ![#EFF1FC](https://placehold.co/20x20/EFF1FC/EFF1FC) |
| 04 | gray150 | `#E6E9F8` | ![#E6E9F8](https://placehold.co/20x20/E6E9F8/E6E9F8) |
| 05 | gray200 | `#DADEF2` | ![#DADEF2](https://placehold.co/20x20/DADEF2/DADEF2) |
| 06 | gray300 | `#CCD0E8` | ![#CCD0E8](https://placehold.co/20x20/CCD0E8/CCD0E8) |
| 07 | gray400 | `#B9BDDB` | ![#B9BDDB](https://placehold.co/20x20/B9BDDB/B9BDDB) |
| 08 | gray500 | `#A0A5C8` | ![#A0A5C8](https://placehold.co/20x20/A0A5C8/A0A5C8) |
| **09** | **gray700** | **`#44475B`** | ![#44475B](https://placehold.co/20x20/44475B/44475B) |
| 10 | gray900 | `#35374B` | ![#35374B](https://placehold.co/20x20/35374B/35374B) |
| 11 | gray800 | `#636888` | ![#636888](https://placehold.co/20x20/636888/636888) |
| 12 | gray950 | `#36394D` | ![#36394D](https://placehold.co/20x20/36394D/36394D) |

### Special Values

| Name | Value |
|---|---|
| white | `#FFFFFF` |
| black | `#000000` |

---

### Semantic Token → Primitive → Hex (Light Mode)

This is the **complete resolution chain** for the light theme. When implementing, use the semantic token name in code, but this table shows you exactly what colour it resolves to.

#### Foundations

| Semantic Token | Primitive | Hex |
|---|---|---|
| `backgroundPrimary` | white | `#FFFFFF` |
| `backgroundSecondary` | gray50 | `#F7F8FC` |
| `backgroundTertiary` | gray100 | `#EFF1FC` |
| `backgroundTransparent` | backgroundPrimary @ 0% opacity | `#FFFFFF00` |
| `backgroundSurfacePrimary` | white | `#FFFFFF` |
| `backgroundSurfaceSecondary` | gray50 | `#F7F8FC` |
| `backgroundOverlayPrimary` | black @ 70% opacity | `#000000B3` |
| `backgroundOverlaySecondary` | black @ 30% opacity | `#0000004D` |
| `backgroundInversePrimary` | gray900 | `#35374B` |
| `contentPrimary` | gray900 | `#35374B` |
| `contentSecondary` | gray700 | `#44475B` |
| `contentTertiary` | gray500 | `#A0A5C8` |
| `contentInversePrimary` | white | `#FFFFFF` |
| `contentInverseSecondary` | gray300 | `#CCD0E8` |
| `borderPrimary` | gray150 | `#E6E9F8` |

#### Extensions

| Semantic Token | Primitive | Hex |
|---|---|---|
| `backgroundAccent` | green500 | `#04B488` |
| `backgroundAccentSubtle` | green100 | `#E9FAF3` |
| `backgroundAccentSecondary` | purple500 | `#5E659A` |
| `backgroundAccentSecondarySubtle` | purple100 | `#F0F4FF` |
| `backgroundNegative` | red500 | `#ED5533` |
| `backgroundNegativeSubtle` | red100 | `#FFF1ED` |
| `backgroundWarning` | yellow500 | `#E7A71E` |
| `backgroundWarningSubtle` | yellow100 | `#FFF7DE` |
| `backgroundPositive` | green500 | `#04B488` |
| `backgroundPositiveSubtle` | green100 | `#E9FAF3` |
| `backgroundDisabled` | *(see onSurface)* | — |
| `backgroundAlwaysDark` | *(theme-invariant)* | — |
| `backgroundAlwaysLight` | *(theme-invariant)* | — |
| `contentAccent` | green500 | `#04B488` |
| `contentAccentSecondary` | purple500 | `#5E659A` |
| `contentAccentSecondarySubtle` | purple300 | `#CED4F4` |
| `contentNegative` | red500 | `#ED5533` |
| `contentWarning` | yellow500 | `#E7A71E` |
| `contentPositive` | green500 | `#04B488` |
| `contentDisabled` | gray400 | `#B9BDDB` |
| `contentOnColour` | white | `#FFFFFF` |
| `contentOnColourInverse` | gray900 | `#35374B` |
| `borderDisabled` | gray100 | `#EFF1FC` |
| `borderAccent` | green500 | `#04B488` |
| `borderPositive` | green500 | `#04B488` |
| `borderNegative` | red500 | `#ED5533` |
| `borderNeutral` | gray900 | `#35374B` |
| `borderWarning` | yellow500 | `#E7A71E` |

> **Note on `backgroundSurfaceZ1` / `backgroundSurfaceZ2`**: These map to `backgroundSurfacePrimary` (white) and `backgroundSurfaceSecondary` (gray50) respectively in the standard variable collection. The `backgroundSurfaceDocked` currently aliases to `backgroundSurfaceZ1`.

---

## Token Architecture

```
🟢 colour-tokens (Variable Collection)
├── content/           → Text & icon foreground colours (base hierarchy)
├── content++/         → Semantic & state foreground colours
├── contentOn/         → Foreground on coloured backgrounds
├── background/        → Primary page background
├── background++/      → Semantic & state background colours
├── backgroundSurface/ → Elevated surface backgrounds (Z-layers)
├── backgroundOverlay/ → Scrim / overlay backgrounds
├── border/            → Base border colours
├── border++/          → Semantic & state border colours
├── onSurface/         → Surface-context-aware overrides (Z1 / Z2)
│   ├── Z1/            → Tokens for use on backgroundSurfaceZ1
│   └── Z2/            → Tokens for use on backgroundSurfaceZ2
└── data-viz/          → Data visualization palette
    ├── border ✺/
    ├── content ✺/
    ├── background ✺/
    └── contentOn ✺/
```

> **Note on `++` groups**: The `++` suffix in group names (e.g. `content++/`, `background++/`) denotes the extended set of semantic and state tokens that supplement the base group. When implementing in code, drop the `++` — it is a Figma organizational convention only.

> **Note on `✺` suffix**: Tokens or groups marked with `✺` are newer additions or in draft status. They are safe to use but may receive refinements.

---

## Colour Tokens

### Content Tokens

Content tokens are used for **text, icons, and foreground elements**.

#### Base Content (`content/`)

These are the primary hierarchy tokens for text and icon foreground colours. Use these as your default choice.

| Token Name | Usage | When to Use |
|---|---|---|
| `content/contentPrimary` | Primary text, headings, high-emphasis labels | Default for body text, titles, and primary labels |
| `content/contentSecondary` | Secondary text, subheadings, descriptions | Supporting text, metadata, timestamps, subtitles |
| `content/contentTertiary` | Tertiary text, hints, placeholders | Placeholder text, helper text, least-emphasis labels |

**Decision rule**: Start with `contentPrimary`. Demote to `contentSecondary` or `contentTertiary` only to establish visual hierarchy — never for decorative reasons.

#### Extended Content (`content++/`)

These tokens convey **meaning** through colour — semantic states and special cases.

| Token Name | Usage | When to Use |
|---|---|---|
| `content++/contentAccent` | Brand/accent-coloured text or icons | Links, active states, brand emphasis, interactive text |
| `content++/contentAccentSecondary` | Secondary accent text or icons | Secondary brand expressions, less prominent accent elements |
| `content++/contentPositive` | Success/positive-state text or icons | Success messages, profit indicators, confirmation text |
| `content++/contentNegative` | Error/destructive-state text or icons | Error messages, loss indicators, destructive action labels |
| `content++/contentWarning` | Warning-state text or icons | Warning messages, caution indicators, attention-needed states |
| `content++/contentDisabled` | Disabled/inactive text or icons | Disabled buttons, inactive form labels, unavailable options |
| `content++/contentAlwaysDark`✺ | Always dark regardless of theme | Text that must stay dark in both light and dark themes |
| `content++/contentAlwaysLight`✺ | Always light regardless of theme | Text on permanently dark surfaces (e.g. image overlays) |

**Rules**:
- NEVER use `contentAccent` for error states — always use `contentNegative`.
- NEVER use `contentNegative` for non-error emphasis — use `contentAccent` instead.
- `contentDisabled` must only be used on elements that are truly non-interactive.
- `contentAlwaysDark` and `contentAlwaysLight` are theme-invariant — use sparingly, only when the surface behind them does not change with theme.

---

### ContentOn Tokens

ContentOn tokens are used for **foreground elements placed on coloured (non-neutral) backgrounds**. These ensure sufficient contrast on semantic background fills.

| Token Name | Usage | When to Use |
|---|---|---|
| `contentOn/contentOnColour` | Text/icons on any solid coloured background | Labels on accent, positive, negative, or warning fills |
| `contentOn/contentOnColourInverse` | Text/icons on inverse-coloured background | Text on inverse/contrasting coloured surfaces |
| `contentOn/contentOnAccentSubtle` | Text/icons on `backgroundAccentSubtle` | Labels inside subtle accent containers |
| `contentOn/contentOnWarningSubtle` | Text/icons on `backgroundWarningSubtle` | Labels inside subtle warning banners |
| `contentOn/contentOnPositiveSubtle` | Text/icons on `backgroundPositiveSubtle` | Labels inside subtle success banners |
| `contentOn/contentOnNegativeSubtle` | Text/icons on `backgroundNegativeSubtle` | Labels inside subtle error banners |
| `contentOn/contentOnAccentSecondarySubtle` | Text/icons on `backgroundAccentSecondarySubtle` | Labels inside subtle secondary accent containers |

**Rules**:
- ALWAYS pair `contentOn*` tokens with their corresponding `background*` tokens. Example: text on `backgroundAccentSubtle` MUST use `contentOnAccentSubtle`.
- NEVER use `contentPrimary` on coloured backgrounds — use the matching `contentOn` token.
- `contentOnColour` is for **solid** (full-strength) backgrounds; `contentOn*Subtle` tokens are for **subtle** (lighter/tinted) backgrounds.

**Pairing table**:

| Background | Required ContentOn |
|---|---|
| `backgroundAccent` | `contentOnColour` |
| `backgroundPositive` | `contentOnColour` |
| `backgroundNegative` | `contentOnColour` |
| `backgroundWarning` | `contentOnColour` |
| `backgroundAccentSubtle` | `contentOnAccentSubtle` |
| `backgroundPositiveSubtle` | `contentOnPositiveSubtle` |
| `backgroundNegativeSubtle` | `contentOnNegativeSubtle` |
| `backgroundWarningSubtle` | `contentOnWarningSubtle` |
| `backgroundAccentSecondarySubtle` | `contentOnAccentSecondarySubtle` |

---

### Background Tokens

Background tokens are used for **fills behind content** — page backgrounds, container fills, and semantic state fills.

#### Base Background (`background/`)

| Token Name | Usage | When to Use |
|---|---|---|
| `background/backgroundPrimary` | Primary page/screen background | Default page background, root container fill |

#### Extended Backgrounds (`background++/`)

**Semantic state fills** — Use these for containers, banners, badges, and regions that communicate state.

| Token Name | Usage | When to Use |
|---|---|---|
| `background++/backgroundAccent` | Solid accent fill | Primary CTA buttons, active tabs, brand-coloured containers |
| `background++/backgroundAccentSubtle` | Subtle accent tint | Accent info banners, selected row highlights, tag backgrounds |
| `background++/backgroundAccentSecondary` | Solid secondary accent fill | Secondary CTA buttons, secondary brand expressions |
| `background++/backgroundAccentSecondarySubtle` | Subtle secondary accent tint | Secondary info containers, light emphasis zones |
| `background++/backgroundPositive` | Solid success/positive fill | Success badges, confirmed-state buttons |
| `background++/backgroundPositiveSubtle` | Subtle positive tint | Success banners, profit-indicator backgrounds |
| `background++/backgroundNegative` | Solid error/destructive fill | Error badges, destructive-state buttons |
| `background++/backgroundNegativeSubtle` | Subtle negative tint | Error banners, loss-indicator backgrounds |
| `background++/backgroundWarning` | Solid warning fill | Warning badges |
| `background++/backgroundWarningSubtle` | Subtle warning tint | Warning banners, caution-indicator backgrounds |
| `background++/backgroundDisabled` | Disabled container fill | Disabled buttons, inactive toggles, locked inputs |
| `background++/backgroundAlwaysDark` | Always dark regardless of theme | Surfaces that must remain dark in all themes |
| `background++/backgroundAlwaysLight` | Always light regardless of theme | Surfaces that must remain light in all themes |

**Rules**:
- NEVER use raw hex or palette colours — always use the semantic token.
- When choosing between `Subtle` and solid variants: use **solid** for high-emphasis interactive elements (buttons, badges); use **subtle** for low-emphasis containers (banners, info bars, tag fills).
- `backgroundDisabled` must only be applied to elements that are non-interactive.

---

### Background Surface Tokens

Surface tokens define the **elevation layers** of the UI. This is a Z-axis layering system.

| Token Name | Usage | When to Use |
|---|---|---|
| `backgroundSurface/backgroundSurfaceZ1` | First elevated surface layer | Cards, sheets, modals sitting above the page background |
| `backgroundSurface/backgroundSurfaceZ2` | Second elevated surface layer | Elements elevated above Z1 (e.g. dropdowns on cards, nested sheets) |
| `backgroundSurface/backgroundSurfaceDocked`✺ | Docked/sticky surface | Bottom sheets, docked action bars, sticky footers |

**Elevation hierarchy**:
```
backgroundPrimary     → Page / screen base (Z0)
  └── backgroundSurfaceZ1  → Cards, sheets, modals (Z1)
       └── backgroundSurfaceZ2  → Dropdowns, nested elevations (Z2)

backgroundSurfaceDocked → Sticky/docked elements (independent)
```

**Rules**:
- NEVER place Z1 surfaces on top of Z2 surfaces — the hierarchy only goes up.
- When placing elements on a surface, use the corresponding `onSurface/Z*` tokens (see below).
- `backgroundSurfaceDocked` is currently aliased to `backgroundSurfaceZ1` but may diverge in future — always use the specific token.

---

### Background Overlay Tokens

Overlay tokens are for **scrims and dimming layers** placed over content.

| Token Name | Usage | When to Use |
|---|---|---|
| `backgroundOverlay/backgroundOverlayPrimary` | Primary overlay/scrim | Modal backdrops, full-screen dimming layers |
| `backgroundOverlay/backgroundOverlaySecondary` | Secondary overlay/scrim | Lighter scrims, partial-screen dimming |

**Rules**:
- Overlays MUST be placed above all other content on the Z-axis.
- Use `backgroundOverlayPrimary` for modals and blocking interactions.
- Use `backgroundOverlaySecondary` for non-blocking partial scrims.

---

### Border Tokens

Border tokens are used for **strokes, dividers, and outlines**.

#### Base Border (`border/`)

| Token Name | Usage | When to Use |
|---|---|---|
| `border/borderPrimary` | Default border/divider | Card outlines, input field borders, list dividers |

#### Extended Borders (`border++/`)

| Token Name | Usage | When to Use |
|---|---|---|
| `border++/borderAccent` | Accent-coloured border | Focused inputs, active selection borders, accent outlines |
| `border++/borderAccentSecondary` | Secondary accent border | Secondary focus states, secondary selection indicators |
| `border++/borderNeutral` | Neutral/subtle border | Subtle dividers, delineation lines, table borders |
| `border++/borderPositive` | Success-state border | Success input validation outlines, confirmed-state borders |
| `border++/borderNegative` | Error-state border | Error input validation outlines, destructive-state borders |
| `border++/borderWarning` | Warning-state border | Warning input validation outlines |
| `border++/borderDisabled` | Disabled border | Borders on disabled inputs, inactive toggles |

**Rules**:
- Input field default state: `borderPrimary`.
- Input field focused state: `borderAccent`.
- Input field error state: `borderNegative`.
- Input field success state: `borderPositive`.
- Input field disabled state: `borderDisabled`.
- For subtle separators/dividers, prefer `borderNeutral` over `borderPrimary`.

---

### OnSurface Tokens

OnSurface tokens are **context-aware overrides** that must be used when elements are placed on elevated surfaces (Z1 or Z2). These exist because background, border, and content tokens may need different values depending on the surface they sit on.

#### OnSurface Z1 (`onSurface/Z1/`)

Use these when the parent container uses `backgroundSurfaceZ1`.

**Backgrounds on Z1**:

| Token Name | Usage |
|---|---|
| `onSurface/Z1/background/backgroundSecondaryOnSurfaceZ1` | Secondary fill on Z1 cards |
| `onSurface/Z1/background/backgroundTertiaryOnSurfaceZ1` | Tertiary fill on Z1 cards |
| `onSurface/Z1/background/backgroundDisabledOnSurfaceZ1` | Disabled fill on Z1 surfaces |
| `onSurface/Z1/background/backgroundAccentSubtleOnSurfaceZ1` | Accent subtle fill on Z1 |
| `onSurface/Z1/background/backgroundWarningSubtleOnSurfaceZ1` | Warning subtle fill on Z1 |
| `onSurface/Z1/background/backgroundPositiveSubtleOnSurfaceZ1` | Positive subtle fill on Z1 |

**Borders on Z1**:

| Token Name | Usage |
|---|---|
| `onSurface/Z1/border/borderDisabledOnSurfaceZ1` | Disabled border on Z1 surfaces |

#### OnSurface Z2 (`onSurface/Z2/`)

Use these when the parent container uses `backgroundSurfaceZ2`.

**Backgrounds on Z2**:

| Token Name | Usage |
|---|---|
| `onSurface/Z2/background/backgroundSecondaryOnSurfaceZ2` | Secondary fill on Z2 surfaces |
| `onSurface/Z2/background/backgroundTertiaryOnSurfaceZ2` | Tertiary fill on Z2 surfaces |
| `onSurface/Z2/background/backgroundDisabledOnSurfaceZ2` | Disabled fill on Z2 surfaces |
| `onSurface/Z2/background/backgroundAccentSubtleOnSurfaceZ2` | Accent subtle fill on Z2 |
| `onSurface/Z2/background/backgroundWarningSubtleOnSurfaceZ2` | Warning subtle fill on Z2 |
| `onSurface/Z2/background/backgroundNegativeSubtleOnSurfaceZ2` | Negative subtle fill on Z2 |
| `onSurface/Z2/background/backgroundPositiveSubtleOnSurfaceZ2` | Positive subtle fill on Z2 |

**Borders on Z2**:

| Token Name | Usage |
|---|---|
| `onSurface/Z2/border/borderPrimaryOnSurfaceZ2` | Primary border on Z2 surfaces |
| `onSurface/Z2/border/borderDisabledOnSurfaceZ2` | Disabled border on Z2 surfaces |

**Rules**:
- ALWAYS check the parent surface before choosing a background, border, or content token.
- If the element sits on `backgroundSurfaceZ1` → use `onSurface/Z1/*` tokens.
- If the element sits on `backgroundSurfaceZ2` → use `onSurface/Z2/*` tokens.
- If the element sits on `backgroundPrimary` (page level) → use the standard tokens (no `onSurface` prefix).
- NEVER mix Z1 and Z2 tokens on the same surface.

**Decision flowchart**:
```
Where is the element placed?
├── On backgroundPrimary (page) → Use standard tokens
│     background++/backgroundAccentSubtle
│     border/borderPrimary
│
├── On backgroundSurfaceZ1 (card) → Use onSurface/Z1/ tokens
│     onSurface/Z1/background/backgroundAccentSubtleOnSurfaceZ1
│     onSurface/Z1/border/borderDisabledOnSurfaceZ1
│
└── On backgroundSurfaceZ2 (dropdown on card) → Use onSurface/Z2/ tokens
      onSurface/Z2/background/backgroundAccentSubtleOnSurfaceZ2
      onSurface/Z2/border/borderPrimaryOnSurfaceZ2
```

---

### Data Visualization Tokens

Data-viz tokens provide a **consistent, accessible palette** for charts, graphs, and data displays. All data-viz tokens are marked with `✺`.

#### Available Hues

| Hue | Border | Content | Background | ContentOn (Subtle) |
|---|---|---|---|---|
| **MintGreen** | `borderDataVizMintGreen` | `contentDataVizMintGreen` | `backgroundDataVizMintGreen` | `contentOnDataVizMintGreenSubtle` |
| **MintGreen Subtle** | `borderDataVizMintGreenSubtle` | `contentDataVizMintGreenSubtle` | `backgroundDataVizMintGreenSubtle` | — |
| **Red** | `borderDataVizRed` | `contentDataVizRed` | `backgroundDataVizRed` | `contentOnDataVizRedSubtle` |
| **Blue** | `borderDataVizBlue` | `contentDataVizBlue` | `backgroundDataVizBlue` | `contentOnDataVizBlueSubtle` |
| **Grey** | `borderDataVizGrey` | `contentDataVizGrey` | — | `contentOnDataVizGreySubtle` |
| **Brown** | `borderDataVizBrown` | `contentDataVizBrown` | — | `contentOnDataVizBrownSubtle` |
| **Lilac** | `borderDataVizLilac` | `contentDataVizLilac` | — | `contentOnDataVizLilacSubtle` |
| **Orange** | `borderDataVizOrange` | — | — | `contentOnDataVizOrangeSubtle` |
| **Yellow** | `borderDataVizYellow` | — | — | `contentOnDataVizYellowSubtle` |

> Full token paths follow the pattern: `data-viz/{role} ✺/{tokenName}`

**Rules**:
- Use MintGreen as the primary/default data-viz colour (brand-aligned).
- Use Red for negative/loss data series.
- NEVER use semantic tokens (`contentNegative`, `backgroundPositive`, etc.) for chart data — always use data-viz tokens.
- When filling chart segments, pair the `background` token with the corresponding `contentOn` token for labels.
- For chart borders/lines, use the `border` variants.
- For chart labels and legends, use the `content` variants.

---

## Component Library Reference

The Mint design system uses the following component libraries. Components follow the `mds-` prefix convention.

### Primary Library: `💠 Mint Core UI Components - Mobile`

| Component | Version | Android | RN | Description |
|---|---|---|---|---|
| `mds-icon-button/outline-icon-button` | V2.0.1 | ✅ | ✅ | Icon button with outline border |
| `mds-icon-button/only-icon-button` | V2.0.0 | ✅ | ✅ | Icon button without outline |
| `mds-list-item/text-list-item` | V1.0.0 | -- | -- | Text-only list item |
| `mds-list-item/icon-list-item` | V1.0.0 | -- | -- | List item with leading icon |
| `mds-list-item/thumbnail-list-item` | V1.0.0 | -- | -- | List item with thumbnail |
| `mds-list-item/radio-list-item` | V0.0.1 | -- | ✅ | Single-select list item |
| `mds-list-item/checkbox-list-item` | V0.0.1 | -- | ✅ | Multi-select list item |
| `mds-input-field/freeform-text-input` | V1.1.0 | -- | -- | Standard text input |
| `mds-input-field/search-input` | V1.0.1 | -- | -- | Search-specific input |
| `mds-top-app-bar/regular-app-bar` | V1.0.0 | ✅ | ✅ | Standard page header |
| `mds-top-app-bar/prominent-app-bar` | V1.0.0 | -- | -- | Large/prominent page header |
| `mds-section-block` | V0.0.1 | -- | -- | Section container block |
| `mds-data-row` | V0.0.1 | -- | -- | Data display row |

### Supporting Libraries

| Library | Purpose |
|---|---|
| `👾 Mint Icon library` | Icon assets (e.g. `mds_ic_huge_product_*`, `mds_ic_dll_*`) |
| `🎞️ Mint Illustrations Library` | Brand illustrations, logos (`mint_logo`, `mint_logomark`) |
| `✦ ✺ ✤ [Test] Mint Components Library` | Component-level theme tokens (e.g. button padding, border-radius) |
| `Mint Utilities` | Internal utilities and warnings |

---

## Token Naming Convention

### Pattern

```
{category}/{tokenName}
```

### Category Groups

| Prefix | Purpose | Example |
|---|---|---|
| `content` | Text/icon foreground | `content/contentPrimary` |
| `content++` | Semantic foreground states | `content++/contentNegative` |
| `contentOn` | Foreground on coloured fills | `contentOn/contentOnColour` |
| `background` | Page-level background | `background/backgroundPrimary` |
| `background++` | Semantic background states | `background++/backgroundAccentSubtle` |
| `backgroundSurface` | Elevation surface fills | `backgroundSurface/backgroundSurfaceZ1` |
| `backgroundOverlay` | Scrim/dimming layers | `backgroundOverlay/backgroundOverlayPrimary` |
| `border` | Base borders | `border/borderPrimary` |
| `border++` | Semantic border states | `border++/borderNegative` |
| `onSurface` | Surface-context overrides | `onSurface/Z1/background/...` |
| `data-viz` | Chart/graph colours | `data-viz/border ✺/borderDataVizRed` |

### Semantic Suffixes

| Suffix | Meaning |
|---|---|
| `Primary` | Highest emphasis / default |
| `Secondary` | Medium emphasis |
| `Tertiary` | Lowest emphasis |
| `Accent` | Brand / primary action colour |
| `AccentSecondary` | Secondary brand colour |
| `Positive` | Success / profit / confirmation |
| `Negative` | Error / loss / destructive |
| `Warning` | Caution / attention needed |
| `Disabled` | Non-interactive / locked |
| `Subtle` | Low-contrast / tinted variant |
| `AlwaysDark` | Theme-invariant dark |
| `AlwaysLight` | Theme-invariant light |
| `OnSurfaceZ1` / `OnSurfaceZ2` | Surface-context-specific variant |

---

## Usage Rules

### Rule 1: Always Use Semantic Tokens

```
// CORRECT
color: var(--content-primary);
backgroundColor: var(--background-accent-subtle);

// WRONG - never use raw hex values
color: #1A1A1A;
backgroundColor: #E8F5E9;
```

### Rule 2: Match ContentOn to Background

Every coloured background MUST have a paired `contentOn` token for any text or icons placed on it.

```
// CORRECT
<Banner bg={tokens.backgroundWarningSubtle}>
  <Text color={tokens.contentOnWarningSubtle}>Warning text</Text>
</Banner>

// WRONG - contentPrimary may not have enough contrast on coloured backgrounds
<Banner bg={tokens.backgroundWarningSubtle}>
  <Text color={tokens.contentPrimary}>Warning text</Text>
</Banner>
```

### Rule 3: Respect Surface Context

When building on elevated surfaces, use the appropriate `onSurface` token set.

```
// CORRECT — element inside a Z1 card
<Card bg={tokens.backgroundSurfaceZ1}>
  <Chip bg={tokens.backgroundSecondaryOnSurfaceZ1} />
</Card>

// WRONG — using page-level token inside an elevated card
<Card bg={tokens.backgroundSurfaceZ1}>
  <Chip bg={tokens.backgroundAccentSubtle} />
</Card>
```

### Rule 4: Solid vs. Subtle Decision

| Context | Use Solid | Use Subtle |
|---|---|---|
| Button/badge fill | `backgroundAccent` | -- |
| Banner/info bar | -- | `backgroundAccentSubtle` |
| Active tab indicator | `backgroundAccent` | -- |
| Tag/chip fill | -- | `backgroundAccentSubtle` |
| Error input outline | `borderNegative` | -- |
| Error banner background | -- | `backgroundNegativeSubtle` |

### Rule 5: Data Visualization Isolation

Data-viz tokens exist in their own namespace and MUST NOT be used for UI chrome. Similarly, UI semantic tokens (e.g. `contentPositive`, `backgroundNegative`) MUST NOT be used for chart data series.

### Rule 6: Hierarchy Is Not Optional

If a design shows three levels of text emphasis, use the three-tier content hierarchy:
1. `contentPrimary` — most important
2. `contentSecondary` — supporting
3. `contentTertiary` — least important

Do not skip levels (e.g. jumping from `contentPrimary` to `contentTertiary`) without a clear reason.

### Rule 7: Disabled State Consistency

When an element is disabled, apply disabled tokens across ALL properties:
- Text/icon → `contentDisabled`
- Background → `backgroundDisabled`
- Border → `borderDisabled`

Do not mix disabled tokens with active-state tokens.

---

## Deprecated Tokens

Tokens marked with `❌❌❌` and `_DEPRECATED` suffix are deprecated and MUST NOT be used. Examples:

- `data-viz/❌❌❌ content_DEPRECATED/--❌❌❌contentDataMintGreen_DEPRECATED`
- `data-viz/❌❌❌ background_DEPRECATED/--❌❌❌backgroundDataMintGreen_DEPRECATED`

Similarly, components prefixed with `!!` or `‼️` or `❌DEPRECATED` have newer versions available. Always use the latest version:

| Deprecated | Use Instead |
|---|---|
| `!! mds-icon-button___OLD` | `mds-icon-button/only-icon-button` or `mds-icon-button/outline-icon-button` |
| `!!mds-button-docked` | Latest docked button variant |
| `‼️ mds-list-item/*_OLD` | `mds-list-item/*` (without `_OLD` suffix) |
| `❌DEPRECATED___🧪 βeta-mds-list-item/default-list-item` | `mds-list-item/text-list-item` |

---

## Quick Reference: Complete Token Map

### Content (Foreground)

```
content/contentPrimary
content/contentSecondary
content/contentTertiary
content++/contentAccent
content++/contentAccentSecondary
content++/contentPositive
content++/contentNegative
content++/contentWarning
content++/contentDisabled
content++/contentAlwaysDark ✺
content++/contentAlwaysLight ✺
```

### ContentOn (Foreground on Colour)

```
contentOn/contentOnColour
contentOn/contentOnColourInverse
contentOn/contentOnAccentSubtle
contentOn/contentOnWarningSubtle
contentOn/contentOnPositiveSubtle
contentOn/contentOnNegativeSubtle
contentOn/contentOnAccentSecondarySubtle
```

### Background

```
background/backgroundPrimary
background++/backgroundAccent
background++/backgroundAccentSubtle
background++/backgroundAccentSecondary
background++/backgroundAccentSecondarySubtle
background++/backgroundPositive
background++/backgroundPositiveSubtle
background++/backgroundNegative
background++/backgroundNegativeSubtle
background++/backgroundWarning
background++/backgroundWarningSubtle
background++/backgroundDisabled
background++/backgroundAlwaysDark
background++/backgroundAlwaysLight
```

### Background Surface & Overlay

```
backgroundSurface/backgroundSurfaceZ1
backgroundSurface/backgroundSurfaceZ2
backgroundSurface/backgroundSurfaceDocked ✺
backgroundOverlay/backgroundOverlayPrimary
backgroundOverlay/backgroundOverlaySecondary
```

### Border

```
border/borderPrimary
border++/borderAccent
border++/borderAccentSecondary
border++/borderNeutral
border++/borderPositive
border++/borderNegative
border++/borderWarning
border++/borderDisabled
```

### OnSurface (Z1)

```
onSurface/Z1/background/backgroundSecondaryOnSurfaceZ1
onSurface/Z1/background/backgroundTertiaryOnSurfaceZ1
onSurface/Z1/background/backgroundDisabledOnSurfaceZ1
onSurface/Z1/background/backgroundAccentSubtleOnSurfaceZ1
onSurface/Z1/background/backgroundWarningSubtleOnSurfaceZ1
onSurface/Z1/background/backgroundPositiveSubtleOnSurfaceZ1
onSurface/Z1/border/borderDisabledOnSurfaceZ1
```

### OnSurface (Z2)

```
onSurface/Z2/background/backgroundSecondaryOnSurfaceZ2
onSurface/Z2/background/backgroundTertiaryOnSurfaceZ2
onSurface/Z2/background/backgroundDisabledOnSurfaceZ2
onSurface/Z2/background/backgroundAccentSubtleOnSurfaceZ2
onSurface/Z2/background/backgroundWarningSubtleOnSurfaceZ2
onSurface/Z2/background/backgroundNegativeSubtleOnSurfaceZ2
onSurface/Z2/background/backgroundPositiveSubtleOnSurfaceZ2
onSurface/Z2/border/borderPrimaryOnSurfaceZ2
onSurface/Z2/border/borderDisabledOnSurfaceZ2
```

### Data Visualization

```
data-viz/border ✺/borderDataVizMintGreen
data-viz/border ✺/borderDataVizMintGreenSubtle
data-viz/border ✺/borderDataVizRed
data-viz/border ✺/borderDataVizBlue
data-viz/border ✺/borderDataVizGrey
data-viz/border ✺/borderDataVizBrown
data-viz/border ✺/borderDataVizLilac
data-viz/border ✺/borderDataVizOrange
data-viz/border ✺/borderDataVizYellow
data-viz/content ✺/contentDataVizMintGreen
data-viz/content ✺/contentDataVizMintGreenSubtle
data-viz/content ✺/contentDataVizRed
data-viz/content ✺/contentDataVizBlue
data-viz/content ✺/contentDataVizGrey
data-viz/content ✺/contentDataVizBrown
data-viz/content ✺/contentDataVizLilac
data-viz/background ✺/backgroundDataVizMintGreen
data-viz/background ✺/backgroundDataVizMintGreenSubtle
data-viz/background ✺/backgroundDataVizRed
data-viz/background ✺/backgroundDataVizBlue
data-viz/contentOn ✺/contentOnDataVizMintGreenSubtle ✺
data-viz/contentOn ✺/contentOnDataVizRedSubtle ✺
data-viz/contentOn ✺/contentOnDataVizBlueSubtle ✺
data-viz/contentOn ✺/contentOnDataVizGreySubtle ✺
data-viz/contentOn ✺/contentOnDataVizBrownSubtle ✺
data-viz/contentOn ✺/contentOnDataVizLilacSubtle ✺
data-viz/contentOn ✺/contentOnDataVizOrangeSubtle ✺
data-viz/contentOn ✺/contentOnDataVizYellowSubtle ✺
```
