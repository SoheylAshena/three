import * as THREE from "three";
import type { AssetLoader } from "../systems/AssetLoader";
import { degToRad } from "three/src/math/MathUtils.js";

export const createContactSection = (staticAssets: AssetLoader) => {
  const screen = staticAssets.objects.screen;
  const materials = {
    whitePlastic: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
    }),
    whiteGlow: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
    }),
  };

  screen.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).material = [materials.whitePlastic, materials.whiteGlow, materials.whitePlastic];
    }
  });
  const contactScreen = screen.clone(true);
  contactScreen.position.set(0, 0, 10);
  contactScreen.rotation.set(0, degToRad(180), 0);
  contactScreen.scale.set(0.3, 0.3, 0.3);

  return contactScreen;
};
