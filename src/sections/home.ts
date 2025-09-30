import { Group } from "three";
import gsap from "gsap";
import { assets } from "../globalData";

export const createHomeSection = () => {
  const { hello, introduction, aboutMe, skills, projects, contact } =
    assets.objects;

  const home = new Group();
  home.add(hello, introduction, aboutMe, skills, projects, contact);
  introduction.position.set(0, -1, 0);
  aboutMe.position.set(0, -2, 0);
  skills.position.set(0, -3, 0);
  projects.position.set(0, -4, 0);
  contact.position.set(0, -5, 0);

  home.position.set(0, 0, -10);

  home.traverse((obj) => {
    const rotX = (Math.random() - 0.5) * 0.2;
    const rotY = (Math.random() - 0.5) * 0.2;
    const rotZ = (Math.random() - 0.5) * 0.2;

    if (obj.type === "Mesh") {
      // Float on Y axis
      gsap.to(obj.position, {
        y: obj.position.y + rotY,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(obj.rotation, {
        x: obj.rotation.x + rotX,
        y: obj.rotation.y + rotY,
        z: obj.rotation.z + rotZ,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }
  });

  return home;
};
