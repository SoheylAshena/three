import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/Addons.js";
import { isMobile } from "../utils/isMobile";

export function renderProjectsSection() {
  const projectsDesc = document.createElement("h2");
  projectsDesc.textContent = "My Projects";

  const div = document.createElement("div");
  div.appendChild(projectsDesc);

  return div;
}

const para = document.createElement("h1");
para.textContent = "3D Portfolio";
para.classList.add("projectTitle");

const para2 = document.createElement("h1");
para2.textContent = "Task Manager";
para2.classList.add("projectTitle");

const para3 = document.createElement("h1");
para3.textContent = "Recipe Finder";
para3.classList.add("projectTitle");

const description = document.createElement("p");
description.textContent =
  "This is my absolutely lovely beautiful sexy nicely implemented First project";
description.classList.add("projectDesc");

const description2 = document.createElement("p");
description2.textContent =
  "This is my absolutely lovely beautiful sexy nicely implemented Second project";
description2.classList.add("projectDesc");

const description3 = document.createElement("p");
description3.textContent =
  "This is my absolutely lovely beautiful sexy nicely implemented Third project";
description3.classList.add("projectDesc");

const p = new CSS2DObject(para);
const p2 = new CSS2DObject(para2);
const p3 = new CSS2DObject(para3);

const desc = new CSS2DObject(description);
const desc2 = new CSS2DObject(description2);
const desc3 = new CSS2DObject(description3);

const distances = {
  titles: new THREE.Vector3(0, 0.5, -3),
  titlesMobile: new THREE.Vector3(0, -1.25, 0),

  description: new THREE.Vector3(0, 0, -3),
  descriptionMobile: new THREE.Vector3(0, -2, 0),
};

export function renderDynamicProjects(scene: THREE.Scene, positions: THREE.Vector3[]) {
  if (isMobile()) {
    p.position.copy(positions[0]);
    p.position.add(distances.titlesMobile);

    p2.position.copy(positions[1]);
    p2.position.add(distances.titlesMobile);

    p3.position.copy(positions[2]);
    p3.position.add(distances.titlesMobile);

    desc.position.copy(positions[0]);
    desc.position.add(distances.descriptionMobile);

    desc2.position.copy(positions[1]);
    desc2.position.add(distances.descriptionMobile);

    desc3.position.copy(positions[2]);
    desc3.position.add(distances.descriptionMobile);
  } else {
    p.position.copy(positions[0]);
    p.position.add(distances.titles);

    p2.position.copy(positions[1]);
    p2.position.add(distances.titles);

    p3.position.copy(positions[2]);
    p3.position.add(distances.titles);

    desc.position.copy(positions[0]);
    desc.position.add(distances.description);

    desc2.position.copy(positions[1]);
    desc2.position.add(distances.description);

    desc3.position.copy(positions[2]);
    desc3.position.add(distances.description);
  }

  scene.add(p, p2, p3, desc, desc2, desc3);

  return [para, para2, para3, description, description2, description3];
}
