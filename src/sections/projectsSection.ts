/*─────────────────────────────────────────────────────────────────────────────
│                                                                             │
│      © 2025 — Soheyl Ashena                                                 │
│      Licensed under the MIT License.                                        │
│      You must retain this notice in any copies or derivative works.         │
│                                                                             │
│      Original Author: Soheyl Ashena                                         │
│      Unauthorized removal of attribution is prohibited.                     │
│                                                                             │
─────────────────────────────────────────────────────────────────────────────*/

import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/Addons.js";
import { isMobile } from "../utils/isMobile";

// --- Create elements for each project ---
const projects = [
  {
    title: "3D Portfolio",
    desc: "An interactive 3D experience built with Three.js and GSAP animations.",
  },
  {
    title: "Task Manager",
    desc: "A productivity web app with smooth UI transitions and intuitive design.",
  },
  {
    title: "Recipe Finder",
    desc: "A clean, fast app that helps you discover and save recipes from around the world.",
  },
];

const projectLabels = projects.map((proj) => {
  const div = document.createElement("div");
  div.classList.add("project-section");

  const title = document.createElement("h1");
  title.textContent = proj.title;
  title.classList.add("projectTitle");

  const description = document.createElement("p");
  description.textContent = proj.desc;
  description.classList.add("projectDesc");

  div.appendChild(title);
  div.appendChild(description);

  const divObject = new CSS2DObject(div);

  return { divObject, div };
});

// --- Positioning distances ---
const distances = {
  desktop: new THREE.Vector3(0, 0, -3.75),
  mobile: new THREE.Vector3(0, -1.75, 0),
};

// --- Render projects dynamically in 3D ---
export function renderDynamicProjects(scene: THREE.Scene, positions: any) {
  const mobile = isMobile();

  projectLabels.forEach((proj, i) => {
    const titleOffset = mobile ? distances.mobile : distances.desktop;

    proj.divObject.position.copy(positions[i]).add(titleOffset);

    scene.add(proj.divObject);
  });

  return projectLabels.map((p) => p.div);
}
