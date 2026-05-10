// GR1OpenPulse — single fade-in→fade-out border pulse overlaid on the GR-1
// sheet when it first opens. Web uses paper-design's <PulsingBorder> shader;
// native renders nothing (the shader is WebGL-only).

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, View } from 'react-native';
// @ts-ignore — web-only package, dynamically required below
let PulsingBorder: any = null;
if (Platform.OS === 'web') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PulsingBorder = require('@paper-design/shaders-react').PulsingBorder;
}

export default function GR1OpenPulse({ openKey }: { openKey: number }) {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;

  // Restart the pulse every time the sheet opens (openKey changes)
  useEffect(() => {
    opacity.setValue(0);
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 360, useNativeDriver: true }),
      Animated.delay(700),
      Animated.timing(opacity, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, [openKey, opacity]);

  if (Platform.OS !== 'web' || !PulsingBorder) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity, overflow: 'hidden', borderRadius: 16 }}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setSize({ w: Math.round(width), h: Math.round(height) });
      }}
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
    </Animated.View>
  );
}
