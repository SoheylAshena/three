import * as THREE from "three";
import gsap from "gsap";
import { degToRad } from "three/src/math/MathUtils.js";
import { isMobile } from "../utils/isMobile";

export class Projects {
  private projects: THREE.Object3D[] = [];
  private distance: number = isMobile() ? -4 : -2;
  private floatTimelines: gsap.core.Tween[] = [];

  create = (
    data: {
      texture: THREE.Texture;
    }[],
    model: THREE.Object3D
  ) => {
    const whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
    });

    const projects = data.map((_project, index) => {
      const newProject = model.clone(true);

      newProject.position.set(-10, 0, 0);
      newProject.rotation.set(0, degToRad(90), 0);
      newProject.position.add(new THREE.Vector3(0, index * this.distance, 0));

      newProject.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = [
            whiteMaterial,
            new THREE.MeshStandardMaterial({
              emissiveMap: data[index].texture,
              map: data[index].texture,
              emissive: 0xffffff,
            }),
            whiteMaterial,
          ];
        }
      });

      // Floating + rotation animations
      const floatTween = gsap.to(newProject.position, {
        y: "+=0.1",
        repeat: -1,
        yoyo: true,
        delay: index * 1.5,
        ease: "power1.inOut",
        duration: 3,
      });

      const rotateTween = gsap.to(newProject.rotation, {
        x: "+=0.01",
        y: "+=0.01",
        z: "+=0.01",
        repeat: -1,
        yoyo: true,
        delay: index * 1.5,
        ease: "power1.inOut",
        duration: 3,
      });

      this.floatTimelines.push(floatTween, rotateTween);

      return newProject;
    });

    this.projects = projects;
    return this.projects;
  };

  getProjects() {
    return this.projects;
  }

  getPositions() {
    return this.projects.map((p) => p.position);
  }

  updatePositions() {
    this.floatTimelines.forEach((tween) => tween.kill());
    this.floatTimelines = [];

    this.distance = isMobile() ? -4 : -2;

    this.projects.forEach((project, index) => {
      project.position.set(-10, 0, 0);
      project.rotation.set(0, degToRad(90), 0);
      project.position.add(new THREE.Vector3(0, index * this.distance, 0));

      const floatTween = gsap.to(project.position, {
        y: "+=0.1",
        repeat: -1,
        yoyo: true,
        delay: index * 1.5,
        ease: "power1.inOut",
        duration: 3,
      });

      const rotateTween = gsap.to(project.rotation, {
        x: "+=0.01",
        y: "+=0.01",
        z: "+=0.01",
        repeat: -1,
        yoyo: true,
        delay: index * 1.5,
        ease: "power1.inOut",
        duration: 3,
      });

      this.floatTimelines.push(floatTween, rotateTween);
    });
  }
}
