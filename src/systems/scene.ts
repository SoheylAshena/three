import * as THREE from "three";

import { createStarField } from "../scenes/starField";
import { createNebula } from "../scenes/nebula";
import { createSkillsSection } from "../scenes/skills";
import { createProjectsSection } from "../scenes/projects";
import { createContactSection } from "../scenes/contact";

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Initialize Three.JS scene
// ╚════════════════════════════════════════════════════════════════════════╝
export const initializeScene = (textures: Record<string, THREE.Texture>, objects: Record<string, THREE.Object3D>) => {
  const spaceTexture = textures.env;
  const cloudTexture = textures.cloud;
  const skillsData = [
    { texture: textures.html, color: 0xff5e00 },
    { texture: textures.css, color: 0x0044cc },
    { texture: textures.js, color: 0xffff00 },
    { texture: textures.typescript, color: 0x0044cc },
    { texture: textures.react, color: 0x0044cc },
    { texture: textures.next, color: 0xffffff },
    { texture: textures.three, color: 0xffffff },
    { texture: textures.tailwind, color: 0x00ffff },
    { texture: textures.sass, color: 0xff007c },
  ];
  const skillModel = objects.skill;

  const projectsData = [{ texture: "blank" }, { texture: "blank" }, { texture: "blank" }];
  const projectsModel = objects.screen;
  const contactModel = objects.screen;

  // ─── 🔹 Scene creations ─────────────
  // ──────────────────────────────────────────────────────────────────
  const starField = createStarField();
  const nebula = createNebula(cloudTexture);
  const skills = createSkillsSection(skillsData, skillModel);
  const projects = createProjectsSection(projectsData, projectsModel);
  const contact = createContactSection(contactModel);

  // ─── 🔹 Scene configuration ─────────────
  // ──────────────────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  scene.environment = spaceTexture;
  scene.environmentIntensity = 0.5;
  scene.add(starField, ...nebula, ...skills, ...projects, contact);

  return scene;
};
