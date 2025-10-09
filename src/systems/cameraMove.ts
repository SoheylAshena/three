import type { Positions } from "../types";
import { isMobile } from "../utils/isMobile";

export function navigatgeCamera(
  view: string,
  positions: Positions,
  moveCamera: (x: number, y: number, z: number) => void,
  setTarget: (x: number, y: number, z: number) => void
) {
  const homePointer = isMobile() ? "homeMobile" : "home";
  const skillsPointer = isMobile() ? "skillsMobile" : "skills";
  const projectsPointer = isMobile() ? "projectsMobile" : "projects";
  const contactPointer = isMobile() ? "contactMobile" : "contact";

  switch (view) {
    case "home":
      moveCamera(
        positions[homePointer].position.x,
        positions[homePointer].position.y,
        positions[homePointer].position.z
      );
      setTarget(
        positions[homePointer].target.x,
        positions[homePointer].target.y,
        positions[homePointer].target.z
      );
      break;
    case "skills":
      moveCamera(
        positions[skillsPointer].position.x,
        positions[skillsPointer].position.y,
        positions[skillsPointer].position.z
      );
      setTarget(
        positions[skillsPointer].target.x,
        positions[skillsPointer].target.y,
        positions[skillsPointer].target.z
      );
      break;
    case "projects":
      moveCamera(
        positions[projectsPointer].position.x,
        positions[projectsPointer].position.y,
        positions[projectsPointer].position.z
      );
      setTarget(
        positions[projectsPointer].target.x,
        positions[projectsPointer].target.y,
        positions[projectsPointer].target.z
      );
      break;
    case "contact":
      moveCamera(
        positions[contactPointer].position.x,
        positions[contactPointer].position.y,
        positions[contactPointer].position.z
      );
      setTarget(
        positions[contactPointer].target.x,
        positions[contactPointer].target.y,
        positions[contactPointer].target.z
      );
      break;
  }
}
