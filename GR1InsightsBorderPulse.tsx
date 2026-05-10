// GR1InsightsBorderPulse — pulsing border around the GR-1 Insights card,
// using paper-design's PulsingBorder shader. Fires twice on `triggerKey`
// change, then fades out and unmounts.
//
// Web only — paper-design/shaders-react needs WebGL/<canvas>.
// The shader is masked to a thin ring along the card's rounded border so
// the glow reads as the card's own edge lighting up, not as a panel sitting
// on top of the card.

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, View } from 'react-native';
// @ts-ignore — web-only require, gated below
let PulsingBorder: any = null;
if (Platform.OS === 'web') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PulsingBorder = require('@paper-design/shaders-react').PulsingBorder;
}

// Border ring width in px — keep small so the glow reads as a stroke, not a fill.
const RING_PX = 2;

export default function GR1InsightsBorderPulse({ triggerKey }: { triggerKey: number }) {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;

  // Two-pulse sequence: in → dim → in → out
  useEffect(() => {
    if (triggerKey === 0) return;
    opacity.setValue(0);
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 320, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0.15, duration: 380, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 320, useNativeDriver: true }),
      Animated.delay(400),
      Animated.timing(opacity, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, [triggerKey, opacity]);

  if (Platform.OS !== 'web' || !PulsingBorder) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity }}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setSize({ w: Math.round(width), h: Math.round(height) });
      }}
    >
      {/* Mask wrapper — clips the shader output to a RING_PX-wide ring along
          the card's rounded edge using the well-known padding-box vs border-box
          mask-composite:exclude trick. Result: only the rim of the shader is
          visible, so the pulse appears to glow ON the card border. */}
      <View
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: 16,
          padding: RING_PX,
          overflow: 'hidden',
          // Web-only mask CSS — cast through `any` for RN style types.
          WebkitMaskImage:
            'linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)',
          WebkitMaskClip: 'content-box, border-box',
          WebkitMaskComposite: 'xor',
          maskImage:
            'linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)',
          maskClip: 'content-box, border-box',
          maskComposite: 'exclude',
        } as any}
      >
        {size && (
          <PulsingBorder
            width={size.w}
            height={size.h}
            colors={['#576aff', '#8ae5cd']}
            colorBack="rgba(0,0,0,0)"
            roundness={0.25}
            thickness={0.02}
            softness={0.58}
            aspectRatio="auto"
            intensity={0.12}
            bloom={0.07}
            spots={3}
            spotSize={0.5}
            pulse={0.25}
            smoke={0.14}
            smokeSize={0.6}
            speed={1.02}
            scale={0.6}
          />
        )}
      </View>
    </Animated.View>
  );
}

