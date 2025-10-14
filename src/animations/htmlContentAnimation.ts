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

import gsap from "gsap";

export const exitAnimation = (staticContainer: HTMLElement, dynamicContainer: HTMLElement) => {
  gsap.to(staticContainer, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      staticContainer.innerHTML = "";
    },
    overwrite: true,
  });
  gsap.to(dynamicContainer, {
    opacity: 0,
    duration: 0.3,
  });
};

export const animateContent = (renderFunc: HTMLElement | HTMLElement[], container: HTMLElement) => {
  gsap.to(container, {
    opacity: 1,
    delay: 1.5,
    onStart: () => {
      container.innerHTML = "";
      const result = renderFunc;
      if (Array.isArray(result)) {
        result.forEach((el) => container.appendChild(el));
      } else {
        container.appendChild(result);
      }
    },
  });
};
