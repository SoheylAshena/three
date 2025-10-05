import * as THREE from "three";
import type { AssetLoader } from "./AssetLoader";

import { createStarField } from "../scenes/starField";
import { createNebula } from "../scenes/nebula";
import { createSkillsSection } from "../scenes/skills";
import { createProjectsSection } from "../scenes/projects";
import { createContactSection } from "../scenes/contact";

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Initialize Three.JS scene
// ╚════════════════════════════════════════════════════════════════════════╝
export const initializeScene = (staticAssets: AssetLoader) => {
  // ─── 🔹 Scene creations ─────────────
  // ──────────────────────────────────────────────────────────────────
  const starField = createStarField();
  const nebula = createNebula(staticAssets);
  const skills = createSkillsSection(staticAssets);
  const projects = createProjectsSection(staticAssets);
  const contact = createContactSection(staticAssets);

  // ─── 🔹 Scene configuration ─────────────
  // ──────────────────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  scene.environment = staticAssets.textures.env;
  scene.environmentIntensity = 0.5;
  scene.add(starField, ...nebula, ...skills, ...projects, contact);

  return scene;
};
