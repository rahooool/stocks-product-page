// Type-only fallback — Metro resolves `.web.tsx` / `.native.tsx` per platform
// at bundle time. This file exists so TypeScript's resolver (which doesn't
// know about platform extensions) can find a module for `./MeshBackdrop`.
export { default } from './MeshBackdrop.native';
