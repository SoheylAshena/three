import * as THREE from "three";
import { poseGrid } from "../utils/poseGrid";
import gsap from "gsap";
import { degToRad } from "three/src/math/MathUtils.js";
import type { AssetLoader } from "../systems/AssetLoader";

export const createSkillsSection = (staticAssets: AssetLoader) => {
  const skillMats: Array<keyof typeof materials> = [
    "HTMLMat",
    "CSSMat",
    "JSMat",
    "TSMat",
    "ReactMat",
    "TailwindMat",
    "NextMat",
    "ThreeMat",
    "SassMat",
  ];
  const relatedLight: Array<keyof typeof lights> = [
    "orange",
    "blue",
    "yellow",
    "blue",
    "blue",
    "cyan",
    "white",
    "white",
    "magenta",
  ];
  const lights = {
    orange: new THREE.PointLight(0xff5e00, 0.3, 0.5),
    yellow: new THREE.PointLight(0xffff00, 0.3, 0.5),
    blue: new THREE.PointLight(0x0044cc, 0.3, 0.5),
    white: new THREE.PointLight(0xffffff, 0.3, 0.5),
    magenta: new THREE.PointLight(0xff007c, 0.3, 0.5),
    cyan: new THREE.PointLight(0x00ffff, 0.3, 0.5),
  };
  const materials = {
    whitePlastic: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
    }),
    whiteGlow: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
    }),
    TSMat: new THREE.MeshStandardMaterial({
      emissive: 0xffffff,
      emissiveMap: staticAssets.textures.typescript,
    }),

    HTMLMat: new THREE.MeshStandardMaterial({
      map: staticAssets.textures.html,
      emissive: 0xffffff,
      emissiveMap: staticAssets.textures.html,
    }),

    CSSMat: new THREE.MeshStandardMaterial({
      map: staticAssets.textures.css,
      emissive: 0xffffff,
      emissiveMap: staticAssets.textures.css,
    }),

    JSMat: new THREE.MeshStandardMaterial({
      map: staticAssets.textures.js,
      emissive: 0xffffff,
      emissiveMap: staticAssets.textures.js,
    }),

    ReactMat: new THREE.MeshStandardMaterial({
      map: staticAssets.textures.react,
      emissive: 0xffffff,
      emissiveMap: staticAssets.textures.react,
    }),

    TailwindMat: new THREE.MeshStandardMaterial({
      map: staticAssets.textures.tailwind,
      emissive: 0xffffff,
      emissiveMap: staticAssets.textures.tailwind,
    }),

    NextMat: new THREE.MeshStandardMaterial({
      map: staticAssets.textures.next,
      emissive: 0xffffff,
      emissiveMap: staticAssets.textures.next,
    }),

    ThreeMat: new THREE.MeshStandardMaterial({
      map: staticAssets.textures.three,
      emissive: 0xffffff,
      emissiveMap: staticAssets.textures.three,
    }),

    SassMat: new THREE.MeshStandardMaterial({
      map: staticAssets.textures.sass,
      emissive: 0xffffff,
      emissiveMap: staticAssets.textures.sass,
    }),
  };

  const skill = staticAssets.objects.skill;

  skill.position.set(10, 0, 0);
  skill.rotation.y = degToRad(-90);
  (skill.children[0] as THREE.Mesh).material = materials.whitePlastic;
  (skill.children[1] as THREE.Mesh).material = materials.whiteGlow;

  const skills = skillMats.map((skillMat, index) => {
    const newSkill = skill.clone(true);
    const newLight = lights[relatedLight[index]].clone(true);
    newLight.position.copy(newSkill.position);
    (newSkill.children[1] as THREE.Mesh).material = materials[skillMat];
    const group = new THREE.Group();
    group.add(newSkill, newLight);

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
