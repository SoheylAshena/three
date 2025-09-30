import { Vector3, type Mesh } from "three";
import { assets } from "../globalData";
import gsap from "gsap";
import { degToRad } from "../utils/degToRad";

export const createProjectsSection = () => {
  const screenMats = ["whiteGlow", "whiteGlow", "whiteGlow"];

  const screen = assets.objects.screen;
  screen.traverse((child) => {
    if ((child as Mesh).isMesh) {
      (child as Mesh).material = [
        assets.materials.silver,
        assets.materials.whiteGlow,
        assets.materials.silver,
      ];
    }
  });

  const projects = screenMats.map((screenMat, index) => {
    const newScreen = screen.clone(true);
    newScreen.position.set(-10, 0, 0);
    newScreen.rotation.set(0, degToRad(90), 0);
    newScreen.position.add(new Vector3(0, index * -2, 0));

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
      if ((child as Mesh).isMesh) {
        (child as Mesh).material = [
          assets.materials.silver,
          assets.materials[screenMat],
          assets.materials.silver,
        ];
      }
    });

    return newScreen;
  });

  return projects;
};
