import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

export class MyCamera {
  private camera;
  private controls;

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight);
    this.camera.position.set(0, 0, 5);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
  }

  getCamera() {
    return this.camera;
  }

  getControls() {
    return this.controls;
  }

  moveCamera = (x: number, y: number, z: number) => {
    gsap.to(this.camera.position, { x, y, z, duration: 2 });
  };

  setTarget = (x: number, y: number, z: number) => {
    gsap.to(this.controls.target, { x, y, z, duration: 2 });
  };
}
