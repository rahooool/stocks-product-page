// Design system tokens — single source of truth for the app.
// Values mirror docs/mint-ds-groww-invest-v0.18.md (light mode).
// Usage rules live in docs/rules-groww-invest-v0.31.md.

import { useEffect, useReducer } from 'react';

export const lightColors = {
  // Background
  backgroundPrimary:        '#FFFFFF',
  backgroundSurface:        '#FFFFFF', // legacy alias for backgroundSurfaceZ1
  backgroundSurfaceZ1:      '#FFFFFF',
  backgroundSurfaceZ2:      '#F7F7F7',
  backgroundSecondary:      '#F7F7F7',
  backgroundTertiary:       '#EFF0F1',
  backgroundAccent:                 '#04B488',
  backgroundAccentSecondary:        '#5669FF',
  backgroundAccentSecondaryHover:   '#4D5FE4',
  backgroundNegative:               '#ED5533',
  backgroundPositive:               '#04B488',
  backgroundWarning:                '#E7A71E',
  backgroundAccentSubtle:           '#E9FAF3',
  backgroundAccentSecondarySubtle:  '#F2F5FF',
  backgroundPositiveSubtle:         '#E9FAF3',
  backgroundNegativeSubtle:         '#FFF1ED',
  backgroundWarningSubtle:          '#FFF7DE',
  backgroundDisabled:               '#F7F7F7',

  // Border
  borderPrimary:               '#E7E8E9',
  borderPrimaryOnSurfaceZ1:    '#E7E8E9',
  borderPrimaryOnSurfaceZ2:    '#E7E8E9',
  borderAccent:                '#04B488',
  borderPositive:              '#04B488',
  borderNegative:              '#ED5533',
  borderDisabled:              '#EFF0F1',
  borderNeutral:               '#353839',

  // Content
  contentPrimary:           '#353839',
  contentSecondary:         '#7F8283',
  contentTertiary:          '#898C8E',
  contentDisabled:          '#BABBBC',
  contentAccent:                    '#04B488',
  contentAccentSecondary:           '#5669FF',
  contentPositive:                  '#04B488',
  contentNegative:                  '#ED5533',
  contentWarning:                   '#E7A71E',
  contentOnColour:                  '#FFFFFF',
  contentOnAccentSubtle:            '#00825C',
  contentOnAccentSecondarySubtle:   '#212A63',
  contentOnPositiveSubtle:          '#00825C',
  contentOnNegativeSubtle:          '#D23A15',
  contentOnWarningSubtle:           '#A16B00',
  contentInversePrimary:            '#FFFFFF',

  // Data viz (used by chart widgets)
  dataVizMintGreen:  '#04B488',
  dataVizGrey:       '#808FA3',
  dataVizRed:        '#FF5E3B',
  dataVizBlue:       '#5669FF',
  dataVizYellow:     '#FCCE00',
  dataVizOrange:     '#F59817',
  dataVizMagenta:    '#C73A75',
  dataVizBrown:      '#9D615C',
  dataVizLilac:      '#7A7AC6',
  dataVizSkyBlue:    '#4DA4DD',
  dataVizOliveGreen: '#A1B55C',
} as const;

// Dark palette — derived from Mint DS dark-mode references in docs/mint-ds-groww-invest-v0.18.md.
// Surfaces use neutral steps 01–03; content is inverted; positive/negative kept on-brand
// with darker tinted "subtle" backgrounds.
export const darkColors: typeof lightColors = {
  backgroundPrimary:        '#101213',
  backgroundSurface:        '#16191B',
  backgroundSurfaceZ1:      '#16191B',
  backgroundSurfaceZ2:      '#1E2123',
  backgroundSecondary:      '#1E2123',
  backgroundTertiary:       '#2A2D2F',
  backgroundAccent:                 '#04B488',
  backgroundAccentSecondary:        '#5669FF',
  backgroundAccentSecondaryHover:   '#4D5FE4',
  backgroundNegative:               '#ED5533',
  backgroundPositive:               '#04B488',
  backgroundWarning:                '#E7A71E',
  backgroundAccentSubtle:           '#0E2A22',
  backgroundAccentSecondarySubtle:  '#1A1F3D',
  backgroundPositiveSubtle:         '#0E2A22',
  backgroundNegativeSubtle:         '#3A1A12',
  backgroundWarningSubtle:          '#3A2E10',
  backgroundDisabled:               '#1E2123',

  borderPrimary:               '#2A2D2F',
  borderPrimaryOnSurfaceZ1:    '#2A2D2F',
  borderPrimaryOnSurfaceZ2:    '#34383A',
  borderAccent:                '#04B488',
  borderPositive:              '#04B488',
  borderNegative:              '#ED5533',
  borderDisabled:              '#2A2D2F',
  borderNeutral:               '#E9E9EB',

  contentPrimary:           '#F1F2F3',
  contentSecondary:         '#9DA0A2',
  contentTertiary:          '#7C7E80',
  contentDisabled:          '#5A5C5E',
  contentAccent:                    '#04B488',
  contentAccentSecondary:           '#7E8CFF',
  contentPositive:                  '#04B488',
  contentNegative:                  '#FF7A5C',
  contentWarning:                   '#F0BB4D',
  contentOnColour:                  '#FFFFFF',
  contentOnAccentSubtle:            '#04B488',
  contentOnAccentSecondarySubtle:   '#A8B3FF',
  contentOnPositiveSubtle:          '#04B488',
  contentOnNegativeSubtle:          '#FF7A5C',
  contentOnWarningSubtle:           '#F0BB4D',
  contentInversePrimary:            '#101213',

  dataVizMintGreen:  '#04B488',
  dataVizGrey:       '#808FA3',
  dataVizRed:        '#FF5E3B',
  dataVizBlue:       '#5669FF',
  dataVizYellow:     '#FCCE00',
  dataVizOrange:     '#F59817',
  dataVizMagenta:    '#C73A75',
  dataVizBrown:      '#9D615C',
  dataVizLilac:      '#7A7AC6',
  dataVizSkyBlue:    '#4DA4DD',
  dataVizOliveGreen: '#A1B55C',
};

// `colors` is mutable — `setMode` rewrites it in place so all
// existing `import { colors }` references see the new palette.
export const colors: { -readonly [K in keyof typeof lightColors]: string } = { ...lightColors };

export type ThemeMode = 'light' | 'dark';
let _mode: ThemeMode = 'light';
const _subs = new Set<() => void>();

export function getMode(): ThemeMode { return _mode; }

export function setMode(mode: ThemeMode) {
  if (mode === _mode) return;
  _mode = mode;
  Object.assign(colors, mode === 'dark' ? darkColors : lightColors);
  _subs.forEach((fn) => fn());
}

export function useTheme() {
  const [, force] = useReducer((x: number) => x + 1, 0);
  useEffect(() => {
    _subs.add(force);
    return () => { _subs.delete(force); };
  }, []);
  return { mode: _mode, setMode, colors };
}

export const fonts = {
  regular:   'GrowwSans-Regular',
  medium:    'GrowwSans-Medium',
  bold:      'GrowwSans-Bold',
  light:     'GrowwSans-Light',
  sohne:     'Sohne-Kraftig',
  sohneBold: 'Sohne-Kraftig', // legacy alias — Sohne is 500-only per v0.31
} as const;

// Typography presets per v0.18 §852+ / stocks-PP src/theme/typography.ts.
// Spread these into a Text style. Always pair semantic colour with a *Heavy variant.
export const type = {
  bodyXsmallHeavy: { fontFamily: fonts.medium,  fontSize: 10, lineHeight: 12 },
  bodySmall:       { fontFamily: fonts.regular, fontSize: 12, lineHeight: 18 },
  bodySmallHeavy:  { fontFamily: fonts.medium,  fontSize: 12, lineHeight: 18 },
  bodyBase:        { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20 },
  bodyBaseHeavy:   { fontFamily: fonts.medium,  fontSize: 14, lineHeight: 20 },
  bodyLarge:       { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24 },
  bodyLargeHeavy:  { fontFamily: fonts.medium,  fontSize: 16, lineHeight: 24 },
  // Sohne weight reduced from 500 (Kraftig) to 400. We only have Sohne-Kraftig
  // bundled — on web browsers can faux-thin at fontWeight 400. For true 400
  // weight on native, drop a Sohne-Buch.otf into assets/fonts/ and re-register.
  headingEyebrow:  { fontFamily: fonts.sohne,   fontWeight: '400' as const, fontSize: 10, lineHeight: 12, letterSpacing: 2, textTransform: 'uppercase' as const },
  headingXxsmall:  { fontFamily: fonts.sohne,   fontWeight: '400' as const, fontSize: 12, lineHeight: 18 },
  headingXsmall:   { fontFamily: fonts.sohne,   fontWeight: '400' as const, fontSize: 14, lineHeight: 20 },
  headingSmall:    { fontFamily: fonts.sohne,   fontWeight: '400' as const, fontSize: 16, lineHeight: 24 },
  headingBase:     { fontFamily: fonts.sohne,   fontWeight: '400' as const, fontSize: 18, lineHeight: 28 },
  headingLarge:    { fontFamily: fonts.sohne,   fontWeight: '400' as const, fontSize: 20, lineHeight: 32 },
} as const;

// v0.31 spacing scale — only these values are allowed.
export const space = [2, 4, 6, 8, 12, 16, 20, 24, 32, 40] as const;
