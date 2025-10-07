import gsap from "gsap";

import { AssetLoader } from "./systems/AssetLoader";
import { MyCanvas } from "./systems/canvas";
import { CurrentView } from "./systems/navigation";
import { initializeScene } from "./systems/scene";
import { MyRenderer } from "./systems/renderer";
import { MyCamera } from "./systems/cameras";
import { setupWheelHandler } from "./systems/wheelMove";

import { updateContent } from "./utils/htmlContent";
import { renderNavbar } from "./sections/navbar";

import type { Bounds } from "./types";

import "./style.css";

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Constants
// ╚════════════════════════════════════════════════════════════════════════╝
export const CAMERA_POSITIONS = {
  home: { position: { x: 0, y: 0, z: 0 }, target: { x: 0, y: 0, z: -10 } },
  skills: { position: { x: 4.84, y: -1, z: 0.16 }, target: { x: 10, y: -1, z: 2.62 } },
  projects: { position: { x: -6, y: 0, z: 1 }, target: { x: -10, y: 0, z: -1 } },
  contact: { position: { x: 0, y: 0, z: 2 }, target: { x: 0, y: 0, z: 10 } },
  homeMobile: { position: { x: 0, y: 0, z: 0 }, target: { x: 0, y: 0, z: -10 } },
  skillsMobile: { position: { x: 1.5, y: -1, z: -3 }, target: { x: 10, y: -1, z: 1 } },
  projectsMobile: { position: { x: 0, y: -2, z: 0 }, target: { x: -10, y: -2, z: 0 } },
  contactMobile: { position: { x: 0, y: 0, z: -7 }, target: { x: 0, y: 0, z: 10 } },
};
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

// ─── 🔹 Scene camera ─────────────
// ──────────────────────────────────────────────────────────────────
const camera = new MyCamera(canvasElement);
const perspectiveCamera = camera.getCamera();
const cameraControls = camera.getControls();
const cameraPosition = perspectiveCamera.position;
const cameraTarget = cameraControls.target;
export const moveCamera = camera.moveCamera;
export const setTarget = camera.setTarget;

// ─── 🔹 Resize handler initialization ─────────────
// ──────────────────────────────────────────────────────────────────
canvas.resizeHandler(perspectiveCamera, renderer);

// ─── 🔹 File management ─────────────
// ──────────────────────────────────────────────────────────────────
const fileAssets = new AssetLoader();
const loadingManager = fileAssets.getManager();
const textures = fileAssets.getTextures();
const objects = fileAssets.getObjects();

loadingManager.onLoad = () => {
  const scene = initializeScene(textures, objects);

  const renderLoop = () => {
    cameraControls.update();
    renderer.render(scene, perspectiveCamera);
  };

  gsap.ticker.add(renderLoop);
};

// ╔════════════════════════════════════════════════════════════════════════╗
// |   HTML content logic
// ╚════════════════════════════════════════════════════════════════════════╝
const currentView = new CurrentView();
const container = document.getElementById("text")!;

currentView.onViewChange((view) => {
  updateContent(view, container, moveCamera, setTarget);
});

currentView.setView("home");
// ╔════════════════════════════════════════════════════════════════════════╗
// |   Navbar logic
// ╚════════════════════════════════════════════════════════════════════════╝

renderNavbar(currentView.setView);

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Scroll handling per view
// ╚════════════════════════════════════════════════════════════════════════╝

const viewBounds: Record<string, Bounds> = {
  home: {
    minY: CAMERA_POSITIONS.home.position.y,
    maxY: CAMERA_POSITIONS.home.position.y,
    step: 0.5,
  },
  skills: {
    minY: CAMERA_POSITIONS.skills.position.y,
    maxY: CAMERA_POSITIONS.skills.position.y,
    step: 0.5,
  },
  projects: {
    minY: CAMERA_POSITIONS.projects.position.y - 4,
    maxY: CAMERA_POSITIONS.projects.position.y,
    step: 0.5,
  },
  contact: {
    minY: CAMERA_POSITIONS.contact.position.y,
    maxY: CAMERA_POSITIONS.contact.position.y,
    step: 0.5,
  },
};

setupWheelHandler(cameraPosition, cameraTarget, viewBounds, currentView.onViewChange);
