import gsap from "gsap";
import * as THREE from "three";

import { AssetLoader } from "./systems/AssetLoader";
import { MyCanvas } from "./systems/canvas";
import { CurrentView } from "./systems/navigation";
import { MyRenderer } from "./systems/renderer";
import { MyCamera } from "./systems/cameras";
import { setupWheelHandler } from "./systems/wheelMove";
import { setupTouchHandler } from "./systems/touchMove";
import { navigatgeCamera } from "./systems/cameraMove";
import { updateContent } from "./systems/htmlContent";

import { renderNavbar } from "./sections/navbar";

import { CAMERA_POSITIONS, viewBounds } from "./constants";

import "./style.css";
import { MyCSSRenderer } from "./systems/cssRenderer";
import { createStarField } from "./scenes/starField";
import { createNebula } from "./scenes/nebula";
import { createSkillsSection } from "./scenes/skills";
import { createProjectsSection } from "./scenes/projects";
import { createContactSection } from "./scenes/contact";
import { isMobile } from "./utils/isMobile";

// ═════════════════════════════════════════════════════════════════════════
// |||   Three.JS logic
// ═════════════════════════════════════════════════════════════════════════

// ─── 🔹 Canvas ─────────────
// ──────────────────────────────────────────────────────────────────
const canvas = new MyCanvas();
const canvasElement = canvas.getCanvas();

// ─── 🔹 WebGL renderer ─────────────
// ──────────────────────────────────────────────────────────────────
const webGlRenderer = new MyRenderer(canvasElement);
const renderer = webGlRenderer.getRenderer();

// ─── 🔹 CSS renderer ─────────────
// ──────────────────────────────────────────────────────────────────
const cssRendererClass = new MyCSSRenderer(canvasElement);
const cssRenderer = cssRendererClass.getRenderer();

// ─── 🔹 Scene camera ─────────────
// ──────────────────────────────────────────────────────────────────
const camera = new MyCamera(canvasElement);
export const perspectiveCamera = camera.getCamera();
const cameraControls = camera.getControls();
const cameraPosition = perspectiveCamera.position;
const cameraTarget = cameraControls.target;
export const moveCamera = camera.moveCamera;
export const setTarget = camera.setTarget;

// ─── 🔹 3D Scene ─────────────
// ──────────────────────────────────────────────────────────────────
const scene = new THREE.Scene();

// ─── 🔹 File management ─────────────
// ──────────────────────────────────────────────────────────────────
const fileAssets = new AssetLoader();
const loadingManager = fileAssets.getManager();
const textures = fileAssets.getTextures();
const objects = fileAssets.getObjects();

let positions: {};

// ─── 🔹 Render when all assets are loaded ─────────────
// ──────────────────────────────────────────────────────────────────
loadingManager.onLoad = () => {
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
  const projectsData = [{ texture: "blank" }, { texture: "blank" }, { texture: "blank" }];

  const skillModel = objects.skill;
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
  scene.environment = spaceTexture;
  scene.environmentIntensity = 0.5;

  if (!isMobile()) {
    scene.add(...nebula);
  }

  positions = {
    project1Position: projects[0].position,
    project2Position: projects[1].position,
    project3Position: projects[2].position,
    skillsPosition: skills[2].position,
  };

  scene.add(starField, ...skills, ...projects, contact);
};

// ─── 🔹 Render animation ─────────────
// ──────────────────────────────────────────────────────────────────

const renderLoop = () => {
  cameraControls.update();
  renderer.render(scene, perspectiveCamera);
  cssRenderer.render(scene, perspectiveCamera);
};
gsap.ticker.add(renderLoop);

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Navigation logic
// ╚════════════════════════════════════════════════════════════════════════╝
const currentView = new CurrentView();

// ─── 🔹 Camera movement ─────────────
// ──────────────────────────────────────────────────────────────────
currentView.addToListener((view) => {
  navigatgeCamera(view, CAMERA_POSITIONS, moveCamera, setTarget);
});

// ─── 🔹 Html content ─────────────
// ──────────────────────────────────────────────────────────────────
currentView.addToListener((view) => {
  updateContent(view, scene, positions);
});

// ─── 🔹 Initial view ─────────────
// ──────────────────────────────────────────────────────────────────
currentView.setView("home");

// ─── 🔹 Navbar element ─────────────
// ──────────────────────────────────────────────────────────────────
renderNavbar(currentView.setView);

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Touch and mouse handling per view
// ╚════════════════════════════════════════════════════════════════════════╝
setupTouchHandler(cameraPosition, cameraTarget, viewBounds, currentView.addToListener);
setupWheelHandler(cameraPosition, cameraTarget, viewBounds, currentView.addToListener);

// ─── 🔹 Resize handler initialization ─────────────
// ──────────────────────────────────────────────────────────────────
function resizeCallbacks() {}

canvas.resizeHandler(perspectiveCamera, renderer, resizeCallbacks);
