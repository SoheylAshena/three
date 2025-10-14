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
import { Font, OBJLoader } from "three/examples/jsm/Addons.js";

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
import cloudLowTex from "../assets/low.png";
import spoonTex from "../assets/Spoonacular.jpg";
import toodooTex from "../assets/TooDoo.jpg";
import spacexTex from "../assets/spacex.jpg";

export class AssetLoader {
  private loadingManager = new THREE.LoadingManager();

  private textureLoader = new THREE.TextureLoader(this.loadingManager);
  private objLoader = new OBJLoader(this.loadingManager);

  private textures: Record<string, THREE.Texture> = {};
  private fonts: Record<string, Font> = {};
  private objects: Record<string, THREE.Object3D> = {};

  getTextures() {
    return this.textures;
  }
  getFonts() {
    return this.fonts;
  }
  getObjects() {
    return this.objects;
  }

  getManager() {
    return this.loadingManager;
  }

  constructor() {
    this.textureLoader.load(spaceTex, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.textures.env = texture;
    });

    this.textureLoader.load(cloudLowTex, (texture) => {
      this.textures.cloud = texture;
    });

    this.textureLoader.load(tsTex, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.typescript = texture;
    });

    this.textureLoader.load(htmlTex, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.html = texture;
    });

    this.textureLoader.load(cssTex, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.css = texture;
    });

    this.textureLoader.load(jsTex, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.js = texture;
    });

    this.textureLoader.load(threeTex, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.three = texture;
    });

    this.textureLoader.load(tailwindTex, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.tailwind = texture;
    });

    this.textureLoader.load(sassTex, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.sass = texture;
    });

    this.textureLoader.load(reactTex, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.react = texture;
    });

    this.textureLoader.load(nextTex, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.next = texture;
    });
    this.textureLoader.load(toodooTex, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.toodoo = texture;
    });
    this.textureLoader.load(spoonTex, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.spoon = texture;
    });
    this.textureLoader.load(spacexTex, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.spacex = texture;
    });

    this.objLoader.load(screenObj, (object) => {
      object.scale.set(0.1, 0.1, 0.1);
      this.objects.screen = object;
    });

    this.objLoader.load(skillObj, (object) => {
      object.scale.set(0.1, 0.1, 0.1);
      this.objects.skill = object;
    });
  }
}
