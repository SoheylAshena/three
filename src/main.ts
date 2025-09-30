import { LoadingManager } from "three";
import { canvasResizeHandler, selectCanvas } from "./utils/canvas";
import { initializeRenderer } from "./utils/renderer";
import { initializeCameras } from "./utils/cameras";
import { loadAssets } from "./utils/assetManager";

import "./style.css";
import { initializeScene, renderScene } from "./utils/scene";
import { create3DObjects, createGeometries, createLights, createMaterials } from "./utils/createData";
import { createHomeSection } from "./sections/home";
import { createProjectsSection } from "./sections/projects";
import { createContactSection } from "./sections/contact";
import { createSkillsSection } from "./sections/skills";

// ═════════════════════════════════════════════════════════════════════════
// |||   Three.JS initialization
// ═════════════════════════════════════════════════════════════════════════
const canvas = selectCanvas();
const renderer = initializeRenderer(canvas);
const { mainCamera, mainCameraControls } = initializeCameras(canvas);

// ═════════════════════════════════════════════════════════════════════════
// |||   Scene intialization after asset loading
// ═════════════════════════════════════════════════════════════════════════
const loadingManager = new LoadingManager();
loadAssets(loadingManager);

// ─── 🔹 Crate and render scene after loading assets ─────────────
// ──────────────────────────────────────────────────────────────────

loadingManager.onLoad = () => {
  createLights();
  createMaterials();
  createGeometries();
  create3DObjects();

  const home = createHomeSection();
  const projects = createProjectsSection();
  const contact = createContactSection();
  const skills = createSkillsSection();

  const scene = initializeScene();

  scene.add(home, contact, ...skills, ...projects);

  renderScene(renderer, mainCamera, scene, mainCameraControls);
};

// ═════════════════════════════════════════════════════════════════════════
// |||   Resize even handler for canvas
// ═════════════════════════════════════════════════════════════════════════
canvasResizeHandler(mainCamera, renderer);
