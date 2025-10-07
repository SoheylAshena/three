import gsap from "gsap";
import { renderHomeSection } from "../sections/homeSection";
import { renderProjectsSection } from "../sections/projectsSection";
import { renderSkillsSection } from "../sections/skillsSection";
import { CAMERA_POSITIONS } from "../main";
import { isMobile } from "./isMobile";

const animateContent = (renderFunc: (container: HTMLElement) => void, container: HTMLElement) => {
  gsap.to(container, {
    opacity: 0,
    onComplete: () => {
      container.innerHTML = "";
      renderFunc(container);
      gsap.to(container, { opacity: 1 });
    },
  });
};

const homePointer = isMobile() ? "homeMobile" : "home";
const skillsPointer = isMobile() ? "skillsMobile" : "skills";
const projectsPointer = isMobile() ? "projectsMobile" : "projects";
const contactPointer = isMobile() ? "contactMobile" : "contact";

export function updateContent(
  view: string,
  container: HTMLElement,
  moveCamera: (x: number, y: number, z: number) => void,
  setTarget: (x: number, y: number, z: number) => void
) {
  switch (view) {
    case "home":
      animateContent(renderHomeSection, container);
      moveCamera(
        CAMERA_POSITIONS[homePointer].position.x,
        CAMERA_POSITIONS[homePointer].position.y,
        CAMERA_POSITIONS[homePointer].position.z
      );
      setTarget(
        CAMERA_POSITIONS[homePointer].target.x,
        CAMERA_POSITIONS[homePointer].target.y,
        CAMERA_POSITIONS[homePointer].target.z
      );
      break;
    case "skills":
      animateContent(renderSkillsSection, container);
      moveCamera(
        CAMERA_POSITIONS[skillsPointer].position.x,
        CAMERA_POSITIONS[skillsPointer].position.y,
        CAMERA_POSITIONS[skillsPointer].position.z
      );
      setTarget(
        CAMERA_POSITIONS[skillsPointer].target.x,
        CAMERA_POSITIONS[skillsPointer].target.y,
        CAMERA_POSITIONS[skillsPointer].target.z
      );
      break;
    case "projects":
      animateContent(renderProjectsSection, container);
      moveCamera(
        CAMERA_POSITIONS[projectsPointer].position.x,
        CAMERA_POSITIONS[projectsPointer].position.y,
        CAMERA_POSITIONS[projectsPointer].position.z
      );
      setTarget(
        CAMERA_POSITIONS[projectsPointer].target.x,
        CAMERA_POSITIONS[projectsPointer].target.y,
        CAMERA_POSITIONS[projectsPointer].target.z
      );
      break;
    case "contact":
      container.innerHTML = "";
      moveCamera(
        CAMERA_POSITIONS[contactPointer].position.x,
        CAMERA_POSITIONS[contactPointer].position.y,
        CAMERA_POSITIONS[contactPointer].position.z
      );
      setTarget(
        CAMERA_POSITIONS[contactPointer].target.x,
        CAMERA_POSITIONS[contactPointer].target.y,
        CAMERA_POSITIONS[contactPointer].target.z
      );
      break;
  }
}
