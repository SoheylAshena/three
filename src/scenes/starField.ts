import gsap from "gsap";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

export class StarField {
  private starsGeometry = new THREE.BufferGeometry();
  private starsCount = 60000;
  private positions = new Float32Array(this.starsCount * 3);
  private colors = new Float32Array(this.starsCount * 3);
  private minRadius = 50;
  private maxRadius = 200;
  private starsMaterial = new THREE.PointsMaterial({
    size: 0.35,
    sizeAttenuation: true,
    vertexColors: true,
  });
  private starfield = new THREE.Points(this.starsGeometry, this.starsMaterial);

  create() {
    for (let i = 0; i < this.starsCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = this.minRadius + Math.random() * (this.maxRadius - this.minRadius);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      this.positions[i * 3] = x;
      this.positions[i * 3 + 1] = y;
      this.positions[i * 3 + 2] = z;

      let r, g, b;
      const colorType = Math.random();
      if (colorType < 0.3) {
        r = 0.3 + Math.random() * 0.3;
        g = 0.3 + Math.random() * 0.3;
        b = 0.7 + Math.random() * 0.3;
      } else if (colorType < 0.6) {
        r = 0.8 + Math.random() * 0.2;
        g = 0.8 + Math.random() * 0.2;
        b = 0.8 + Math.random() * 0.2;
      } else if (colorType < 0.9) {
        r = 0.8 + Math.random() * 0.2;
        g = 0.6 + Math.random() * 0.2;
        b = 0.2 + Math.random() * 0.2;
      } else {
        r = 0.7 + Math.random() * 0.3;
        g = 0.2 + Math.random() * 0.2;
        b = 0.2 + Math.random() * 0.2;
      }

      this.colors[i * 3] = r;
      this.colors[i * 3 + 1] = g;
      this.colors[i * 3 + 2] = b;
    }

    this.starsGeometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.starsGeometry.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));

    gsap.to(this.starfield.rotation, {
      x: degToRad(360),
      repeat: -1,
      ease: "none",
      duration: 1000,
    });

    return this.starfield;
  }
}
