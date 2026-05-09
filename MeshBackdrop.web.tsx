import { View, StyleSheet } from 'react-native';
import { MeshGradient } from '@paper-design/shaders-react';

// Device frame size from App.tsx. paper-design's <MeshGradient> is a <canvas>
// sized in pixels — match the visible viewport rather than scaling.
const FRAME_W = 360;
const FRAME_H = 800;

export default function MeshBackdrop() {
  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFillObject, { overflow: 'hidden', opacity: 0.4 }]}
    >
      <MeshGradient
        width={FRAME_W}
        height={FRAME_H}
        colors={['#ffffff', '#576aff', '#8ae5cd']}
        distortion={0.8}
        swirl={0.14}
        grainMixer={0}
        grainOverlay={0}
        speed={1}
      />
    </View>
  );
}
