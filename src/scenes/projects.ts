import * as THREE from "three";
import gsap from "gsap";
import { degToRad } from "three/src/math/MathUtils.js";
import type { AssetLoader } from "../systems/AssetLoader";

export const createProjectsSection = (staticAssets: AssetLoader) => {
  const screenMats: Array<keyof typeof materials> = ["whiteGlow", "whiteGlow", "whiteGlow"];
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

  const screen = staticAssets.objects.screen;
  screen.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).material = [materials.whitePlastic, materials.whiteGlow, materials.whitePlastic];
    }
  });

  const projects = screenMats.map((screenMat, index) => {
    const newScreen = screen.clone(true);
    newScreen.position.set(-10, 0, 0);
    newScreen.rotation.set(0, degToRad(90), 0);
    newScreen.position.add(new THREE.Vector3(0, index * -2, 0));

    gsap.to(newScreen.position, {
      y: "+=0.1",
      repeat: -1,
      yoyo: true,
      delay: index * 1.5,
      ease: "power1.inOut",
      duration: 3,
    });

    gsap.to(newScreen.rotation, {
      x: "+=0.01",
      y: "+=0.01",
      z: "+=0.01",
      repeat: -1,
      yoyo: true,
      delay: index * 1.5,
      ease: "power1.inOut",
      duration: 3,
    });

    newScreen.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = [materials.whitePlastic, materials[screenMat], materials.whitePlastic];
      }
    });

    return newScreen;
  });

  return projects;
};
