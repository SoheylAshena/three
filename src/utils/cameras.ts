import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { assets } from "../globalData";

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Initialize Camera and Control
// ╚════════════════════════════════════════════════════════════════════════╝
export const initializeCameras = (canvas: HTMLCanvasElement) => {
  // ─── 🔹 Camera ─────────────
  // ──────────────────────────────────────────────────────────────────
  const fov = 45;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const mainCamera = new PerspectiveCamera(fov, aspect);
  mainCamera.position.set(0, 0, 10);

  // ─── 🔹 Control ─────────────
  // ──────────────────────────────────────────────────────────────────
  const mainCameraControls = new OrbitControls(mainCamera, canvas);
  mainCameraControls.enableDamping = true;

  // ─── 🔹 Exporting to assets ─────────────
  // ──────────────────────────────────────────────────────────────────
  assets.cameras.main = mainCamera;
  assets.controls.mainOrbitControl = mainCameraControls;

  return { mainCamera, mainCameraControls };
};
