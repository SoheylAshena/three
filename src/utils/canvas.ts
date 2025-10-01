import type { PerspectiveCamera, WebGLRenderer } from "three";

// ═════════════════════════════════════════════════════════════════════════
// |||   Canvas selection
// ═════════════════════════════════════════════════════════════════════════
export const selectCanvas = () => {
  const canvas = document.querySelector("#main-canvas")! as HTMLCanvasElement;
  return canvas;
};

// ═════════════════════════════════════════════════════════════════════════
// |||   Resize Handler fucntion
// ═════════════════════════════════════════════════════════════════════════
export const canvasResizeHandler = (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
  const handler = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  };

  window.addEventListener("resize", handler);
};
