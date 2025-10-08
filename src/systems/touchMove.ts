import gsap from "gsap";
import * as THREE from "three";
import type { Bounds } from "../types";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function applyTouchMove(
  camPos: { y: number },
  tgtPos: { y: number },
  deltaY: number,
  bounds: Bounds
): void {
  const distance = deltaY < 0 ? bounds.step : -bounds.step;

  const newCamY = clamp(camPos.y - distance, bounds.minY, bounds.maxY);
  const newTgtY = clamp(tgtPos.y - distance, bounds.minY, bounds.maxY);

  if (newCamY === camPos.y && newTgtY === tgtPos.y) return;

  gsap.to(camPos, { y: newCamY });
  gsap.to(tgtPos, { y: newTgtY });
}

export function setupTouchHandler(
  cameraPosition: THREE.Vector3,
  cameraTarget: THREE.Vector3,
  bounds: Record<string, Bounds>,
  addToListener: (callback: (view: string) => void) => void
): void {
  let activeTouchMoveHandler: ((e: TouchEvent) => void) | null = null;
  let activeTouchStartHandler: ((e: TouchEvent) => void) | null = null;

  let lastX = 0;
  let lastY = 0;

  const updateTouchHandlers = (viewName: string): void => {
    if (activeTouchStartHandler) window.removeEventListener("touchstart", activeTouchStartHandler);
    if (activeTouchMoveHandler) window.removeEventListener("touchmove", activeTouchMoveHandler);

    const bound = bounds[viewName];
    if (!bound) return;

    activeTouchStartHandler = (e: TouchEvent) => {
      const t = e.touches[0];
      lastX = t.clientX;
      lastY = t.clientY;
    };

    activeTouchMoveHandler = (e: TouchEvent) => {
      const t = e.touches[0];
      const dx = t.clientX - lastX;
      const dy = t.clientY - lastY;
      console.log(dx);

      applyTouchMove(cameraPosition, cameraTarget, dy, bound);

      lastX = t.clientX;
      lastY = t.clientY;
    };

    window.addEventListener("touchstart", activeTouchStartHandler, { passive: true });
    window.addEventListener("touchmove", activeTouchMoveHandler, { passive: false });
  };

  addToListener(updateTouchHandlers);
}
