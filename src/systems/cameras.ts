import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Initialize Camera and Control
// ╚════════════════════════════════════════════════════════════════════════╝
export class MyCamera {
  public camera;
  public controls;
  constructor(canvas: HTMLCanvasElement) {
    this.camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight);
    this.camera.position.set(0, 0, 10);
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
  }

  moveCamera(x: number, y: number, z: number) {
    gsap.to(this.camera.position, { x, y, z });
  }
}
