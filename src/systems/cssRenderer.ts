import { CSS2DRenderer, CSS3DRenderer } from "three/examples/jsm/Addons.js";

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Initialze Renderer
// ╚════════════════════════════════════════════════════════════════════════╝
export class MyCSSRenderer {
  private renderer;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new CSS2DRenderer();
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
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

export class MyCSS3DRenderer {
  private renderer;
  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new CSS3DRenderer();
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.domElement.style.position = "absolute";
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100vh";
    this.renderer.domElement.style.top = "0";
    this.renderer.domElement.style.left = "0";
    this.renderer.domElement.id = "css3DRenderer";

    document.body.appendChild(this.renderer.domElement);
  }

  getRenderer() {
    return this.renderer;
  }
}
