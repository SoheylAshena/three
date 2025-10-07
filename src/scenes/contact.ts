import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

export const createContactSection = (model: THREE.Object3D) => {
  const whiteMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
  });
  const whiteGlowMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
  });

  model.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).material = [whiteMaterial, whiteGlowMaterial, whiteMaterial];
    }
  });
  const contactScreen = model.clone(true);
  contactScreen.position.set(0, 0, 10);
  contactScreen.rotation.set(0, degToRad(180), 0);
  contactScreen.scale.set(0.3, 0.3, 0.3);

  return contactScreen;
};
