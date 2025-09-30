import * as THREE from "three";
import { FontLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import { assets } from "../globalData";

import spaceTex from "../assets/Env.jpg";
import cssTex from "../assets/css.png";
import htmlTex from "../assets/html.png";
import jsTex from "../assets/js.png";
import tsTex from "../assets/typescript.png";
import threeTex from "../assets/three.png";
import nextTex from "../assets/next-js.png";
import tailwindTex from "../assets/tailwind.png";
import reactTex from "../assets/react.png";
import sassTex from "../assets/sass.jpg";
import screenObj from "../assets/screen.obj";
import skillObj from "../assets/skill.obj";

// ╔════════════════════════════════════════════════════════════════════════╗
// |   Loading async assets
// ╚════════════════════════════════════════════════════════════════════════╝
export const loadAssets = (fontAndTextureManager: THREE.LoadingManager) => {
  // ─── 🔹 Initialize loaders ─────────────
  // ──────────────────────────────────────────────────────────────────
  const fontLoader = new FontLoader(fontAndTextureManager);
  const textureLoader = new THREE.TextureLoader(fontAndTextureManager);
  const objLoader = new OBJLoader(fontAndTextureManager);

  // ─── 🔹 Loading Assets ─────────────
  // ──────────────────────────────────────────────────────────────────

  textureLoader.load(spaceTex, (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    assets.textures.env = texture;
  });

  textureLoader.load(tsTex, (typescript) => {
    typescript.colorSpace = THREE.SRGBColorSpace;
    assets.textures.typescript = typescript;
  });

  textureLoader.load(htmlTex, (html) => {
    html.colorSpace = THREE.SRGBColorSpace;
    assets.textures.html = html;
  });

  textureLoader.load(cssTex, (css) => {
    css.colorSpace = THREE.SRGBColorSpace;
    assets.textures.css = css;
  });

  textureLoader.load(jsTex, (js) => {
    js.colorSpace = THREE.SRGBColorSpace;
    assets.textures.js = js;
  });

  textureLoader.load(threeTex, (three) => {
    three.colorSpace = THREE.SRGBColorSpace;
    assets.textures.three = three;
  });

  textureLoader.load(tailwindTex, (tailwind) => {
    tailwind.colorSpace = THREE.SRGBColorSpace;
    assets.textures.tailwind = tailwind;
  });

  textureLoader.load(sassTex, (sass) => {
    sass.colorSpace = THREE.SRGBColorSpace;
    assets.textures.sass = sass;
  });

  textureLoader.load(reactTex, (react) => {
    react.colorSpace = THREE.SRGBColorSpace;
    assets.textures.react = react;
  });

  textureLoader.load(nextTex, (next) => {
    next.colorSpace = THREE.SRGBColorSpace;
    assets.textures.next = next;
  });

  fontLoader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
    assets.fonts.simple = font;
  });

  objLoader.load(screenObj, (screen) => {
    screen.scale.set(0.1, 0.1, 0.1);
    assets.objects.screen = screen;
  });

  objLoader.load(skillObj, (skill) => {
    skill.scale.set(0.1, 0.1, 0.1);
    assets.objects.skill = skill;
  });
};
