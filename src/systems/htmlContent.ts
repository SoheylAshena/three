import * as THREE from "three";
import { renderHomeSection } from "../sections/homeSection";

import { animateContent, exitAnimation } from "../animations/htmlContentAnimation";
import { renderDynamicSkillSection } from "../sections/skillsSection";
import { renderDynamicProjects } from "../sections/projectsSection";

export function updateContent(view: string, scene: THREE.Scene, positions: any) {
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
        renderDynamicSkillSection(scene, [positions.skillsPosition]),
        dynamicContainer
      );
      break;
    case "projects":
      exit();
      animateContent(
        renderDynamicProjects(scene, [
          positions.project1Position,
          positions.project2Position,
          positions.project3Position,
        ]),
        dynamicContainer
      );
      break;
    case "contact":
      exit();

      break;
  }
}
