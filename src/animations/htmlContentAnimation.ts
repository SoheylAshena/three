import gsap from "gsap";

export const exitAnimation = (staticContainer: HTMLElement, dynamicContainer: HTMLElement) => {
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
