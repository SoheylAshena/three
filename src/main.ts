import { MyRenderer } from "./systems/renderer";
import { MyCamera } from "./systems/cameras";

import "./style.css";
import { initializeScene } from "./systems/scene";

import { AssetLoader } from "./systems/AssetLoader";
import gsap from "gsap";
import { MyCanvas } from "./systems/canvas";

// ═════════════════════════════════════════════════════════════════════════
// |||   Three.JS initialization
// ═════════════════════════════════════════════════════════════════════════
const canvas = new MyCanvas();
const renderer = new MyRenderer(canvas.canvas);
const camera = new MyCamera(canvas.canvas);

const staticAssets = new AssetLoader();

staticAssets.loadingManager.onLoad = () => {
  const scene = initializeScene(staticAssets);
  const render = () => {
    camera.controls.update();
    renderer.renderer.render(scene, camera.camera);
  };
  gsap.ticker.add(render);
};

const container = document.getElementById("text");
const home = document.createElement("p");
home.textContent = "Hello";
container?.appendChild(home);
console.log(home, container);

canvas.resizeHandler(camera.camera, renderer.renderer);
