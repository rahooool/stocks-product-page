// Native: paper-design/shaders-react is web-only (WebGL/<canvas>) — no port
// for iOS/Android. Render nothing; the GR-1 sheet works fine without it.
// Mirrors the `webOnly` pattern used in ai-patterns-charts.
export default function MeshBackdrop() {
  return null;
}
