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

import { Font, TextGeometry } from "three/examples/jsm/Addons.js";

export const textGeo = (text: string, font: Font) =>
  new TextGeometry(text, {
    font,
    depth: 0.1,
    size: 0.5,
  });
