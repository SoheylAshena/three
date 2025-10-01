import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import type { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

import { assets } from "../globalData";
import { degToRad } from "./degToRad";
import { createNebula } from "./nebula";

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Initialize Three.JS scene
// ╚════════════════════════════════════════════════════════════════════════╝
export const initializeScene = () => {
  const scene = new Scene();
  scene.environment = assets.textures.env;
  scene.environmentIntensity = 0.5;

  const starfield = assets.objects.starField;
  gsap.to(starfield.rotation, { x: degToRad(360), repeat: -1, ease: "none", duration: 1000 });

  const nebula = createNebula();
  console.log(nebula);

  scene.add(starfield, ...nebula);

  return scene;
};

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Scene render function
// ╚════════════════════════════════════════════════════════════════════════╝
export const renderScene = (
  renderer: WebGLRenderer,
  camera: PerspectiveCamera,
  scene: Scene,
  constrols: OrbitControls
) => {
  const render = () => {
    constrols.update();
    renderer.render(scene, camera);
  };

  gsap.ticker.add(render);
};
