import { Group, type Mesh } from "three";
import { assets } from "../globalData";
import { degToRad } from "../utils/degToRad";
import { poseGrid } from "../utils/poseGrid";
import gsap from "gsap";

export const createSkillsSection = () => {
  const skillMats = ["HTMLMat", "CSSMat", "JSMat", "TSMat", "ReactMat"];
  const relatedLight = ["orange", "blue", "yellow", "blue", "blue"];

  const skill = assets.objects.skill;
  skill.position.set(10, 0, 0);

  skill.rotation.y = degToRad(-90);
  (skill.children[0] as Mesh).material = assets.materials.whitePlastic;
  (skill.children[1] as Mesh).material = assets.materials.whiteGlow;

  const skills = skillMats.map((skillMat, index) => {
    const newSkill = skill.clone(true);
    const newLight = assets.lights[relatedLight[index]].clone(true);
    newLight.position.copy(newSkill.position);
    (newSkill.children[1] as Mesh).material = assets.materials[skillMat];
    const group = new Group();
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
