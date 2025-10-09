import type { PerspectiveCamera, WebGLRenderer } from "three";

// ═════════════════════════════════════════════════════════════════════════
// |||   Canvas selection
// ═════════════════════════════════════════════════════════════════════════
export class MyCanvas {
  private canvas: HTMLCanvasElement;
  constructor() {
    this.canvas = window.document.querySelector("#main-canvas")! as HTMLCanvasElement;
  }

  getCanvas() {
    return this.canvas;
  }

  resizeHandler(camera: PerspectiveCamera, renderer: WebGLRenderer, callbacks: () => void) {
    window.addEventListener("resize", () => {
      const newWidth = this.canvas.clientWidth;
      const newHeight = this.canvas.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      callbacks();
    });
  }
}
