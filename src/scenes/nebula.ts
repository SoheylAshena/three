import gsap from "gsap";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import type { AssetLoader } from "../systems/AssetLoader";

export const createNebula = (staticAssets: AssetLoader) => {
  const texture = staticAssets.textures.cloud;
  const cloudParticles = [];
  const count = 10;
  const cloudGeo = new THREE.PlaneGeometry(500, 500);
  const cloudMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    emissive: 0x180138,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  for (let i = 0; i < count; i++) {
    const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    cloud.position.set((Math.random() - 0.5) * 800, 0, (Math.random() - 0.5) * 800);
    cloud.rotation.set(
      1.16 + (Math.random() - 0.5) * 0.2,
      -0.12 + (Math.random() - 0.5) * 0.2,
      Math.random() * Math.PI * 2
    );
    cloud.material.opacity = Math.random() * 0.5 + 0.3;
    gsap.to(cloud.rotation, { z: "-=6.28", repeat: -1, ease: "none", duration: 150 });
    cloudParticles.push(cloud);
  }

  const group = new THREE.Group();
  group.add(...cloudParticles);
  group.position.set(0, 200, -500);
  group.rotation.set(degToRad(-45), degToRad(0), degToRad(0));

  const group2 = group.clone(true);
  group2.position.set(0, 200, 500);
  group2.rotation.set(degToRad(45), degToRad(0), degToRad(0));

  return [group, group2];
};
