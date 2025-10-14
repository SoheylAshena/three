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

import type { Object3D } from "three";

export function poseGrid(array: Object3D[], breakpoint: number, distance: number) {
  return array.map((item, index) => {
    const col = index % breakpoint;
    const row = Math.floor(index / breakpoint);
    item.position.z = col * distance;
    item.position.y = -row * distance;
  });
}
