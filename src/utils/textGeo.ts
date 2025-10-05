import { Font, TextGeometry } from "three/examples/jsm/Addons.js";

export const textGeo = (text: string, font: Font) =>
  new TextGeometry(text, {
    font,
    depth: 0.1,
    size: 0.5,
  });
