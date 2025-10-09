import * as THREE from "three";
import { poseGrid } from "../utils/poseGrid";
import gsap from "gsap";
import { degToRad } from "three/src/math/MathUtils.js";

export const createSkillsSection = (
  data: {
    texture: THREE.Texture;
    color: number;
  }[],
  model: THREE.Object3D
) => {
  const whiteMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
  });

  const createMaterial = (texture: THREE.Texture) => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      emissiveMap: texture,
      emissive: 0xffffff,
    });
  };
  const createLight = (color: number) => {
    return new THREE.PointLight(color, 0.3, 0.5);
  };

  model.position.set(10, 0, 0);
  model.rotation.y = degToRad(-90);
  (model.children[0] as THREE.Mesh).material = whiteMaterial;

  const box = new THREE.Box3();
  const center = new THREE.Vector3();

  const skills = data.map((skill, index) => {
    const newSkill = model.clone(true);
    (newSkill.children[1] as THREE.Mesh).material = createMaterial(skill.texture);

    const newLight = createLight(skill.color);
    newLight.position.copy(newSkill.position);

    const group = new THREE.Group();
    group.add(newSkill, newLight);

    group.updateMatrixWorld(true);

    box.setFromObject(group);
    box.getCenter(center);

    newSkill.position.sub(center);
    newLight.position.sub(center);

    group.position.copy(center);

    gsap.to(group.position, {
      y: "+=0.1",
      repeat: -1,
      yoyo: true,
      delay: index * 0.2,
      ease: "power1.inOut",
      duration: 3,
    });

    return group;
  });

  const breakPoint = 3;
  const distance = 1;
  poseGrid(skills, breakPoint, distance);

  return skills;
};
