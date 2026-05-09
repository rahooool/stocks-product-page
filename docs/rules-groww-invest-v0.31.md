# Mint Design System — Usage Rules · Groww Invest

> **Theme:** Groww Invest
> **Version:** v0.31
> **Type:** Usage Guidelines
> **Note:** This file changes independently of token definitions (design-system.md). Token values live there; how and when to use them lives here.


> **Downloaded:** 5 May, 2026

---

## Contents

1. [Colour Rules](#1-colour-rules)
2. [Typography Rules](#2-typography-rules)
3. [Surface & Layout Rules](#3-surface--layout-rules)
4. [Interaction & State Rules](#4-interaction--state-rules)
   - 4.1 Disabled state
   - 4.2 Pressed / tapped state
   - 4.3 Zero return
   - 4.4 Placeholder values
   - 4.5 Positive returns always semantic
5. [Component Specs](#5-component-specs)
   - 5.1 List Row Item
   - 5.2 Tab Component
   - 5.3 App Bar
   - 5.4 Bottom Navigation
   - 5.5 Buttons (→ 5.6)
6. [In-context Examples](#6-in-context-examples)
7. [Changelog](#7-changelog)

---

## 1. Colour Rules

### 1.1 Three-step framework

Every colour decision follows three steps in order.

**Step 1 — Identify the element type**

Every element falls into one of three categories:
- **Background** — surfaces, fills, containers
- **Border** — outlines, dividers, strokes
- **Content** — text, icons, any foreground element

**Step 2 — Identify the token family**

Token names are prefixed by element type:

| Element type | Token prefix | Examples |
|-------------|-------------|---------|
| Background | `background...` | `backgroundPrimary`, `backgroundAccent` |
| Content | `content...` | `contentPrimary`, `contentAccent` |
| Border | `border...` | `borderNegative`, `borderAccent` |

**Step 3 — Pick the token based on semantic role**

| Role | Background | Content | Border |
|------|-----------|---------|--------|
| **Accent** | `backgroundAccent`, `backgroundAccentSubtle` | `contentAccent` | `borderAccent` |
| **Positive** | `backgroundPositive`, `backgroundPositiveSubtle` | `contentPositive` | `borderPositive` |
| **Negative** | `backgroundNegative`, `backgroundNegativeSubtle` | `contentNegative` | `borderNegative` |
| **Warning** | `backgroundWarning`, `backgroundWarningSubtle` | `contentWarning` | `borderWarning` |
| **Disabled** | `backgroundDisabled` | `contentDisabled` | `borderDisabled` |
| **Neutral** | `backgroundPrimary`, `backgroundSurfaceZ1/Z2` | `contentPrimary`, `contentSecondary`, `contentTertiary` | `borderPrimary` |

---

### 1.2 Background tokens

Backgrounds come in three levels of visual emphasis. The most important design decision is: **does the user need to act on this, or is it informing them?**

> **Act → High emphasis. Inform → Subtle.**

#### Neutral backgrounds

Used for surfaces — the base canvas and elevated panels.

| Token | Use for |
|-------|---------|
| `backgroundPrimary` | Main app canvas — the lowest surface |
| `backgroundSurfaceZ1` | Cards, sheets, bottom drawers — one level above primary |
| `backgroundSurfaceZ2` | Nested cards, modals, popovers — two levels above primary |
| `backgroundSecondary` | Subtle alternate fills within a surface |
| `backgroundTertiary` | Further de-emphasised fills |

#### High emphasis backgrounds

Solid, saturated colours for maximum emphasis — primary buttons, critical alerts, destructive actions.

| Token | Semantic role |
|-------|--------------|
| `backgroundAccent` | Primary brand actions — Buy button, CTAs |
| `backgroundPositive` | Success states, positive confirmations |
| `backgroundNegative` | Destructive actions — Sell button, errors |
| `backgroundWarning` | Caution states |
| `backgroundAccentSecondary` | Secondary brand surfaces |
| `backgroundInversePrimary` | Inverted/dark surface on a light screen |

Always pair with `contentOnColour` or `contentOnColourInverse` for text legibility.

#### Subtle (low emphasis) backgrounds

Soft tints for contextual colour — banners, chips, inline alerts. The colour signals the nature of the message without demanding action.

| Token | Semantic role |
|-------|--------------|
| `backgroundAccentSubtle` | Soft brand highlight |
| `backgroundPositiveSubtle` | Soft success tint |
| `backgroundNegativeSubtle` | Soft error/loss tint |
| `backgroundWarningSubtle` | Soft warning tint |

Always pair with the matching `contentOn*Subtle` token.

#### When to use high emphasis vs subtle

| Scenario | Use | Example |
|----------|-----|---------|
| User must act on it | High emphasis | Buy button, Sell button, Confirm CTA |
| Message box / contextual banner needing slight emphasis | Subtle | "Order executed" toast, info banner, "SIP due" alert |
| Financial data — price change, profit, loss, return | Content colour only — no background | Gain %, loss amount, P/L value, return % |

```
Buy button      → backgroundAccent           (demands action)
"Order placed"  → backgroundPositiveSubtle   (message box — needs background emphasis)
+2.34% gain     → contentPositive only       (financial data — no background)
-₹200 loss      → contentNegative only       (financial data — no background)
Error banner    → backgroundNegativeSubtle   (inline message box, not a button)
Sell button     → backgroundNegative         (destructive action)
```

> **Financial data rule:** For price changes, profit, loss, returns, and any gain/loss indicator, use `contentPositive` or `contentNegative` on a transparent background. Do not wrap them in a `backgroundPositiveSubtle` or `backgroundNegativeSubtle` chip. The subtle background tokens are reserved for message boxes and contextual banners where a background tint is needed to create visual separation and meet accessibility requirements. Using them on financial data values creates unnecessary visual noise and misrepresents the token's intent.

---

### 1.3 Content tokens

#### Neutral content

| Token | Use for |
|-------|---------|
| `contentPrimary` | Primary text — stock names, key values, headings |
| `contentSecondary` | Supporting text — labels, subtitles, captions |
| `contentTertiary` | De-emphasised — category dividers, metadata, timestamps |

#### Semantic content

| Token | Use for |
|-------|---------|
| `contentAccent` | Brand-coloured text — CTAs, highlighted values |
| `contentPositive` | Gains, returns in profit, positive confirmations |
| `contentNegative` | Losses, errors, destructive actions |
| `contentWarning` | Caution labels |

**`contentPositive` and `contentNegative` are the primary way to communicate financial data.** For price changes, profit/loss values, return percentages, and any gain/loss indicator, apply these tokens directly to the text on a transparent background. Do not add a `backgroundPositiveSubtle` or `backgroundNegativeSubtle` fill behind financial values — that pattern is reserved for message boxes.

```
+₹2,004.50 (1D return)   → contentPositive, no background    ✓
+2.34%                    → contentPositive, no background    ✓
-₹200 (loss)             → contentNegative, no background    ✓
"Order executed" banner  → backgroundPositiveSubtle + contentOnPositiveSubtle  ✓
+₹2,004.50               → backgroundPositiveSubtle chip      ✗  (wrong — not a message)
```

**Semantic colour is always truthful.** `contentPositive` means positive regardless of context — do not downgrade it to `contentPrimary` because the screen is informational.

#### ContentOn — for high emphasis surfaces

| Token | Pair with |
|-------|----------|
| `contentOnColour` | All high emphasis backgrounds (backgroundAccent, backgroundPositive, backgroundNegative, backgroundWarning) |
| `contentOnColourInverse` | `backgroundInversePrimary` |

#### ContentOn — for subtle surfaces

| ContentOn token | Pairs with |
|----------------|-----------|
| `contentOnAccentSubtle` | `backgroundAccentSubtle` |
| `contentOnPositiveSubtle` | `backgroundPositiveSubtle` |
| `contentOnNegativeSubtle` | `backgroundNegativeSubtle` |
| `contentOnWarningSubtle` | `backgroundWarningSubtle` |

**Exclusivity rule:** `contentOn*Subtle` tokens are the *only* correct text colours for their matching subtle backgrounds. Do not substitute the base semantic token — it is not tuned for legibility on that surface.

| Subtle background | Correct text token | Never use |
|------------------|-------------------|-----------|
| `backgroundAccentSubtle` | `contentOnAccentSubtle` | `contentAccent` |
| `backgroundPositiveSubtle` | `contentOnPositiveSubtle` | `contentPositive` |
| `backgroundNegativeSubtle` | `contentOnNegativeSubtle` | `contentNegative` |
| `backgroundWarningSubtle` | `contentOnWarningSubtle` | `contentWarning` |

Never mix tokens across semantic roles. `contentOnPositiveSubtle` on `backgroundNegativeSubtle` is always wrong.

**`contentInversePrimary` for text on dark or inverted surfaces.** When text sits on a surface that uses `backgroundInversePrimary` (a dark card or overlay on a light screen), use `contentInversePrimary` — not `contentPrimary`, not `contentOnColour`.

```
Text on dark overlay card  →  contentInversePrimary   ✓
Text on dark overlay card  →  contentPrimary           ✗  (contentPrimary is for light surfaces)
```

**Never mix two different colour tokens within the same subtitle or same-level text.** If two elements are at the same hierarchy (both are sub-text, both are metadata, both are secondary labels in the same row), they must use the same colour token. The colour communicates hierarchy — mixing tokens at the same level creates false hierarchy.

```
"₹14,899 · Approve by 5PM"  →  both contentSecondary             ✓
"₹14,899 · Approve by 5PM"  →  ₹14,899 contentPrimary + Approve by 5PM contentSecondary  ✗
```

The only exception: if one of the values carries semantic meaning (gain = contentPositive, loss = contentNegative), it uses the semantic token while its paired label stays in contentSecondary.

---

### 1.4 Icon rendering — IconView component

**Every icon must be wrapped in the `mds-iconview` component.** Never render a bare icon outside this wrapper.

**Icons use the class-based approach.** The icon name goes as a CSS class (`hgi-{name}`), NOT as text content. The `hugeicons-min.css` stylesheet (linked in `<head>`) provides the `::before` rendering.

```html
<!-- CORRECT — class name on the <i> element -->
<span class="mds-iconview mds-iconview--medium" style="color: var(--contentPrimary);">
  <i class="hgi-stroke hgi-search-01"></i>
</span>

<!-- WRONG — text content does not render icons for this font -->
<i class="hgi hgi-stroke">search-01</i>
```

#### IconView sizes

| Size token | px | Common use |
|------------|-----|-----------|
| `xsmall` | 12px | Dense metadata, tiny supplementary icons |
| `small` | 16px | Inline with `body-small` text |
| `medium` | 20px | **Default** — list rows, app bar actions, standard UI |
| `large` | 24px | Prominent standalone icons, bottom nav |
| `xlarge` | 28px | Hero / feature icons |

#### HTML implementation

```html
<!-- Medium (default) — stroke icon -->
<span class="mds-iconview mds-iconview--medium">
  <i class="hgi-stroke hgi-arrow-right-01"></i>
</span>

<!-- Large — stroke icon -->
<span class="mds-iconview mds-iconview--large">
  <i class="hgi-stroke hgi-search-01"></i>
</span>

<!-- Small — solid (rare) -->
<span class="mds-iconview mds-iconview--small">
  <i class="hgi hgi-solid">check-circle</i>
</span>
```

Include this CSS in every prototype (already included in the CSS Starter Block in design-system.md):

```css
.mds-iconview {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: inherit; /* icon inherits parent colour token */
}
.mds-iconview .hgi { line-height: 1; color: inherit; }
.mds-iconview--xsmall  { width: 12px; height: 12px; font-size: 12px; }
.mds-iconview--small   { width: 16px; height: 16px; font-size: 16px; }
.mds-iconview--medium  { width: 20px; height: 20px; font-size: 20px; }
.mds-iconview--large   { width: 24px; height: 24px; font-size: 24px; }
.mds-iconview--xlarge  { width: 28px; height: 28px; font-size: 28px; }
```

#### Hugeicons variants

Icons use the **Hugeicons** font family. Two variants are available:

| Variant | Class | When to use |
|---------|-------|-------------|
| Stroke | `hgi-stroke` | **Default — 90% of all icons** |
| Solid | `hgi-solid` | Rare — order details, tracker UI, filled indicator states |

Always default to stroke. Only use solid when there is a deliberate design reason.

#### Icon colour

Set colour on the `mds-iconview` wrapper — the icon inherits it automatically.

| Context | Token |
|---------|-------|
| Icon adjacent to text | Match the text's colour token exactly |
| Icon in isolation (no adjacent text) | `contentPrimary` |
| Semantic icon (error, success, warning) | `contentNegative`, `contentPositive`, `contentWarning` |

```html
<!-- Icon matches adjacent contentSecondary text -->
<span class="mds-iconview mds-iconview--medium" style="color: var(--contentSecondary);">
  <i class="hgi-stroke hgi-arrow-right-01"></i>
</span>

<!-- Isolated navigation icon -->
<span class="mds-iconview mds-iconview--medium" style="color: var(--contentPrimary);">
  <i class="hgi-stroke hgi-arrow-left-01"></i>
</span>
```
- P/L row — trailing arrow → `contentPositive` or `contentNegative` (matches the value)
- Error state icon → `contentNegative`
- Standalone navigation icon → `contentPrimary`

---

### 1.5 On-surface token variants

When a component sits inside a raised surface, use the matching `OnSurface` variant — not the base token. This keeps borders and subtle fills visually distinct from the elevated surface beneath them.

| Base token | Use on SurfaceZ1 | Use on SurfaceZ2 |
|-----------|-----------------|-----------------|
| `backgroundSecondary` | `backgroundSecondaryOnSurfaceZ1` | `backgroundSecondaryOnSurfaceZ2` |
| `backgroundTertiary` | `backgroundTertiaryOnSurfaceZ1` | `backgroundTertiaryOnSurfaceZ2` |
| `backgroundAccentSubtle` | `backgroundAccentSubtleOnSurfaceZ1` | `backgroundAccentSubtleOnSurfaceZ2` |
| `backgroundPositiveSubtle` | `backgroundPositiveSubtleOnSurfaceZ1` | `backgroundPositiveSubtleOnSurfaceZ2` |
| `backgroundNegativeSubtle` | `backgroundNegativeSubtleOnSurfaceZ1` | `backgroundNegativeSubtleOnSurfaceZ2` |
| `backgroundWarningSubtle` | `backgroundWarningSubtleOnSurfaceZ1` | `backgroundWarningSubtleOnSurfaceZ2` |
| `backgroundDisabled` | `backgroundDisabledOnSurfaceZ1` | `backgroundDisabledOnSurfaceZ2` |
| `borderPrimary` | `borderPrimaryOnSurfaceZ1` | `borderPrimaryOnSurfaceZ2` |
| `borderDisabled` | `borderDisabledOnSurfaceZ1` | `borderDisabledOnSurfaceZ2` |

**Rule:** If a component is rendered on `backgroundSurfaceZ1`, use `OnSurfaceZ1` variants for all nested backgrounds and borders. If on `backgroundSurfaceZ2`, use `OnSurfaceZ2` variants.

Example: A holdings card uses `backgroundSurfaceZ1`. The divider between rows inside it uses `borderPrimaryOnSurfaceZ1`, not `borderPrimary`.

---

## 2. Typography Rules

### 2.1 Typefaces

Two typefaces, each with a non-negotiable role:

| Typeface | Role | Weight |
|----------|------|--------|
| **GrowwSans** | All body text, labels, supporting information, button labels | 400 (Regular), 500 (Medium/Heavy) |
| **Sohne** | Screen headers, section titles, tab labels, bottom nav labels, prices, P/L amounts, any numerical anchor | 500 only — never any other weight |

The distinction is not heading vs body — it is **structure + numbers vs content**. A stock price uses Sohne because it anchors the screen. A stock name in a list row uses GrowwSans because it is content.

#### Body scale (GrowwSans)

| Token | Size | Line height | Weight |
|-------|------|-------------|--------|
| `body-small` | 12px | 18px | 400 |
| `body-small-heavy` | 12px | 18px | 500 |
| `body-base` | 14px | 20px | 400 |
| `body-base-heavy` | 14px | 20px | 500 |
| `body-large` | 16px | 24px | 400 |
| `body-large-heavy` | 16px | 24px | 500 |

> `body-xsmall` (10px) is **not used** in Groww Invest. Do not use it for any element.

#### Heading scale (Sohne, weight 500)

| Token | Size | Line height | Notes |
|-------|------|-------------|-------|
| `heading-eyebrow` | 10px | 12px | 0.2em letter-spacing, always all-caps |
| `heading-xxsmall` | 12px | 18px | — |
| `heading-xsmall` | 14px | 20px | — |
| `heading-small` | 16px | 24px | — |
| `heading-base` | 18px | 28px | Default section header, screen anchor |
| `heading-large` | 20px | 32px | — |

---

### 2.2 Semantic colour + weight pairing

Whenever a semantic colour token is used on text, always pair it with a heavy weight token.

| Colour token | Required pairing |
|-------------|-----------------|
| `contentAccent` | `body-*-heavy` or any heading token |
| `contentPositive` | `body-*-heavy` or any heading token |
| `contentNegative` | `body-*-heavy` or any heading token |
| `contentWarning` | `body-*-heavy` or any heading token |
| `contentOnAccentSubtle` | `body-*-heavy` or any heading token |
| `contentOnPositiveSubtle` | `body-*-heavy` or any heading token |
| `contentOnNegativeSubtle` | `body-*-heavy` or any heading token |
| `contentOnWarningSubtle` | `body-*-heavy` or any heading token |
| `contentOnAccentSecondarySubtle` | `body-*-heavy` or any heading token |

Heading tokens (Sohne 500) are inherently heavy weight — they automatically satisfy this rule. No additional weight adjustment is needed.

```
contentPositive  +  body-base-heavy    ✓
contentNegative  +  body-base-heavy    ✓
contentAccent    +  body-small-heavy   ✓
contentPositive  +  heading-base       ✓  (heading is inherently 500)

contentPositive  +  body-base          ✗  (regular weight — not enough)
contentNegative  +  body-small         ✗
```

---

### 2.3 Heading tokens and colour

**Default:** Heading tokens use `contentPrimary`. The heading communicates hierarchy through size and typeface — colour is carried by a subordinate body-heavy element beside or below it.

**Exception — directional values at heading scale:** When a heading-token value inherently has a positive or negative meaning (a gain, a loss, a return), use `contentPositive` or `contentNegative` directly on the heading token. These cases are rare.

| Use case | Token | Colour |
|----------|-------|--------|
| Product page — stock name | `heading-base` or `heading-large` | `contentPrimary` |
| Product page — current price | `heading-base` or `heading-large` | `contentPrimary` |
| Holdings card — current value / amount | `heading-base` | `contentPrimary` |
| Holdings card — gain / loss | `heading-base` | `contentPositive` or `contentNegative` |
| Positions tab — P/L amount (stocks / F&O) | `heading-base` | `contentPositive` or `contentNegative` |
| Mutual fund page — returns (1Y / 3Y / 5Y) | `heading-base` | `contentPositive` or `contentNegative` |
| Section / screen title | `heading-base` | `contentPrimary` — always, no exceptions |

**Groww Invest screens have one level of section header — `heading-base`.** Do not introduce smaller heading tokens as sub-headers. To group content within a section, use `heading-eyebrow` + `contentTertiary` as a category label, not a smaller heading.

**One heading token per card, maximum.** A card has a single primary anchor value — the number the card exists to communicate. Only that value uses a heading token. All other values in the same card, however significant, use body tokens.

```
Portfolio summary card:
  ₹2,77,385.20   → heading-base   ✓  (primary anchor — the whole card is about this number)
  ₹2,62,788.35   → body-base-heavy ✓  (invested amount — supporting value)
  ₹14,596.85      → body-base-heavy ✓  (total returns — supporting value)
  +₹2,004.50      → body-base-heavy ✓  (1D return — supporting value)
  +18.42%         → body-base-heavy ✓  (XIRR — supporting value)

  ₹2,62,788.35   → heading-base    ✗  (only one anchor per card)
  ₹14,596.85      → heading-base    ✗
```

The heading token signals "this is the value this card exists to show you." Using it on secondary values dilutes that signal and makes the hierarchy unreadable.

**Heading and display tokens are never used in list items.** Every value in a list row — primary label, trailing value, sub-text — uses body tokens only. This applies even to large or prominent values like returns and P/L amounts inside rows.

```
List item trailing value  → body-base-heavy   ✓
List item trailing value  → heading-base       ✗  (never, regardless of value size)
List item trailing value  → display-small      ✗  (never)
```

**Heading and display tokens are never used in subtitles or supporting labels.** If text sits below a primary heading or acts as a descriptor/caption, it uses a body token — never a heading or display token.

```
"Portfolio XIRR: +14.2%"  → body-base or body-small   ✓  (it's a subtitle/descriptor)
"Portfolio XIRR: +14.2%"  → heading-xsmall             ✗  (subtitle, not a heading)
```

---

### 2.4 Special characters — ₹ and %

The ₹ symbol and % character inherit the **same font and weight token as the number they belong to**. They are part of the value, not labels.

| Context | Token |
|---------|-------|
| List row value (market price, amount) | `body-base-heavy` |
| Supporting label (change %) | `body-small-heavy` |
| Holdings card price or gain/loss | `heading-base` or `heading-large` |
| Product page current price | `heading-base` or `heading-large` |
| Order card amount | `heading-base` |

Never split the symbol from its number into different tokens.

### 2.5 Number formatting

**Always show exactly 2 decimal places** for all financial values — amounts, percentages, and prices.

```
+₹28,400.00   ✓       ₹8,200    ✗
+14.20%       ✓       +14.2%    ✗
-18.30%       ✓       -18.3%    ✗
₹2,384.50     ✓       ₹2,384.5  ✗
```

This applies everywhere — list rows, cards, headers, tooltips — with no exceptions. An AI generating financial data must always format values to 2 decimal places.

**Use Indian number formatting.** Commas follow the Indian numbering system — first comma after 3 digits, then every 2 digits.

```
₹1,208.45      ✓       ₹1208.45        ✗  (missing comma)
₹28,400.00     ✓       ₹28400.00       ✗
₹1,00,000.00   ✓       ₹100,000.00     ✗  (wrong — Western format)
₹12,34,567.00  ✓       ₹12,345,670.00  ✗
```

**Discovery/grid card prices use body tokens, not heading tokens.** Heading tokens are only for the primary anchor value on a dedicated product detail page. In grid cards (Most Traded, Top Movers, fund discovery cards), stock prices use `body-base-heavy` + `contentPrimary`.

```
Most Traded card — ₹1,208.45  →  body-base-heavy   ✓
Most Traded card — ₹1,208.45  →  heading-base       ✗  (this is a grid card, not a product page)
```

---

## 3. Surface & Layout Rules

### 3.1 Elevation — no shadows

The app uses no shadows anywhere — no drop shadows, elevation shadows, or box shadows on any surface. Elevation is communicated entirely through background colour stepping (`backgroundPrimary` → `backgroundSurfaceZ1` → `backgroundSurfaceZ2`) and the `OnSurface` token variants.

### 3.2 Surface backgrounds

**List rows directly on the canvas (`backgroundPrimary`):**
Row backgrounds are `backgroundTransparent`. The canvas shows through. Dividers use `borderPrimary`.

**List rows inside a card (`backgroundSurfaceZ1`):**
Row backgrounds are `backgroundTransparent`. Dividers use `borderPrimaryOnSurfaceZ1`.

**Card containers:**
Background → `backgroundSurfaceZ1`. Outer border → `borderPrimary`.

### 3.3 Border rule — depends on the surface

| Surface the component sits on | Border token |
|-------------------------------|-------------|
| `backgroundPrimary` (canvas) | `borderPrimary` |
| `backgroundSurfaceZ1` (card, sheet) | `borderPrimaryOnSurfaceZ1` |
| `backgroundSurfaceZ2` (modal, nested card) | `borderPrimaryOnSurfaceZ2` |

### 3.4 Card corner radius

Corner radius scales with card height:

| Card height | Corner radius | Examples |
|-------------|--------------|---------|
| ≥ 60px | **16px** | Holdings cards, position cards, fund cards |
| < 60px | **8px** | Chips, compact inline cards |

When unsure, default to 16px for anything with significant vertical space.

### 3.5 Spacing scale

All spacing in the app uses values from this scale. Do not use values outside this set.

`2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40` (px)

Standard screen horizontal padding: **16px**. This applies to all edges — left, right, and the right edge of header/app bar elements. Elements must never run flush to the screen edge.

**Let the UI breathe.** Never compress elements into a tight cluster to fit more content. If a row feels cramped, use more vertical padding or reduce content — do not reduce spacing below the minimum values from the scale.

**Structural UI elements must never be missing.** Every component has required parts — if a spec calls for an icon, a toggle, a logo, or a label, it must be present. Missing structural elements (e.g. an app bar with no icon, a card with a missing toggle, a list item with a missing leading icon) is always wrong. Do not omit elements because layout is tight.

---

## 4. Interaction & State Rules

### 4.1 Disabled state

Disabled elements use a token swap only. No opacity reduction.

```
Background  → backgroundDisabled
Label/icon  → contentDisabled
Border      → borderDisabled  (if the component has a border)
```

Never apply `alpha` / opacity on top of a disabled element. The token values already encode the correct visual weight.

### 4.2 Pressed / tapped state

When a tappable row or surface is pressed, apply the transparent pressed overlay token on top of the row background.

```
Row background (pressed) → backgroundTransparentPressed
```

Use the surface-matched variant depending on what the row sits on:

| Row sits on | Pressed token |
|-------------|--------------|
| `backgroundPrimary` (canvas) | `backgroundTransparentPressed` |
| `backgroundSurfaceZ1` (card) | `backgroundTransparentPressedOnSurfaceZ1` |
| `backgroundSurfaceZ2` (nested) | `backgroundTransparentPressedOnSurfaceZ2` |

### 4.3 Zero return

A return of exactly 0.00% is neutral — it carries no directional meaning.

```
0.00%  →  body-small-heavy  +  contentSecondary
```

Do not use `contentPositive` or `contentNegative` for a zero value.

### 4.4 Placeholder / unavailable values

When a value is not available, still loading, or not applicable, show a dash:

```
—  →  body-base  +  contentSecondary
```

Regular weight — it is not a real value and needs no emphasis.

### 4.5 Positive returns — always semantic

`contentPositive` is always used for a positive return, regardless of context. Even on a neutral discovery screen (e.g. a fund card showing "1Y return: +12%"), the colour reflects the nature of the data.

```
+12.4% on any screen  →  contentPositive  (not contentPrimary)
```

---

## 5. Component Specs

> **Never reinvent documented components.** If a component exists in the spec (button, list item, app bar, tab, etc.), always use the defined variant — never create a custom version. If none of the defined variants fits, use the closest match. Inventing new button styles, custom list layouts, or one-off navigation patterns breaks system consistency.

### 5.1 List Row Item

The most frequently used component in the app. Three structural types based on what leads the row.

#### Three types

| Type | Leading element | When to use |
|------|----------------|-------------|
| **Text list item** | None — text-only leading zone | Stock/ETF name rows, settings rows, plain content lists |
| **Icon list item** | 20×20px icon | Navigation rows, feature rows, rows that need a category icon |
| **Thumbnail list item** | Thumbnail — avatar, image, or contained icon | Fund rows, search results with images, profile-style rows |

All three types share the same token system, trailing content options, and sizing rules.

---

#### Anatomy

Four zones in every list item:

```
[ Leading graphic ] [ Label + Sub-text ] [ Trailing content ]
                    ←——— middle frame ———→
                         Divider (optional)
```

| Zone | Contents |
|------|---------|
| **Leading** | Icon (20×20px) or thumbnail — text-list-item has none |
| **Middle** | Primary label + optional sub-text, stacked |
| **Trailing** | Value labels, icon, button, icon-button, or none |
| **Divider** | Horizontal rule below the row; indented to align with label start |

---

#### Tokens

| Element | Typography | Colour |
|---------|-----------|--------|
| Primary label (leading) | `body-base-heavy` — GrowwSans 500, 14px/20px | `contentPrimary` always |
| Sub-text (leading, neutral) | `body-small` — GrowwSans 400, 12px/18px | `contentSecondary` |
| Sub-text (leading, coloured) | `body-small-heavy` — GrowwSans 500, 12px/18px | `contentPositive` / `contentNegative` / `contentAccent` |
| Trailing value (neutral) | `body-base-heavy` — GrowwSans 500, 14px/20px | `contentPrimary` |
| Trailing value (positive) | `body-base-heavy` — GrowwSans 500, 14px/20px | `contentPositive` |
| Trailing value (negative) | `body-base-heavy` — GrowwSans 500, 14px/20px | `contentNegative` |
| Trailing sub-label | `body-small` — GrowwSans 400, 12px/18px | `contentSecondary` |
| Trailing icon / chevron | — | `contentSecondary` |
| Background | — | `backgroundPrimary` |

Key rules:
- Primary label is **always** `body-base-heavy` + `contentPrimary`. Never regular weight, never a different colour.
- Trailing value is **always** medium weight (`body-base-heavy`) regardless of its colour.
- A coloured sub-text (gain %, loss label) escalates from `body-small` to `body-small-heavy`. Regular weight is not allowed with a semantic colour.
- The gap between primary label and sub-text is **2px**.

---

#### Spacing and padding

| Property | Value |
|----------|-------|
| Container padding (all sides) | 16px |
| Gap between leading icon/thumbnail and middle frame | 16px |
| Gap between primary label and sub-text | 2px |
| Leading icon size | 20×20px |

---

#### Heights by variant

Heights are determined by content + padding. Reference table for the most common combinations:

**Text list item and Icon list item**

| Size | Spacing | Sub-text | Height |
|------|---------|----------|--------|
| Default | Default | Yes | 72px |
| Default | Default | No | 64px |
| Default | Compact | Yes | 56px |
| Default | Compact | No | 48px |
| Large | Default | Yes | 76px |
| Large | Default | No | 64px |
| Large | Compact | Yes | 60px |
| Large | Compact | No | 48px |

**Thumbnail list item** (larger leading graphic increases minimum heights)

| Size | Spacing | Sub-text | Height |
|------|---------|----------|--------|
| Default | Default | Yes | 72px |
| Default | Default | No | 64px |
| Default | Compact | Yes | 64px |
| Default | Compact | No | 56px |
| Large | Default | Yes | 80px |
| Large | Default | No | 72px |
| Large | Compact | Yes | 72px |
| Large | Compact | No | 64px |

---

#### Trailing content options

| Trailing variant | What it shows | When to use |
|-----------------|---------------|-------------|
| `icon` | Single trailing icon (e.g. chevron) | Navigation rows |
| `labels` | Two stacked value labels (primary + secondary) | Value rows — prices, returns |
| `labels + icon` | Value labels + trailing icon | Value rows that are also tappable |
| `text-button` | Tertiary compact button | Inline CTA (e.g. "Add") |
| `button` | Small secondary button | Moderate-emphasis inline action |
| `icon-button` | Icon-only button | Secondary action icon |
| `none` | Nothing | Display-only row |

---

#### Divider

The divider is optional (`divider: boolean`). When shown, it is inset to align with the start of the label text — not flush with the screen edge.

| Type | Divider left indent |
|------|-------------------|
| Text list item | 16px (aligns with label start) |
| Icon list item | 52px (aligns after icon + gap: 16 + 20 + 16) |
| Thumbnail list item | Varies by thumbnail size |

Use `borderPrimary` on `backgroundPrimary`, or `borderPrimaryOnSurfaceZ1` if the list is inside a card.

---

#### Size and spacing guidance

**Default spacing is the standard.** Use it on all list items across the app unless there is a specific reason to compress.

- **Default size** — standard for most screens
- **Large size** — when the row needs more visual weight; use on hero or prominent lists
- **Default spacing** — standard 16px container padding. Use this everywhere by default.
- **Compact spacing** — tighter padding for dense data tables or secondary lists. Use sparingly — only when screen real estate is genuinely constrained.

---

### 5.2 Tab Component

| State | Typography | Colour |
|-------|-----------|--------|
| Active | `heading-small` (Sohne 500, 16px) | `contentPrimary` |
| Inactive | `heading-small` (Sohne 500, 16px) | `contentSecondary` |

Tab labels use Sohne even though they are body-sized — tabs are structural chrome, not content.

#### Active indicator

The active tab has an underline indicator with these properties:

| Property | Value |
|----------|-------|
| Colour | `borderNeutral` |
| Width | Matches the label text width exactly — not the full tab width |
| Top corners | Fully rounded (pill) |
| Bottom corners | 0px — flush against the tab bar's bottom border |

The indicator sits at the bottom edge of the tab bar, growing upward from the border. It never stretches to fill the full tab click zone.

---

### 5.3 App Bar

The top app bar is present on every screen. It consists of a **status bar** (24px) and the **navigation bar** (56px) — 80px total height.

Two distinct variants exist depending on the screen level: **L0 app bar** for root product screens, and the **standard app bar** for all other screens.

---

#### L0 App Bar — root product screens only

L0 screens are the home/root screens of each product tab (e.g. Holdings, Discover, Orders, Portfolio). They do not have a back button. The app bar on these screens uses the Groww logo + product name on the left, and three fixed action icons on the right.

**Left zone:**
- Groww logo image — 24×24px, sourced from `https://mint-design-system.vercel.app/logos/groww_invest.png`
- Product name text immediately to the right of the logo, with 8px gap
- Product name uses `heading-base` (Sohne 500, 18px) + `contentPrimary`

**Right zone — always these three actions, in this order (left to right):**
1. Search icon — `<i class="hgi-stroke hgi-search-01"></i>`, `contentPrimary`
2. QR code icon — `<i class="hgi-stroke hgi-qr-code"></i>`, `contentPrimary`
3. Profile avatar — circular image or initials avatar, 32×32px

```html
<!-- L0 App Bar example — Groww Invest Holdings screen -->
<div style="background: var(--backgroundPrimary); display: flex; align-items: center;
            padding: 0 8px; height: 56px; position: sticky; top: 24px;">
  <!-- Left: logo + product name -->
  <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
    <img src="https://mint-design-system.vercel.app/logos/groww_invest.png"
         style="width: 24px; height: 24px; object-fit: contain;" alt="Groww" />
    <span class="heading-base" style="color: var(--contentPrimary);">Invest</span>
  </div>
  <!-- Right: search, QR, avatar -->
  <div style="display: flex; align-items: center; gap: 4px;">
    <span class="mds-iconview mds-iconview--medium" style="color: var(--contentPrimary); width:40px; height:40px; justify-content:center;">
      <i class="hgi-stroke hgi-search-01"></i>
    </span>
    <span class="mds-iconview mds-iconview--medium" style="color: var(--contentPrimary); width:40px; height:40px; justify-content:center;">
      <i class="hgi-stroke hgi-qr-code"></i>
    </span>
    <div style="width:32px; height:32px; border-radius:50%; background:var(--backgroundTertiary);
                display:flex; align-items:center; justify-content:center;
                font-family:'GrowwSans',sans-serif; font-size:12px; font-weight:500;
                color:var(--contentSecondary); margin-left:4px;">U</div>
  </div>
</div>
```

---

#### Standard App Bar — all other screens

Used on all detail pages, flow screens, sheets opened as full screens, settings pages, etc.

##### Anatomy

| Zone | Contents |
|------|---------|
| Left | Navigation icon button — back, close, or hamburger |
| Centre | Page title (+ optional subtitle) |
| Right | Action icon buttons (up to 3), or a text / secondary button |

##### Dimensions

| Element | Value |
|---------|-------|
| Status bar height | 24px |
| Navigation bar height | 56px |
| Total component height | 80px |
| Icon touch target | 40×40px |
| Gap between action icons | 8px |
| Padding around nav / actions zones | 8px |

##### Tokens

| Element | Typography | Colour |
|---------|-----------|--------|
| Title (no subtitle) | `heading-base` — Sohne 500, 18px/28px | `contentPrimary` |
| Title (with subtitle) | `heading-small` — Sohne 500, 16px/24px | `contentPrimary` |
| Subtitle | `body-small` — GrowwSans 400, 12px/18px | `contentSecondary` |
| Navigation icon | — | `contentPrimary` |
| Action icons | — | `contentPrimary` |

Title text is single-line and truncates with ellipsis when too long — it never wraps.

#### Scroll state

| State | Background | Border |
|-------|-----------|--------|
| Not scrolled | `backgroundPrimary` | none |
| Scrolled | `backgroundSurfaceDocked` | divider (`borderPrimary`) at bottom |

The background switches to `backgroundSurfaceDocked` and a `borderPrimary` divider appears at the bottom edge once the user scrolls — this visually separates the sticky bar from the content beneath it.

#### Alignment

- **Left-aligned** (default) — title sits left, adjacent to the navigation icon. Most screens.
- **Centre-aligned** — title is centred. Use for modal-style screens or focused flows (e.g. order confirmation).

#### Action zone variants

| Variant | When to use |
|---------|------------|
| None | Purely navigational screen, no contextual actions |
| 1–3 icons | Standard contextual actions (search, filter, share, more) |
| 3+ (overflow) | More than 3 actions — third slot becomes an overflow/more icon |
| Text button | A single text-only CTA in the actions zone |
| Secondary button | A single outlined button in the actions zone |

---

### 5.4 Bottom Navigation

| Element | Typography | Colour |
|---------|-----------|--------|
| Labels | `heading-eyebrow` (Sohne 500, 10px, all-caps) | `contentAccentSecondary` (active) · `contentTertiary` (inactive) |
| Icons | — | `backgroundAccentSecondary` (active) · `contentTertiary` (inactive) |

Labels use **content** tokens. Icons use **background** tokens for their fill. These are different token families intentionally.

Active state: `contentAccentSecondary` for labels, `backgroundAccentSecondary` for icon fill.
Inactive state: `contentTertiary` for both labels and icons.

---

### 5.6 Buttons

Three variants — Primary, Secondary, Tertiary — each with sizes, states, and sub-variants. All button labels use **GrowwSans** (body tokens). Never Sohne.

#### Variants

| Variant | Background | Label | Border | When to use |
|---------|-----------|-------|--------|-------------|
| **Primary** | `backgroundAccent` | `contentOnColour` | none | Main CTA — Buy, Invest, Confirm |
| **Primary Negative** | `backgroundNegative` | `contentOnColour` | none | Destructive — Sell, Remove, Exit |
| **Secondary** | transparent | `contentPrimary` | `borderPrimary` | Secondary — Cancel, Skip, Back |
| **Secondary Accent** | `backgroundAccentSubtle` | `contentOnAccentSubtle` | `borderAccent` | Accent secondary — Know More, Compare |
| **Tertiary** | none | `contentPrimary` | none | Low priority — inline text actions |
| **Tertiary Accent** | none | `contentAccent` | none | Accent inline links — View All |

#### Sizes

| Size | Height | Label token | When to use |
|------|--------|-------------|-------------|
| **Large** | 48px | `body-large-heavy` | Full-width CTA at screen bottom — Buy, Sell |
| **Medium** | 40px | `body-base-heavy` | Default — most buttons |
| **Small** | 32px | `body-small-heavy` | Tight layouts — inline row actions |

Corner radius: **8px** on all sizes and variants.

#### States

| State | Token |
|-------|-------|
| **Enabled** | Variant tokens above |
| **Hover** | `backgroundAccentBaseHover` (primary) · `backgroundNegativeHover` (negative) |
| **Pressed** | `backgroundAccentBaseSelected` (primary) · `backgroundNegativePressed` (negative) |
| **Disabled** | `backgroundDisabled` · `contentDisabled` · `borderDisabled` (secondary only) |
| **Loading** | Spinner, background unchanged |

For Secondary and Tertiary, interaction fill comes from the transparent interaction tokens. Border and label colours remain unchanged on interaction.

Disabled is identical across all variants. Never apply opacity — token swap only.

#### Tertiary compact mode

Tertiary buttons support `isCompact=true` — removes container padding:

| Base size | Compact height |
|-----------|---------------|
| Small (32px) | 24px |
| Medium (40px) | 24px |
| Large (48px) | 32px |

Use compact tertiary for actions embedded inline within text or dense table cells.

#### Icons on buttons

- **Leading icon** (left of label): use when the icon enhances the meaning of the label and helps users understand the button's purpose at a glance (filter, add, upload)
- **Trailing icon** (right of label): use to indicate the result of the action — what happens after tapping (chevron for navigation within the app, external link icon for redirection outside the app)
- **Never combine leading and trailing icons** on the same button — it creates visual clutter and distracts from the button's purpose
- **Never use an icon as decoration** — placement must always support the button's purpose, not its layout aesthetics
- Icon colour always matches the label colour token

#### Button groups

**Horizontal layout** — when two buttons appear side by side:
- Primary button is positioned on the **right**
- Secondary button is on the left
- Do not truncate label text to force buttons to fit horizontally — if labels are long, switch to a vertical layout

**Vertical layout** — when two buttons are stacked:
- Primary button is always at the **top**
- Order (top to bottom): Primary → Secondary → Tertiary
- Use Secondary for sibling actions that have moderate emphasis (equal alternatives)
- Use Tertiary for dismissive or supplementary actions (Learn More, View Details, Skip)

```
Horizontal:   [ Secondary ]  [ Primary ]    ← primary on right
Vertical:     [ Primary           ]
              [ Secondary         ]          ← primary on top
              [ Tertiary          ]
```

#### Decision guide

```
Main action on the screen?               → Primary
Destructive action (sell, remove)?       → Primary Negative
Supporting action alongside primary?     → Secondary
Brand-positive secondary action?         → Secondary Accent
Low-priority or inline link?             → Tertiary
Accent-coloured inline link?             → Tertiary Accent
Full-width bottom CTA (buy/sell flow)?   → Large
Most buttons?                            → Medium (default)
Tight space or row-level action?         → Small
Inline within dense text or table?       → Tertiary Compact
```

#### Do / Don't

```
✓  One Primary per screen section maximum
✓  Pair Primary + Secondary for confirm/cancel
✓  Match icon colour to label colour — always
✓  GrowwSans for all button labels
✓  Primary (green) + Primary Negative (red) side by side is an accepted exception
   — this is the standard Buy / Sell pair on holdings and positions screens
✓  Always use one of the 6 defined variants — Primary, Primary Negative, Secondary,
   Secondary Accent, Tertiary, Tertiary Accent

✗  Never two Primary (same colour) buttons side by side
✗  Never Sohne on a button label
✗  Never add opacity to disabled — use disabled tokens only
✗  Never Primary Negative for a warning — that is backgroundWarning territory
✗  Never Tertiary where the user needs to notice the action
✗  Never invent a new button variant. If none of the 6 variants feel right, choose
   the closest existing one — do not create custom styles, custom borders, or custom
   colours outside the defined system. The 6 variants cover all valid use cases.
```

---

## 6. In-context Examples

Complete token specs — typography and colour — for common Groww Invest UI patterns.

**Position row (Buy card)**
- Card background → `backgroundSurfaceZ1`
- Stock name → `body-base-heavy` + `contentPrimary`
- "Avg price", "Mkt price" labels → `body-small` + `contentSecondary`
- Price values → `body-base-heavy` + `contentPrimary`
- Positive return % → `body-small-heavy` + `contentPositive`

**Holdings row (Groww Nifty 50 ETF)**
- Fund name → `body-base-heavy` + `contentPrimary`
- Chevron icon → `contentSecondary` (trailing icon colour)
- Sell button → `backgroundNegative` · label `contentOnColour` · `body-base-heavy`
- Buy button → `backgroundAccent` · label `contentOnColour` · `body-base-heavy`

**Stoploss form**
- "Stoploss (TSL)" label → `body-small` + `contentSecondary`
- Input value → `body-base` + `contentPrimary`
- "Est. loss -₹13,000" → `body-base-heavy` + `contentNegative`

**Primary button**
- Background → `backgroundAccent`
- Label → `body-base-heavy` + `contentOnColour` (medium size)

**Toast ("Buy order executed")**
- Background → `backgroundPositiveSubtle`
- Text → `body-base-heavy` + `contentOnPositiveSubtle`

---

## 7. Changelog

| Version | Date | Changes |
|---------|------|---------|
| `v0.31` | 04/05/2026 | Icon fix: class-based approach documented correctly; added never-reinvent-components rule; added button Do/Don't rule for inventing variants. |
| `v0.30` | 04/05/2026 | Added: Indian number formatting; body-base-heavy for grid card prices; contentInversePrimary; no colour mixing at same hierarchy; 16px edges; structural elements never missing. |
| `v0.29` | 04/05/2026 | Added 3 rules from user testing: heading/display tokens never in list items; heading/display tokens never in subtitles; always 2 decimal places. |
| `v0.28` | 04/05/2026 | Added L0 App Bar spec; split standard vs L0 app bar variants. |
| `v0.27` | 04/05/2026 | Replaced bare icon section with full IconView component spec — 5 sizes, HTML implementation, CSS, variants, colour rules. Rule: icons must always be inside mds-iconview. |
| `v0.26` | 04/05/2026 | Added Hugeicons icon rendering section; stroke-standard default, solid-standard for rare cases. |
| `v0.25` | 04/05/2026 | Financial data colour rule; backgroundPositiveSubtle/Negative reserved for message boxes only. |
| `v0.24` | 04/05/2026 | Added tab indicator spec; added one-heading-per-card rule. |
| `v0.23` | 04/05/2026 | Fixed duplicate section numbers; removed stub §5.2 Anchor Text; renumbered components to 5.2–5.6; fixed stray blank lines. |
| `v0.22` | 04/05/2026 | Added pressed state rule; clarified default spacing as standard. |
| `v0.21` | 04/05/2026 | Expanded List Row Item to full spec: 3 types, anatomy, corrected label token to body-base-heavy, height table, trailing content variants, divider indentation, size+spacing guidance. Fixed in-context examples. |
| `v0.20` | 04/05/2026 | Added App Bar spec — dimensions, tokens, scroll state, alignment, action zone variants. |
| `v0.19` | 04/05/2026 | Clarified list row 4px gap; documented Buy+Sell exception; enriched button icon guidance; added Button Groups section. |
| `v0.18` | 04/05/2026 | Full reorganisation — rules first (colour, typography, surface, states), then component specs, then examples, then changelog. Added typography scale tables. Merged "When to use Subtle vs High" into colour rules. Added spacing scale. Completed in-context examples with typography tokens. |
| `v0.17` | 04/05/2026 | Fixed bottom nav icon token to backgroundAccentSecondary; generalised heading+semantic colour exception; added holdings card colour distinction; removed incorrect backgroundSecondary pressed-state rule; added canvas/card surface background rules + border surface rule; added body-xsmall not used note; added heading weight auto-satisfies pairing rule; added no-subsections rule. |
| `v0.16` | 04/05/2026 | Corrected heading token colour rule — added exception for P/L on Positions tab (stocks/F&O). |
| `v0.15` | 04/05/2026 | Added ₹/% special character rule; fixed anchor token table; added Cards section; added Edge Cases section. |
| `v0.14` | 04/05/2026 | Added Buttons section: all variants, sizes, states, icon rules, usage guide, do/don't. |
| `v0.13` | 03/05/2026 | Fixed tab typography (heading-small); fixed tab active colour (contentPrimary); fixed bottom nav icon token; fixed heading always contentPrimary; added contentWarning to pairing table; added contentOn* exclusivity rule; added Icon Colour and On-Surface Token sections. |
| `v0.12` | 02/05/2026 | Added component rules: List Row Item, Anchor/Header, Tab, Bottom Navigation. |
| `v0.11` | 02/05/2026 | Added subtle vs high emphasis rule; typography pairing for semantic tokens. |
| `v0.10` | 02/05/2026 | Initial release. Three-step colour framework, background levels, content groups, contentOn pairing, in-context examples, typography pairing. |
