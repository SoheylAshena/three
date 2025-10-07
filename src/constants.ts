import type { Bounds } from "./types";
import { isMobile } from "./utils/isMobile";

export const CAMERA_POSITIONS = {
  home: { position: { x: 0, y: 0, z: 0 }, target: { x: 0, y: 0, z: -10 } },
  skills: { position: { x: 4.84, y: -1, z: 0.16 }, target: { x: 10, y: -1, z: 2.62 } },
  projects: { position: { x: -6, y: 0, z: 1 }, target: { x: -10, y: 0, z: -1 } },
  contact: { position: { x: 0, y: 0, z: 2 }, target: { x: 0, y: 0, z: 10 } },
  homeMobile: { position: { x: 0, y: 0, z: 0 }, target: { x: 0, y: 0, z: -10 } },
  skillsMobile: { position: { x: 1.5, y: -1, z: -3 }, target: { x: 10, y: -1, z: 1 } },
  projectsMobile: { position: { x: 0, y: -2, z: 0 }, target: { x: -10, y: -2, z: 0 } },
  contactMobile: { position: { x: 0, y: 0, z: -7 }, target: { x: 0, y: 0, z: 10 } },
};
export const viewBounds: Record<string, Bounds> = {
  home: {
    minY: CAMERA_POSITIONS.home.position.y,
    maxY: CAMERA_POSITIONS.home.position.y,
    step: 0.5,
  },
  skills: {
    minY: CAMERA_POSITIONS.skills.position.y,
    maxY: CAMERA_POSITIONS.skills.position.y,
    step: 0.5,
  },
  projects: {
    minY: CAMERA_POSITIONS.projects.position.y + (isMobile() ? -8 : -4),
    maxY: CAMERA_POSITIONS.projects.position.y,
    step: 0.5,
  },
  contact: {
    minY: CAMERA_POSITIONS.contact.position.y,
    maxY: CAMERA_POSITIONS.contact.position.y,
    step: 0.5,
  },
};
