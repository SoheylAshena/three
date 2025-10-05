import type { PerspectiveCamera, WebGLRenderer } from "three";

// ═════════════════════════════════════════════════════════════════════════
// |||   Canvas selection
// ═════════════════════════════════════════════════════════════════════════
export class MyCanvas {
  public canvas: HTMLCanvasElement;
  constructor() {
    this.canvas = window.document.querySelector("#main-canvas")! as HTMLCanvasElement;
  }

  resizeHandler(camera: PerspectiveCamera, renderer: WebGLRenderer) {
    window.addEventListener("resize", () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
  }
}
