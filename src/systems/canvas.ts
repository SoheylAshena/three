import type { PerspectiveCamera, WebGLRenderer } from "three";
import type { CSS2DRenderer } from "three/examples/jsm/Addons.js";

export class MyCanvas {
  private canvas: HTMLCanvasElement;
  private lastWidth: number;

  constructor() {
    this.canvas = window.document.querySelector("#main-canvas")! as HTMLCanvasElement;
    this.lastWidth = this.canvas.clientWidth;
  }

  getCanvas() {
    return this.canvas;
  }

  resizeHandler(
    camera: PerspectiveCamera,
    renderers: Array<WebGLRenderer | CSS2DRenderer>,
    callbacks: () => void
  ) {
    const resize = () => {
      const newWidth = this.canvas.clientWidth;

      // ✅ Only run logic if width actually changed
      if (newWidth !== this.lastWidth) {
        this.lastWidth = newWidth;

        const newHeight = this.canvas.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();

        renderers.forEach((renderer) => {
          renderer.setSize(newWidth, newHeight);
        });

        callbacks();
      }
    };

    // Optional: use visualViewport for more stable behavior on mobile
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", resize);
    } else {
      window.addEventListener("resize", resize);
    }
  }
}
