import gsap from "gsap";
import * as THREE from "three";

import { AssetLoader } from "./systems/AssetLoader";
import { MyCanvas } from "./systems/canvas";
import { CurrentView } from "./systems/navigation";
import { initializeScene } from "./systems/scene";
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
const cssRendererClass = new MyCSSRenderer();
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

// ─── 🔹 Resize handler initialization ─────────────
// ──────────────────────────────────────────────────────────────────
canvas.resizeHandler(perspectiveCamera, renderer);

// ─── 🔹 3D Scene ─────────────
// ──────────────────────────────────────────────────────────────────
const scene = new THREE.Scene();

// ─── 🔹 File management ─────────────
// ──────────────────────────────────────────────────────────────────
const fileAssets = new AssetLoader();
const loadingManager = fileAssets.getManager();
const textures = fileAssets.getTextures();
const objects = fileAssets.getObjects();

// ─── 🔹 Render when all assets are loaded ─────────────
// ──────────────────────────────────────────────────────────────────
loadingManager.onLoad = () => {
  initializeScene(scene, textures, objects);
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
  updateContent(view, scene);
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
