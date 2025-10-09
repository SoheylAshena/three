import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/Addons.js";
import { isMobile } from "../utils/isMobile";

export function renderSkillsSection() {
  const div = document.createElement("div");

  return div;
}

const para = document.createElement("h1");
para.textContent = "My Skills";

const desc = new CSS2DObject(para);

const distances = {
  title: new THREE.Vector3(0, 0, 1.5),
  titleMobile: new THREE.Vector3(0, 1, -1),
};

export function renderDynamicSkillSection(
  scene: THREE.Scene,
  position: THREE.Vector3[]
): HTMLElement | HTMLElement[] {
  if (isMobile()) {
    desc.position.copy(position[0]);
    desc.position.add(distances.titleMobile);
  } else {
    desc.position.copy(position[0]);
    desc.position.add(distances.title);
  }
  scene.add(desc);

  return para;
}
