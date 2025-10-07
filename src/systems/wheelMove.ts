import gsap from "gsap";
import * as THREE from "three";
import type { Bounds } from "../types";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function applyWheelMove(camPos: { y: number }, tgtPos: { y: number }, deltaY: number, bounds: Bounds): void {
  const distance = deltaY < 0 ? -bounds.step : bounds.step;

  const newCamY = clamp(camPos.y - distance, bounds.minY, bounds.maxY);
  const newTgtY = clamp(tgtPos.y - distance, bounds.minY, bounds.maxY);

  if (newCamY === camPos.y && newTgtY === tgtPos.y) return;

  gsap.to(camPos, { y: newCamY });
  gsap.to(tgtPos, { y: newTgtY });
}

export function setupWheelHandler(
  cameraPosition: THREE.Vector3,
  cameraTarget: THREE.Vector3,
  bounds: Record<string, Bounds>,
  onViewChange: (callback: (view: string) => void) => void
): void {
  let activeHandler: (e: WheelEvent) => void;

  const updateWheelHandler = (viewName: string): void => {
    if (activeHandler) window.removeEventListener("wheel", activeHandler);

    const bound = bounds[viewName];
    if (!bound) return;

    activeHandler = (event: WheelEvent) => {
      applyWheelMove(cameraPosition, cameraTarget, event.deltaY, bound);
    };

    window.addEventListener("wheel", activeHandler, { passive: true });
  };

  onViewChange(updateWheelHandler);
}
