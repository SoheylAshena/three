import { ACESFilmicToneMapping, PCFSoftShadowMap, WebGLRenderer } from "three";

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Initialze Renderer
// ╚════════════════════════════════════════════════════════════════════════╝
export const initializeRenderer = (canvas: HTMLCanvasElement) => {
  const renderer = new WebGLRenderer({
    antialias: true,
    canvas,
  });

  // ─── 🔹 Renderer Configuretion ─────────────
  // ──────────────────────────────────────────────────────────────────
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  return renderer;
};
