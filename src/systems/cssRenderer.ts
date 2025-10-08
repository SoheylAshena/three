// ╔════════════════════════════════════════════════════════════════════════╗
// |   Initialze Renderer

import { CSS2DRenderer } from "three/examples/jsm/Addons.js";

// ╚════════════════════════════════════════════════════════════════════════╝
export class MyCSSRenderer {
  private renderer;

  constructor() {
    this.renderer = new CSS2DRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.style.position = "absolute";
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100vh";
    this.renderer.domElement.style.top = "0";
    this.renderer.domElement.style.left = "0";
    this.renderer.domElement.style.opacity = "0";
    this.renderer.domElement.id = "cssRenderer";

    document.body.appendChild(this.renderer.domElement);
  }

  getRenderer() {
    return this.renderer;
  }
}
