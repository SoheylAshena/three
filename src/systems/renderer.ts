import { ACESFilmicToneMapping, PCFSoftShadowMap, WebGLRenderer } from "three";

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
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
  }

  getRenderer() {
    return this.renderer;
  }
}
