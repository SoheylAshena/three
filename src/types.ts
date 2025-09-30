import type { BufferGeometry, PerspectiveCamera, Texture, Object3D, Light, Material } from "three";
import type { Font, OrbitControls } from "three/examples/jsm/Addons.js";

export type Assets = {
  objects: Record<string, Object3D>;
  textures: Record<string, Texture>;
  fonts: Record<string, Font>;
  lights: Record<string, Light>;
  cameras: Record<string, PerspectiveCamera>;
  geometries: Record<string, BufferGeometry>;
  controls: Record<string, OrbitControls>;
  materials: Record<string, Material>;
};
