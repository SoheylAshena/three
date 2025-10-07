import gsap from "gsap";
import { renderHomeSection } from "../sections/homeSection";
import { renderProjectsSection } from "../sections/projectsSection";
import { renderSkillsSection } from "../sections/skillsSection";

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

export function updateContent(
  view: string,
  container: HTMLElement,
  moveCamera: (x: number, y: number, z: number) => void,
  setTarget: (x: number, y: number, z: number) => void
) {
  switch (view) {
    case "home":
      animateContent(renderHomeSection, container);
      moveCamera(0, 0, 0);
      setTarget(0, 0, -10);
      break;
    case "skills":
      animateContent(renderSkillsSection, container);
      moveCamera(4.84, -0.5, 0.16);
      setTarget(10, -1, 2.62);
      break;
    case "projects":
      animateContent(renderProjectsSection, container);
      moveCamera(-6, 0, 1);
      setTarget(-10, 0, -1);
      break;
    case "contact":
      moveCamera(0, 0, 2);
      setTarget(0, 0, 10);
      break;
  }
}
