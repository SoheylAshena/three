/*─────────────────────────────────────────────────────────────────────────────
│                                                                             │
│      © 2025 — Soheyl Ashena                                                 │
│      Licensed under the MIT License.                                        │
│      You must retain this notice in any copies or derivative works.         │
│                                                                             │
│      Original Author: Soheyl Ashena                                         │
│      Unauthorized removal of attribution is prohibited.                     │
│                                                                             │
─────────────────────────────────────────────────────────────────────────────*/

import type { PerspectiveCamera, WebGLRenderer } from "three";
import type { CSS2DRenderer } from "three/examples/jsm/Addons.js";

export class MyCanvas {
  private canvas: HTMLCanvasElement;
  private lastWidth: number;

  constructor() {
    this.canvas = window.document.querySelector("#main-canvas")! as HTMLCanvasElement;
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100vh";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";

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
