import gsap from "gsap";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

export const createStarField = () => {
  const starsGeometry = new THREE.BufferGeometry();
  const starsCount = 60000;
  const positions = new Float32Array(starsCount * 3);
  const colors = new Float32Array(starsCount * 3);

  const minRadius = 50;
  const maxRadius = 200;

  for (let i = 0; i < starsCount; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = minRadius + Math.random() * (maxRadius - minRadius);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

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

    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }

  starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  starsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const starsMaterial = new THREE.PointsMaterial({
    size: 0.35,
    sizeAttenuation: true,
    vertexColors: true,
    side: 2,
  });

  const starfield = new THREE.Points(starsGeometry, starsMaterial);

  gsap.to(starfield.rotation, { x: degToRad(360), repeat: -1, ease: "none", duration: 1000 });

  return starfield;
};
