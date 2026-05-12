// Long-press burst overlay — Phase 1 scaffold.
// The Most Traded card the user long-pressed becomes a hero element that
// springs from its origin position to a full-width hero, with a backdrop
// fade and a placeholder insight panel below. Tap backdrop to dismiss.
//
// Phases 2-6 will layer: progressive haptic crescendo, shader resolve,
// GR-1-generated insight slots, inline chat, and pinch-to-dismiss.

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, fonts as F } from './tokens';

export type BurstOrigin = { x: number; y: number; width: number; height: number };

export type BurstCardData = {
  name: string;
  ticker: string;
  price: string;
  change: string;
  positive: boolean;
  logo: any;
};

interface Props {
  visible: boolean;
  origin: BurstOrigin | null;
  card: BurstCardData | null;
  onDismiss: () => void;
}

const { width: SCREEN_W } = Dimensions.get('window');
const HERO_LEFT = 16;
const HERO_TOP = 90;
const HERO_W = SCREEN_W - 32;
const HERO_H = 140;

export function BurstOverlay({ visible, origin, card, onDismiss }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  // Hold last origin/card so the dismiss animation can play out even after
  // the parent sets burst=null. Cleared once the dismiss spring completes.
  const [shown, setShown] = useState<{ origin: BurstOrigin; card: BurstCardData } | null>(null);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  useEffect(() => {
    if (visible && origin && card) {
      setShown({ origin, card });
      progress.setValue(0);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      Animated.spring(progress, {
        toValue: 1,
        useNativeDriver: false,
        damping: 18,
        mass: 1,
        stiffness: 180,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 220,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished && !visibleRef.current) setShown(null);
      });
    }
  }, [visible, origin, card, progress]);

  if (!shown) return null;
  const o = shown.origin;
  const c = shown.card;

  const heroLeft   = progress.interpolate({ inputRange: [0, 1], outputRange: [o.x, HERO_LEFT] });
  const heroTop    = progress.interpolate({ inputRange: [0, 1], outputRange: [o.y, HERO_TOP] });
  const heroWidth  = progress.interpolate({ inputRange: [0, 1], outputRange: [o.width, HERO_W] });
  const heroHeight = progress.interpolate({ inputRange: [0, 1], outputRange: [o.height, HERO_H] });
  const backdropOpacity = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 0.55] });
  const bodyOpacity     = progress.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 0, 1] });
  const bodyTranslate   = progress.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={visible ? 'auto' : 'none'}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.hero,
          { left: heroLeft, top: heroTop, width: heroWidth, height: heroHeight },
        ]}
        pointerEvents="none"
      >
        <View style={styles.heroTop}>
          <View style={styles.heroAvatar}>
            {typeof c.logo === 'string' ? (
              <Image source={{ uri: c.logo }} style={styles.heroAvatarImg} />
            ) : (
              <Image source={c.logo} style={styles.heroAvatarImg} />
            )}
          </View>
          <Text style={styles.heroName} numberOfLines={1}>{c.name}</Text>
        </View>
        <View style={styles.heroBottom}>
          <Text style={styles.heroPrice}>{c.price}</Text>
          <Text
            style={[
              styles.heroChange,
              { color: c.positive ? colors.contentPositive : colors.contentNegative },
            ]}
          >
            {c.change}
          </Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.body,
          {
            opacity: bodyOpacity,
            transform: [{ translateY: bodyTranslate }],
          },
        ]}
      >
        <Text style={styles.label}>WHY THIS IS MOVING</Text>
        <View style={styles.slot}>
          <Text style={styles.slotLine}>
            {c.name} {c.positive ? 'gained' : 'lost'} ground today on above-average retail flow.
          </Text>
        </View>
        <View style={styles.slot}>
          <Text style={styles.slotLine}>
            Volume vs avg, catalyst, and peer rotation will live here — Phase 4 wires GR-1 to fill these.
          </Text>
        </View>
        <View style={styles.slot}>
          <Text style={styles.slotLine}>
            Chat continuation drops in here — Phase 5.
          </Text>
        </View>

        <View style={styles.ctaRow}>
          <View style={[styles.cta, styles.ctaPrimary]}>
            <Text style={styles.ctaPrimaryText}>Buy</Text>
          </View>
          <View style={[styles.cta, styles.ctaSecondary]}>
            <Text style={styles.ctaSecondaryText}>Sell</Text>
          </View>
          <View style={[styles.cta, styles.ctaSecondary]}>
            <Text style={styles.ctaSecondaryText}>Open page</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: '#000' },
  hero: {
    position: 'absolute',
    backgroundColor: colors.backgroundSurface,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    borderRadius: 16,
    padding: 16,
    gap: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.22,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 12 },
      },
      android: { elevation: 16 },
      default: {},
    }),
  },
  heroTop: { gap: 8 },
  heroAvatar: {
    width: 32,
    height: 32,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: colors.borderPrimary,
    backgroundColor: colors.backgroundSecondary,
  },
  heroAvatarImg: { width: '100%', height: '100%' },
  heroName: { fontFamily: F.regular, fontSize: 14, lineHeight: 20, color: colors.contentPrimary },
  heroBottom: { gap: 4 },
  heroPrice: { fontFamily: F.medium, fontSize: 14, lineHeight: 20, color: colors.contentPrimary },
  heroChange: { fontFamily: F.medium, fontSize: 12, lineHeight: 18 },
  body: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: HERO_TOP + HERO_H + 16,
    backgroundColor: colors.backgroundSurface,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  label: {
    fontFamily: F.medium,
    fontSize: 11,
    letterSpacing: 0.8,
    color: colors.contentSecondary,
  },
  slot: { backgroundColor: colors.backgroundSecondary, borderRadius: 12, padding: 12 },
  slotLine: { fontFamily: F.regular, fontSize: 14, lineHeight: 20, color: colors.contentPrimary },
  ctaRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  cta: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  ctaPrimary: { backgroundColor: colors.backgroundAccent },
  ctaPrimaryText: { fontFamily: F.medium, fontSize: 14, color: colors.contentOnColour },
  ctaSecondary: { backgroundColor: colors.backgroundTertiary },
  ctaSecondaryText: { fontFamily: F.medium, fontSize: 14, color: colors.contentPrimary },
});
