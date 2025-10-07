import * as THREE from "three";
import gsap from "gsap";
import { degToRad } from "three/src/math/MathUtils.js";
import { isMobile } from "../utils/isMobile";

export const createProjectsSection = (
  data: {
    texture: string;
  }[],
  model: THREE.Object3D
) => {
  const whiteMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
  });
  const whiteGlowMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
  });

  const projects = data.map((_project, index) => {
    const newProject = model.clone(true);
    const distance = isMobile() ? -4 : -2;
    newProject.position.set(-10, 0, 0);
    newProject.rotation.set(0, degToRad(90), 0);
    newProject.position.add(new THREE.Vector3(0, index * distance, 0));

    gsap.to(newProject.position, {
      y: "+=0.1",
      repeat: -1,
      yoyo: true,
      delay: index * 1.5,
      ease: "power1.inOut",
      duration: 3,
    });

    gsap.to(newProject.rotation, {
      x: "+=0.01",
      y: "+=0.01",
      z: "+=0.01",
      repeat: -1,
      yoyo: true,
      delay: index * 1.5,
      ease: "power1.inOut",
      duration: 3,
    });

    newProject.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = [whiteMaterial, whiteGlowMaterial, whiteMaterial];
      }
    });

    return newProject;
  });

  return projects;
};
