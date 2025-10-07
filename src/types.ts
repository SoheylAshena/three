import type { BufferGeometry, PerspectiveCamera, Texture, Object3D, Light, Material } from "three";
import type { Font, OrbitControls } from "three/examples/jsm/Addons.js";
import { CAMERA_POSITIONS } from "./constants";

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

export type Bounds = {
  minY: number;
  maxY: number;
  step: number;
};

export type Positions = typeof CAMERA_POSITIONS;
