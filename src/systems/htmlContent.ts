import * as THREE from "three";
import { renderHomeSection } from "../sections/homeSection";

import { animateContent, exitAnimation } from "../animations/htmlContentAnimation";
import { renderDynamicSkillSection } from "../sections/skillsSection";
import { renderDynamicProjects } from "../sections/projectsSection";

export function updateContent(
  view: string,
  scene: THREE.Scene,
  positions: {
    projectsPositions: THREE.Vector3[];
    skillsPositions: THREE.Vector3[];
  }
) {
  const staticContainer = document.getElementById("text")!;
  const dynamicContainer = document.getElementById("cssRenderer")!;

  const exit = exitAnimation.bind({}, staticContainer, dynamicContainer);

  switch (view) {
    case "home":
      exit();
      animateContent(renderHomeSection(), staticContainer);

      break;
    case "skills":
      exit();
      animateContent(
        renderDynamicSkillSection(scene, [positions.skillsPositions[0]]),
        dynamicContainer
      );
      break;
    case "projects":
      exit();
      animateContent(
        renderDynamicProjects(scene, [
          positions.projectsPositions[0],
          positions.projectsPositions[1],
          positions.projectsPositions[2],
        ]),
        dynamicContainer
      );
      break;
    case "contact":
      exit();

      break;
  }
}
