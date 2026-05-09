// Shared GR-1 bottom-sheet stack — used on the home (Explore) page and on
// individual stock product pages.
//
// Public surface:
//   - <GR1Icon />          trigger icon for the top bar
//   - useGR1Sheet()        state + handlers (open, close, mode transitions)
//   - <GR1Layer />          renders the white overlay + bottom sheet
//
// Behavior states (mode):
//   suggestions  → start sheet (initial 292px with 3 prompt suggestions)
//   composing    → 70% read-mode reached by tapping the input
//   thinking     → 70% read-mode after submission, awaiting first token
//   answering    → 70% read-mode streaming the answer
//   peek         → half-card scan mode (small floating chat card)
//
// Drag transitions:
//   start    → close
//   composing → start
//   thinking/answering → peek
//   peek      → close

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
  Platform,
  Keyboard,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';

// ─── Design tokens ───────────────────────────────────────────────────────────
import { colors, fonts as F, useTheme } from './tokens';
import MeshBackdrop from './MeshBackdrop';

// ─── GR-1 icon ────────────────────────────────────────────────────────────────
export function GR1Icon({ size = 24 }: { size?: number }) {
  const { mode } = useTheme();
  const stop = mode === 'dark' ? '#F2F5F7' : '#353839';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <LinearGradient id="gr1g0" x1="6.93061" y1="2.45583" x2="14.9828" y2="7.10476" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={stop} stopOpacity="0" />
          <Stop offset="1" stopColor={stop} />
        </LinearGradient>
        <LinearGradient id="gr1g1" x1="17.0505" y1="21.5486" x2="8.99829" y2="16.8997" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={stop} stopOpacity="0" />
          <Stop offset="1" stopColor={stop} />
        </LinearGradient>
        <LinearGradient id="gr1g2" x1="22.8001" y1="12.3856" x2="14.7479" y2="17.0345" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={stop} stopOpacity="0" />
          <Stop offset="1" stopColor={stop} />
        </LinearGradient>
        <LinearGradient id="gr1g3" x1="1.20403" y1="11.6079" x2="9.25623" y2="6.95896" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={stop} stopOpacity="0" />
          <Stop offset="1" stopColor={stop} />
        </LinearGradient>
        <LinearGradient id="gr1g4" x1="6.26452" y1="21.1495" x2="6.26452" y2="11.8517" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={stop} stopOpacity="0" />
          <Stop offset="1" stopColor={stop} />
        </LinearGradient>
        <LinearGradient id="gr1g5" x1="17.7324" y1="2.84683" x2="17.7324" y2="12.1447" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={stop} stopOpacity="0" />
          <Stop offset="1" stopColor={stop} />
        </LinearGradient>
      </Defs>
      <Path d="M15.6716 10.6584C15.6716 9.58528 15.4605 8.52269 15.0499 7.53124C14.6391 6.53959 14.0366 5.63823 13.2776 4.87927C12.5187 4.12037 11.6181 3.51779 10.6266 3.10705C9.6349 2.6963 8.57183 2.48524 7.49848 2.48524C7.05059 2.48524 6.6875 2.12215 6.6875 1.67426C6.6875 1.22637 7.05059 0.863281 7.49848 0.863281C8.78483 0.863281 10.059 1.11683 11.2474 1.60909C12.4357 2.10135 13.5158 2.82301 14.4253 3.73249C15.3348 4.64201 16.0565 5.72204 16.5487 6.91033C17.0409 8.09859 17.2936 9.37226 17.2936 10.6584C17.2936 11.1063 16.9305 11.4694 16.4826 11.4694C16.0349 11.4693 15.6716 11.1062 15.6716 10.6584Z" fill="url(#gr1g0)" />
      <Path d="M8.30946 13.3462C8.3095 14.4193 8.52065 15.4818 8.93127 16.4733C9.34202 17.4649 9.94451 18.3662 10.7034 19.1252C11.4624 19.8841 12.363 20.4867 13.3546 20.8975C14.3462 21.3082 15.4093 21.5193 16.4826 21.5193C16.9306 21.5193 17.2936 21.8824 17.2936 22.3303C17.2936 22.7781 16.9306 23.1412 16.4826 23.1412C15.1963 23.1412 13.922 22.8877 12.7336 22.3954C11.5454 21.9032 10.4653 21.1815 9.55579 20.272C8.64635 19.3624 7.92462 18.2825 7.43241 17.0942C6.94027 15.9059 6.68753 14.6322 6.6875 13.3462C6.6875 12.8982 7.05059 12.5352 7.49848 12.5352C7.94624 12.5353 8.30946 12.8983 8.30946 13.3462Z" fill="url(#gr1g1)" />
      <Path d="M11.3259 15.8542C12.2553 16.3908 13.2812 16.7392 14.3451 16.8793C15.4093 17.0194 16.491 16.9483 17.5279 16.6706C18.5646 16.3927 19.5366 15.9142 20.3881 15.2607C21.2397 14.6073 21.954 13.7922 22.4907 12.8627C22.7146 12.4748 23.2106 12.3419 23.5985 12.5658C23.9864 12.7898 24.1193 13.2858 23.8954 13.6737C23.2522 14.7877 22.3955 15.7644 21.375 16.5474C20.3545 17.3304 19.1895 17.905 17.9471 18.2379C16.7047 18.5707 15.4086 18.6557 14.1334 18.4879C12.8582 18.3199 11.6288 17.902 10.515 17.2589C10.1271 17.035 9.9942 16.539 10.2182 16.1511C10.4422 15.7634 10.9382 15.6304 11.3259 15.8542Z" fill="url(#gr1g2)" />
      <Path d="M12.6781 8.13922C11.7488 7.60269 10.723 7.25427 9.65908 7.11415C8.59491 6.97405 7.51307 7.04514 6.47629 7.32294C5.43961 7.60075 4.46746 8.07938 3.61598 8.73273C2.76444 9.38615 2.05012 10.2013 1.51345 11.1308C1.2895 11.5187 0.793508 11.6516 0.405625 11.4277C0.0177394 11.2037 -0.11516 10.7077 0.108786 10.3198C0.751961 9.20582 1.60864 8.22911 2.62916 7.44603C3.6496 6.66309 4.81463 6.08852 6.057 5.75563C7.29938 5.42279 8.59559 5.33776 9.87079 5.50564C11.1459 5.67356 12.3753 6.09153 13.4891 6.73456C13.8771 6.95852 14.01 7.4545 13.786 7.84238C13.562 8.23009 13.066 8.36313 12.6781 8.13922Z" fill="url(#gr1g3)" />
      <Path d="M8.99765 9.47829C8.06831 10.0149 7.25367 10.729 6.60035 11.5803C5.94694 12.4319 5.46759 13.4044 5.18978 14.4411C4.91203 15.4779 4.84046 16.5591 4.98054 17.6231C5.12064 18.6873 5.46939 19.7134 6.00606 20.6431C6.23001 21.0309 6.09711 21.5269 5.70922 21.7508C5.32134 21.9748 4.82536 21.8419 4.60141 21.4541C3.95824 20.34 3.54071 19.1098 3.37282 17.8344C3.20499 16.5592 3.28991 15.2629 3.6228 14.0206C3.95575 12.7782 4.53021 11.6132 5.3132 10.5928C6.09619 9.57244 7.07286 8.71673 8.18667 8.07363C8.57455 7.84969 9.07054 7.98258 9.29449 8.37047C9.51824 8.75832 9.38545 9.25439 8.99765 9.47829Z" fill="url(#gr1g4)" />
      <Path d="M14.9992 14.5181C15.9286 13.9814 16.7433 13.2673 17.3966 12.416C18.05 11.5644 18.5293 10.592 18.8071 9.55521C19.0849 8.51852 19.1564 7.43729 19.0164 6.37321C18.8763 5.30904 18.5276 4.28287 17.9909 3.35332C17.7669 2.96543 17.8998 2.46945 18.2876 2.2455C18.6756 2.02156 19.1715 2.15446 19.3955 2.54235C20.0386 3.65635 20.4562 4.8866 20.6241 6.16195C20.792 7.43715 20.707 8.73338 20.3741 9.97575C20.0412 11.2181 19.4667 12.3832 18.6837 13.4036C17.9007 14.4239 16.9241 15.2797 15.8102 15.9227C15.4223 16.1467 14.9264 16.0138 14.7024 15.6258C14.4787 15.238 14.6114 14.742 14.9992 14.5181Z" fill="url(#gr1g5)" />
    </Svg>
  );
}

// ─── Ambient pastel glow ──────────────────────────────────────────────────────
// Web uses boxShadow; native renders <GR1Glow /> with absolute negative insets.
// DS deviation (approved): the ambient glow is core to the GR-1 visual language
// and is intentionally exempt from v0.31 §3.1's flat-elevation rule.
const GR1_GLOW_SHADOW = Platform.OS === 'web' ? ({
  boxShadow: [
    '-40px 10px 100px 30px rgba(192,200,255,0.30)',
    '0px   12px  90px 20px rgba(188,234,255,0.24)',
    '40px  10px 100px 30px rgba(156,227,208,0.30)',
  ].join(', '),
} as any) : {};

const GR1_GLOW_OUTSET = 80;

function GR1Glow() {
  if (Platform.OS === 'web') return null;
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: -GR1_GLOW_OUTSET,
        left: -GR1_GLOW_OUTSET,
        right: -GR1_GLOW_OUTSET,
        bottom: -GR1_GLOW_OUTSET,
      }}
    >
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient id="gr1GlowL" cx="20%" cy="55%" rx="55%" ry="55%" fx="20%" fy="55%">
            <Stop offset="0%" stopColor="rgb(192,200,255)" stopOpacity="0.55" />
            <Stop offset="100%" stopColor="rgb(192,200,255)" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="gr1GlowC" cx="50%" cy="55%" rx="55%" ry="55%" fx="50%" fy="55%">
            <Stop offset="0%" stopColor="rgb(188,234,255)" stopOpacity="0.45" />
            <Stop offset="100%" stopColor="rgb(188,234,255)" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="gr1GlowR" cx="80%" cy="55%" rx="55%" ry="55%" fx="80%" fy="55%">
            <Stop offset="0%" stopColor="rgb(156,227,208)" stopOpacity="0.55" />
            <Stop offset="100%" stopColor="rgb(156,227,208)" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gr1GlowL)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gr1GlowC)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gr1GlowR)" />
      </Svg>
    </View>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function ThinkingIndicator() {
  const pulseAnim = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1,   duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Animated.View style={{ opacity: pulseAnim }}><GR1Icon size={16} /></Animated.View>
      <Animated.Text style={{ fontFamily: F.regular, fontSize: 14, lineHeight: 20,
        color: colors.contentSecondary, opacity: pulseAnim }}>
        Thinking...
      </Animated.Text>
    </View>
  );
}

function ArrowTurnForwardIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M4 13C4 13 4 8 9 8H15M15 8L12 5M15 8L12 11"
        stroke={colors.contentSecondary} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function SendIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M8 12V4M8 4L5 7M8 4L11 7"
        stroke={colors.contentSecondary} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ─── Default suggestions and answer corpus ────────────────────────────────────
const DEFAULT_SUGGESTIONS = [
  'Why has SBI gone down 5% today?',
  'HFCL is most traded Intraday and today',
  'Break down the latest quarterly results',
];

const DEFAULT_ANSWERS: Record<string, string> = {
  'Why has SBI gone down 5% today?':
    'SBI dropped 5% today following weaker-than-expected Q4 results. Net interest margins compressed to 3.1% vs 3.3% estimated, and management guided for elevated credit costs through FY26 due to rising agricultural NPAs. FII selling in PSU banks added further pressure — ₹2,400 Cr in net sector outflows today.',
  'HFCL is most traded Intraday and today':
    'HFCL surged 8.2% on 4× its 30-day average volume today. The trigger: a ₹1,450 Cr fibre cable order from BSNL — the largest order in its history. With BharatNet Phase III accelerating, HFCL is a key beneficiary. Watch resistance at ₹92; a clean breakout opens up ₹105.',
  'Break down the latest quarterly results':
    'Nifty50 Q4 aggregate earnings grew 12% YoY, beating estimates by ~3%. BFSI led with 18% profit growth. IT disappointed — TCS and Infosys guided cautiously on discretionary spending. Consumer staples beat on rural volume recovery. Top beats: Maruti (+22%), M&M (+19%). Misses: Wipro and HCL Tech on margin compression.',
};

const DEFAULT_FALLBACK = 'Based on current market conditions, this reflects broader sector dynamics and specific company fundamentals. Monitor key support levels and institutional activity over the next few sessions.';

// ─── Sheet component ──────────────────────────────────────────────────────────
type GR1Mode = 'suggestions' | 'composing' | 'thinking' | 'answering' | 'peek';

interface GR1BottomSheetProps {
  anim: Animated.Value;
  expandAnim: Animated.Value;
  mode: GR1Mode;
  prompt: string;
  answer: string;
  suggestions: readonly string[];
  onClose: () => void;
  onSuggestionTap: (text: string) => void;
  onToPeek: () => void;
  onToStart: () => void;
  onReExpand: () => void;
  onExpand: () => void;
  onSubmit: (text: string) => void;
}

function GR1BottomSheet({
  anim, expandAnim, mode, prompt, answer, suggestions,
  onClose, onSuggestionTap, onToPeek, onToStart, onReExpand, onExpand, onSubmit,
}: GR1BottomSheetProps) {
  const inputRef = useRef<TextInput>(null);
  const prevModeRef = useRef<GR1Mode>(mode);
  useEffect(() => {
    const wasPeek = prevModeRef.current === 'peek';
    const enteredComposing = prevModeRef.current === 'suggestions' && mode === 'composing';
    if ((wasPeek && mode !== 'peek') || enteredComposing) {
      const t = setTimeout(() => { inputRef.current?.focus(); }, 120);
      prevModeRef.current = mode;
      return () => clearTimeout(t);
    }
    prevModeRef.current = mode;
  }, [mode]);

  // Keyboard avoidance
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (Platform.OS === 'web') {
      const vv = (typeof window !== 'undefined') ? (window as any).visualViewport : null;
      if (!vv) return;
      let baseline = vv.height;
      const onResize = () => {
        if (vv.height > baseline) baseline = vv.height;
        const kb = Math.max(0, baseline - vv.height - (vv.offsetTop || 0));
        Animated.timing(keyboardOffset, {
          toValue: kb,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }).start();
      };
      vv.addEventListener('resize', onResize);
      vv.addEventListener('scroll', onResize);
      return () => {
        vv.removeEventListener('resize', onResize);
        vv.removeEventListener('scroll', onResize);
      };
    }

    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSub = Keyboard.addListener(showEvt, (e: any) => {
      Animated.timing(keyboardOffset, {
        toValue: e.endCoordinates?.height ?? 0,
        duration: e.duration ?? 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener(hideEvt, (e: any) => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: e.duration ?? 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardOffset]);

  const peekDragY = useRef(new Animated.Value(0)).current;
  const peekPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 4,
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) peekDragY.setValue(dy);
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy < 5) {
          onReExpand();
        } else if (dy > 80 || vy > 0.6) {
          Animated.timing(peekDragY, {
            toValue: 500,
            duration: 240,
            useNativeDriver: true,
            easing: Easing.in(Easing.quad),
          }).start(() => {
            peekDragY.setValue(0);
            onClose();
          });
        } else {
          Animated.spring(peekDragY, { toValue: 0, useNativeDriver: true, bounciness: 6 } as any).start();
        }
      },
    })
  ).current;

  const sheetDragY = useRef(new Animated.Value(0)).current;
  const sheetHandlersRef = useRef({ onToPeek, onToStart, onClose, mode });
  const resolveDrag = () => {
    const { onToPeek: tp, onToStart: ts, onClose: cl, mode: m } = sheetHandlersRef.current;
    if (m === 'thinking' || m === 'answering') tp();
    else if (m === 'composing') ts();
    else cl();
  };
  const sheetPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 4,
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) sheetDragY.setValue(dy);
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy < 5) {
          Animated.spring(sheetDragY, { toValue: 0, useNativeDriver: true, bounciness: 0 } as any).start();
          resolveDrag();
        } else if (dy > 80 || vy > 0.6) {
          sheetDragY.setValue(0);
          resolveDrag();
        } else {
          Animated.spring(sheetDragY, { toValue: 0, useNativeDriver: true, bounciness: 6 } as any).start();
        }
      },
    })
  ).current;

  const [draft, setDraft] = useState('');

  // Peek (half-card scan) ────────────────────────────────────────────────────
  if (mode === 'peek') {
    return (
      <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        <Animated.View style={{ position: 'absolute', left: 8, right: 8, bottom: Animated.add(new Animated.Value(80), keyboardOffset) }} pointerEvents="box-none">
          <Animated.View style={{ transform: [{ translateY: peekDragY }] }}>
            <GR1Glow />
            <Animated.View style={[styles.gr1PeekCard, GR1_GLOW_SHADOW, { position: 'relative', bottom: undefined, left: undefined, right: undefined }]}>
              <View style={styles.gr1DragHandleRow} {...peekPanResponder.panHandlers}>
                <View style={styles.gr1DragHandle} />
              </View>
              <View style={styles.gr1SheetHeader}>
                <GR1Icon size={18} />
                <Text style={styles.gr1SheetTitle}>GR-1</Text>
              </View>
              <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 12 }} showsVerticalScrollIndicator={false}>
                <View style={styles.gr1UserBubbleRow}>
                  <View style={styles.gr1UserBubble}>
                    <Text style={styles.gr1UserBubbleText}>{prompt}</Text>
                  </View>
                </View>
                <View style={styles.gr1ResponseArea}>
                  {answer ? <Text style={styles.gr1AnswerText}>{answer}</Text> : <ThinkingIndicator />}
                </View>
                <View style={styles.gr1InputInline}>
                  <TouchableOpacity style={styles.gr1InputRow} activeOpacity={0.85} onPress={onReExpand}>
                    <Text style={[styles.gr1Input, { color: colors.contentTertiary }]} numberOfLines={1}>Ask anything</Text>
                    <View style={styles.gr1SendBtn}><SendIcon /></View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
              <View style={styles.gr1HomeRow}>
                <View style={styles.gr1HomeIndicator} />
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }

  // Normal sheet ─────────────────────────────────────────────────────────────
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [720, 0] });
  const sheetHeight = expandAnim.interpolate({ inputRange: [0, 1], outputRange: [292, 690] });

  const isChat = mode !== 'suggestions';
  const showSuggestions = mode === 'suggestions' || mode === 'composing';
  sheetHandlersRef.current = { onToPeek, onToStart, onClose, mode };

  const submitDraft = () => {
    const t = draft.trim();
    if (!t) return;
    setDraft('');
    onSubmit(t);
  };

  return (
    <View style={styles.gr1Overlay} pointerEvents="box-none">
      <Animated.View style={{ marginBottom: keyboardOffset }}>
        <Animated.View style={[GR1_GLOW_SHADOW, { transform: [{ translateY: Animated.add(translateY, sheetDragY) }] }]}>
          <GR1Glow />
          {/* Mesh peeks out past the sheet edges — see MeshBackdrop.web.tsx. */}
          <View pointerEvents="none" style={styles.gr1MeshPeek}>
            <MeshBackdrop />
          </View>
          <Animated.View style={[styles.gr1SheetContainer, { height: Animated.subtract(sheetHeight, keyboardOffset) }]}>
            <View style={styles.gr1Sheet}>
              <View style={styles.gr1DragHandleRow} {...sheetPanResponder.panHandlers}>
                <View style={styles.gr1DragHandle} />
              </View>
              <View style={styles.gr1SheetHeader}>
                <GR1Icon size={22} />
                <Text style={styles.gr1SheetTitle}>GR-1</Text>
              </View>
              {showSuggestions ? (
                <View style={styles.gr1Suggestions}>
                  {suggestions.map((text) => (
                    <TouchableOpacity key={text} style={styles.gr1SuggestionRow}
                      activeOpacity={0.7} onPress={() => onSuggestionTap(text)}>
                      <ArrowTurnForwardIcon />
                      <Text style={styles.gr1SuggestionText}>{text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 12 }} showsVerticalScrollIndicator={false}>
                  <View style={styles.gr1UserBubbleRow}>
                    <View style={styles.gr1UserBubble}>
                      <Text style={styles.gr1UserBubbleText}>{prompt}</Text>
                    </View>
                  </View>
                  <View style={styles.gr1ResponseArea}>
                    {mode === 'thinking' ? <ThinkingIndicator /> : <Text style={styles.gr1AnswerText}>{answer}</Text>}
                  </View>
                </ScrollView>
              )}
              <View style={styles.gr1InputDock}>
                {isChat && Platform.OS === 'web' && (
                  <View style={styles.gr1Scrim} pointerEvents="none"
                    {...({ style: [styles.gr1Scrim, {
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
                    }] } as any)} />
                )}
                <View style={styles.gr1InputRow}>
                  <TextInput
                    ref={inputRef}
                    style={styles.gr1Input}
                    placeholder="Ask anything"
                    placeholderTextColor={colors.contentTertiary}
                    value={draft}
                    onChangeText={setDraft}
                    onFocus={() => { if (mode === 'suggestions') onExpand(); }}
                    onSubmitEditing={submitDraft}
                    returnKeyType="send"
                    blurOnSubmit={false}
                  />
                  <TouchableOpacity style={styles.gr1SendBtn} onPress={submitDraft} activeOpacity={0.7}>
                    <SendIcon />
                  </TouchableOpacity>
                </View>
                {isChat && (
                  <View style={styles.gr1Disclaimer}>
                    <Text style={styles.gr1DisclaimerText}>GR-1 can make mistakes.  </Text>
                    <Text style={[styles.gr1DisclaimerText, styles.gr1DisclaimerLink]}>Verify before investing</Text>
                  </View>
                )}
              </View>
              <View style={styles.gr1HomeRow}>
                <View style={styles.gr1HomeIndicator} />
              </View>
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

// ─── Hook: state + handlers for opening/transitioning the sheet ───────────────
export interface UseGR1SheetOptions {
  suggestions?: readonly string[];
  answers?: Record<string, string>;
  fallbackAnswer?: string;
}

export function useGR1Sheet(options: UseGR1SheetOptions = {}) {
  const suggestions = options.suggestions ?? DEFAULT_SUGGESTIONS;
  const answers = options.answers ?? DEFAULT_ANSWERS;
  const fallback = options.fallbackAnswer ?? DEFAULT_FALLBACK;

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<GR1Mode>('suggestions');
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const anim = useRef(new Animated.Value(0)).current;
  const expandAnim = useRef(new Animated.Value(0)).current;
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const thinkRef  = useRef<ReturnType<typeof setTimeout>  | null>(null);

  const openSheet = useCallback(() => {
    setMode('suggestions');
    setPrompt('');
    setAnswer('');
    expandAnim.setValue(0);
    setOpen(true);
    Animated.timing(anim, { toValue: 1, duration: 240, useNativeDriver: true, easing: Easing.out(Easing.cubic) }).start();
  }, [anim, expandAnim]);

  const closeSheet = useCallback(() => {
    if (streamRef.current) { clearInterval(streamRef.current); streamRef.current = null; }
    if (thinkRef.current)  { clearTimeout(thinkRef.current);  thinkRef.current = null; }
    Animated.parallel([
      Animated.timing(anim, { toValue: 0, duration: 260, useNativeDriver: true, easing: Easing.in(Easing.quad) }),
      Animated.timing(expandAnim, { toValue: 0, duration: 220, useNativeDriver: false }),
    ]).start(() => {
      setOpen(false);
      setMode('suggestions');
      setPrompt('');
      setAnswer('');
    });
  }, [anim, expandAnim]);

  const toPeek = useCallback(() => setMode('peek'), []);

  const toStart = useCallback(() => {
    Keyboard.dismiss();
    setMode('suggestions');
    setPrompt('');
    setAnswer('');
    Animated.timing(expandAnim, {
      toValue: 0, duration: 260, useNativeDriver: false, easing: Easing.out(Easing.cubic),
    }).start();
  }, [expandAnim]);

  const reExpandFromPeek = useCallback(() => {
    setMode(answer ? 'answering' : 'thinking');
  }, [answer]);

  const onExpand = useCallback(() => {
    setMode('composing');
    Animated.timing(expandAnim, {
      toValue: 1, duration: 340, useNativeDriver: false, easing: Easing.out(Easing.cubic),
    }).start();
  }, [expandAnim]);

  const onSuggestionTap = useCallback((text: string) => {
    if (streamRef.current) { clearInterval(streamRef.current); streamRef.current = null; }
    setPrompt(text);
    setAnswer('');
    setMode('thinking');
    Animated.timing(expandAnim, {
      toValue: 1, duration: 340, useNativeDriver: false, easing: Easing.out(Easing.cubic),
    }).start();
    thinkRef.current = setTimeout(() => {
      setMode('answering');
      const full = answers[text] ?? fallback;
      const words = full.split(' ');
      let i = 0;
      streamRef.current = setInterval(() => {
        i++;
        setAnswer(words.slice(0, i).join(' '));
        if (i >= words.length) { clearInterval(streamRef.current!); streamRef.current = null; }
      }, 75);
    }, 1800);
  }, [expandAnim, answers, fallback]);

  return {
    open, mode, prompt, answer, suggestions, anim, expandAnim,
    openSheet, closeSheet,
    toPeek, toStart, reExpandFromPeek, onExpand, onSuggestionTap,
  };
}

// ─── Layer: white overlay + bottom sheet, ready to drop into a screen ─────────
export type GR1State = ReturnType<typeof useGR1Sheet>;

export function GR1Layer({ state }: { state: GR1State }) {
  useTheme();
  styles = makeStyles();
  if (!state.open) return null;
  return (
    <>
      {(state.mode === 'thinking' || state.mode === 'answering') && (
        <View style={styles.gr1WhiteOverlay} onStartShouldSetResponder={() => true} />
      )}
      <GR1BottomSheet
        anim={state.anim}
        expandAnim={state.expandAnim}
        mode={state.mode}
        prompt={state.prompt}
        answer={state.answer}
        suggestions={state.suggestions}
        onClose={state.closeSheet}
        onSuggestionTap={state.onSuggestionTap}
        onToPeek={state.toPeek}
        onToStart={state.toStart}
        onReExpand={state.reExpandFromPeek}
        onExpand={state.onExpand}
        onSubmit={state.onSuggestionTap}
      />
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const makeStyles = () => StyleSheet.create({
  gr1WhiteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  gr1PeekCard: {
    position: 'absolute',
    bottom: 80,
    left: 8,
    right: 8,
    height: 320,
    borderRadius: 16,
    backgroundColor: colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  gr1Overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  gr1SheetContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  // Outset around the sheet for the mesh-gradient halo to peek out from.
  gr1MeshPeek: {
    position: 'absolute',
    top: -32,
    left: -32,
    right: -32,
    bottom: -32,
    overflow: 'hidden',
    borderRadius: 32,
  },
  gr1Sheet: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
  },
  gr1UserBubbleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 72,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  gr1UserBubble: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  gr1UserBubbleText: {
    fontFamily: F.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.contentPrimary,
  },
  gr1ResponseArea: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  gr1AnswerText: {
    fontFamily: F.regular,
    fontSize: 16,
    lineHeight: 26,
    color: colors.contentPrimary,
  },
  gr1Scrim: {
    position: 'absolute',
    top: -32,
    left: 0,
    right: 0,
    height: 32,
  },
  gr1Disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
    paddingBottom: 2,
  },
  gr1DisclaimerText: {
    fontFamily: F.medium,
    fontSize: 10,
    lineHeight: 12,
    color: colors.contentDisabled,
  },
  gr1DisclaimerLink: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.contentDisabled,
    borderStyle: 'dashed',
  },
  gr1DragHandleRow: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  gr1DragHandle: {
    width: 48,
    height: 4,
    borderRadius: 100,
    backgroundColor: colors.backgroundTertiary,
  },
  gr1SheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  gr1SheetTitle: {
    fontFamily: F.sohne,
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
    color: colors.contentPrimary,
  },
  gr1Suggestions: {
    paddingBottom: 4,
  },
  gr1SuggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    minHeight: 48,
    paddingVertical: 8,
  },
  gr1SuggestionText: {
    fontFamily: F.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.contentPrimary,
    flex: 1,
  },
  gr1InputDock: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  gr1InputInline: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  gr1InputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    borderRadius: 99,
    paddingLeft: 16,
    paddingRight: 8,
    height: 48,
  },
  gr1Input: {
    flex: 1,
    fontFamily: F.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.contentPrimary,
    paddingVertical: 0,
  },
  gr1SendBtn: {
    width: 32,
    height: 32,
    borderRadius: 99,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gr1HomeRow: {
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 'auto',
  },
  gr1HomeIndicator: {
    width: 72,
    height: 2,
    borderRadius: 100,
    backgroundColor: colors.contentSecondary,
  },
});

let styles = makeStyles();
