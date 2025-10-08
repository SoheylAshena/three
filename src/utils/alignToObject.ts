import * as THREE from "three";

const tempV = new THREE.Vector3();

export const alignToObject = (object: THREE.Object3D, camera: THREE.Camera, elem: HTMLElement) => {
  object.updateWorldMatrix(true, false);
  object.getWorldPosition(tempV);

  tempV.project(camera);

  const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
  const y = (tempV.y * -0.5 + 0.5) * window.innerHeight;

  elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
};
