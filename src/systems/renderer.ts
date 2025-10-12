import { ACESFilmicToneMapping, WebGLRenderer } from "three";

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Initialze Renderer
// ╚════════════════════════════════════════════════════════════════════════╝
export class MyRenderer {
  private renderer;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas,
      alpha: true,
    });
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  getRenderer() {
    return this.renderer;
  }
}
