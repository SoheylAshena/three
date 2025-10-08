import gsap from "gsap";
import * as THREE from "three";
import { renderHomeSection } from "../sections/homeSection";
import { CSS2DObject } from "three/examples/jsm/Addons.js";
import { isMobile } from "../utils/isMobile";

const exitAnimation = (staticContainer: HTMLElement, dynamicContainer: HTMLElement) => {
  gsap.to(staticContainer, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      staticContainer.innerHTML = "";
    },
  });
  gsap.to(dynamicContainer, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      dynamicContainer.innerHTML = "";
    },
  });
};

const animateContent = (renderFunc: () => HTMLElement | HTMLElement[], container: HTMLElement) => {
  gsap.to(container, {
    opacity: 1,
    delay: 1.5,
    onStart: () => {
      const result = renderFunc();
      if (Array.isArray(result)) {
        result.forEach((el) => container.appendChild(el));
      } else {
        container.appendChild(result);
      }
    },
  });
};

export function updateContent(view: string, scene: THREE.Scene) {
  const staticContainer = document.getElementById("text")!;
  const dynamicContainer = document.getElementById("cssRenderer")!;
  const exit = exitAnimation.bind({}, staticContainer, dynamicContainer);

  switch (view) {
    case "home":
      exit();
      animateContent(renderHomeSection, staticContainer);

      break;
    case "skills":
      exit();
      animateContent(() => {
        const para = document.createElement("h1");
        para.textContent = "My Skills";

        const desc = new CSS2DObject(para);
        if (isMobile()) {
          desc.position.set(10, 1, 1);
        } else {
          desc.position.set(10, 0, 4);
        }

        scene.add(desc);

        return para;
      }, dynamicContainer);
      break;
    case "projects":
      exit();
      animateContent(() => {
        const para = document.createElement("h1");
        para.textContent = "First project";
        const para2 = document.createElement("h1");
        para2.textContent = "Second project";
        const para3 = document.createElement("h1");
        para3.textContent = "Third project";

        const description = document.createElement("p");
        description.textContent =
          "This is my absolutely lovely beautiful sexy nicely implemented First project";
        description.style.padding = "20px";
        description.style.maxWidth = "350px";

        const description2 = document.createElement("p");
        description2.textContent =
          "This is my absolutely lovely beautiful sexy nicely implemented Second project";
        description2.style.padding = "20px";
        description2.style.maxWidth = "350px";

        const description3 = document.createElement("p");
        description3.textContent =
          "This is my absolutely lovely beautiful sexy nicely implemented Third project";
        description3.style.padding = "20px";
        description3.style.maxWidth = "350px";

        const p = new CSS2DObject(para);
        const p2 = new CSS2DObject(para2);
        const p3 = new CSS2DObject(para3);

        const desc = new CSS2DObject(description);
        const desc2 = new CSS2DObject(description2);
        const desc3 = new CSS2DObject(description3);

        if (isMobile()) {
          p.position.set(-10, 1.5, 0);
          p2.position.set(-10, -2.5, 0);
          p3.position.set(-10, -6.5, 0);
          desc.position.set(-10, -1.5, 0);
          desc2.position.set(-10, -5.5, 0);
          desc3.position.set(-10, -9.4, 0);
        } else {
          p.position.set(-10, 0.5, -3);
          p2.position.set(-10, -1.5, -3);
          p3.position.set(-10, -3.5, -3);
          desc.position.set(-10, 0, -3);
          desc2.position.set(-10, -2, -3);
          desc3.position.set(-10, -4, -3);
        }

        scene.add(p, p2, p3, desc, desc2, desc3);

        return [para, para2, para3, description, description2, description3];
      }, dynamicContainer);
      break;
    case "contact":
      exit();

      break;
  }
}
