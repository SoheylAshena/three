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
import gsap from "gsap";

import { AssetLoader } from "./systems/AssetLoader";
import { MyCanvas } from "./systems/canvas";
import { CurrentView } from "./systems/navigation";
import { MyRenderer } from "./systems/renderer";
import { MyCamera } from "./systems/cameras";
import { setupWheelHandler } from "./systems/wheelMove";
import { setupTouchHandler } from "./systems/touchMove";
import { navigatgeCamera } from "./systems/cameraMove";
import { updateContent } from "./systems/htmlContent";
import { MyCSS3DRenderer, MyCSSRenderer } from "./systems/cssRenderer";

import { StarField } from "./scenes/starField";
import { Nebula } from "./scenes/nebula";
import { Skills } from "./scenes/skills";
import { Projects } from "./scenes/projects";
import { ContactContent } from "./scenes/contact";

import { isMobile } from "./utils/isMobile";

import { CAMERA_POSITIONS, viewBounds } from "./constants";

import { renderNavbar } from "./sections/navbar";

import "./style.css";
import { ModalHandler } from "./sections/modalHandler";

// ═════════════════════════════════════════════════════════════════════════
// |||   Three.JS logic
// ═════════════════════════════════════════════════════════════════════════
const currentView = new CurrentView();

// ─── 🔹 Canvas ─────────────
// ──────────────────────────────────────────────────────────────────
const canvas = new MyCanvas();

const canvasElement = canvas.getCanvas();

// ─── 🔹 WebGL renderer ─────────────
// ──────────────────────────────────────────────────────────────────
const webGlRenderer = new MyRenderer(canvasElement);

const renderer = webGlRenderer.getRenderer();

// ─── 🔹 CSS renderers ─────────────
// ──────────────────────────────────────────────────────────────────
const cssRendererManager = new MyCSSRenderer(canvasElement);
const cssRenderer = cssRendererManager.getRenderer();

const css3DRendererManager = new MyCSS3DRenderer(canvasElement);
const css3DRenderer = css3DRendererManager.getRenderer();

// ─── 🔹 Scene camera ─────────────
// ──────────────────────────────────────────────────────────────────
const camera = new MyCamera(canvasElement);

export const perspectiveCamera = camera.getCamera();
const cameraControls = camera.getControls();
export const moveCamera = camera.moveCamera;
export const setTarget = camera.setTarget;
const cameraPosition = perspectiveCamera.position;
const cameraTarget = cameraControls.target;

// ─── 🔹 3D Scene ─────────────
// ──────────────────────────────────────────────────────────────────
const scene = new THREE.Scene();

const starFieldManager = new StarField();
const nebulaManager = new Nebula();
const skillsManager = new Skills();
const projectsManager = new Projects();
const contactHTMLManager = new ContactContent();

// ─── 🔹 File management ─────────────
// ──────────────────────────────────────────────────────────────────
const fileAssetsManager = new AssetLoader();

const loadingManager = fileAssetsManager.getManager();
const textures = fileAssetsManager.getTextures();
const objects = fileAssetsManager.getObjects();

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
  const projectsData = [
    {
      texture: textures.spacex,
      demo: "https://sohyl.me",
      src: "https://github.com/soheylashena/three",
    },
    {
      texture: textures.toodoo,
      demo: "https://toodoo.sohyl.me",
      src: "https://github.com/soheylashena/TooDoo",
    },
    {
      texture: textures.spoon,
      demo: "https://food.sohyl.me",
      src: "https://github.com/SoheylAshena/Spoonacular-recipe-finder",
    },
  ];

  const skillModel = objects.skill;
  const projectsModel = objects.screen;

  // ─── 🔹 Scene creations ─────────────
  // ──────────────────────────────────────────────────────────────────
  const starField = starFieldManager.create();
  const nebula = nebulaManager.create(cloudTexture);
  const skills = skillsManager.create(skillsData, skillModel);
  const projects = projectsManager.create(projectsData, projectsModel);
  const contactHTML = contactHTMLManager.getObject();

  // ─── 🔹 Scene configuration ─────────────
  // ──────────────────────────────────────────────────────────────────
  scene.environment = spaceTexture;
  scene.environmentIntensity = 0.5;

  if (!isMobile()) {
    scene.add(...nebula);
  }

  scene.add(starField, ...skills, ...projects, contactHTML);

  currentView.setView("home");
};

// ─── 🔹 Render animation ─────────────
// ──────────────────────────────────────────────────────────────────
const renderLoop = () => {
  cameraControls.update();
  renderer.render(scene, perspectiveCamera);
  cssRenderer.render(scene, perspectiveCamera);
  css3DRenderer.render(scene, perspectiveCamera);
};

gsap.ticker.add(renderLoop);

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Navigation logic
// ╚════════════════════════════════════════════════════════════════════════╝

// ─── 🔹 Camera movement ─────────────
// ──────────────────────────────────────────────────────────────────
currentView.addToListener((view) => {
  navigatgeCamera(view, CAMERA_POSITIONS, moveCamera, setTarget);
});

// ─── 🔹 Html content ─────────────
// ──────────────────────────────────────────────────────────────────
currentView.addToListener((view) => {
  const projectsPositions = projectsManager.getPositions();
  const skillsPositions = skillsManager.getPositions();
  const positions = { projectsPositions, skillsPositions };
  updateContent(view, scene, positions);
});

// ─── 🔹 Navbar element ─────────────
// ──────────────────────────────────────────────────────────────────
renderNavbar(currentView.setView);

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Touch and mouse handling per view
// ╚════════════════════════════════════════════════════════════════════════╝
setupTouchHandler(cameraPosition, cameraTarget, viewBounds, currentView.addToListener);
setupWheelHandler(cameraPosition, cameraTarget, viewBounds, currentView.addToListener);

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Resize handler initialization
// ╚════════════════════════════════════════════════════════════════════════╝
function resizeCallbacks() {
  projectsManager.updatePositions();
  currentView.setView(currentView.getView());
}

canvas.resizeHandler(perspectiveCamera, [renderer, cssRenderer, css3DRenderer], resizeCallbacks);

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Ray Caster and handler
// ╚════════════════════════════════════════════════════════════════════════╝
const modalHandler = new ModalHandler();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  if (modalHandler.isOpen) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, perspectiveCamera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0 && !modalHandler.isOpen) {
    const clickedObject = intersects[0].object;
    const data = clickedObject.userData;

    if (data.src && data.demo) {
      modalHandler.open(data.src, data.demo);
    }
  }
});
