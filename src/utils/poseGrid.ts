import type { Object3D } from "three";

export function poseGrid(array: Object3D[], breakpoint: number, distance: number) {
  return array.map((item, index) => {
    const col = index % breakpoint;
    const row = Math.floor(index / breakpoint);
    item.position.z = col * distance;
    item.position.y = -row * distance;
  });
}
