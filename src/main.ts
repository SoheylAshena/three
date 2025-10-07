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
  home: { minY: 0, maxY: 0, step: 0.5 },
  skills: { minY: -1, maxY: -1, step: 0.5 },
  projects: { minY: -4, maxY: 0, step: 0.5 },
  contact: { minY: 0, maxY: 0, step: 0.5 },
};

setupWheelHandler(cameraPosition, cameraTarget, viewBounds, currentView.onViewChange);
