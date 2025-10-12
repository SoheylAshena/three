import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { isMobile } from "../utils/isMobile";
import { CSS3DObject } from "three/examples/jsm/Addons.js";

export class Contact {
  private contact: THREE.Object3D | null = null;

  create(model: THREE.Object3D) {
    const whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
    });
    const whiteGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0x0a0c19,
      emissiveIntensity: 3,
    });

    const contactScreen = model.clone(true);

    contactScreen.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = [whiteMaterial, whiteGlowMaterial, whiteMaterial];
      }
    });

    contactScreen.position.set(0, 0, 10);
    if (isMobile()) {
      contactScreen.rotation.set(0, degToRad(180), degToRad(90));
    } else {
      contactScreen.rotation.set(0, degToRad(180), 0);
    }
    contactScreen.scale.set(0.3, 0.3, 0.3);

    this.contact = contactScreen;
    return contactScreen;
  }

  getContact() {
    return this.contact;
  }
}

export class ContactContent {
  private element;
  private object;

  constructor() {
    this.element = document.createElement("iframe");
    this.element.src = "https://contact.sohyl.me";
    this.element.id = "iframe";
    if (isMobile()) {
      this.element.width = "500px";
      this.element.height = "700px";
    } else {
      this.element.width = "700px";
      this.element.height = "500px";
    }
    this.object = new CSS3DObject(this.element);
    this.object.position.set(0, 0, 10);
    this.object.rotateY(degToRad(180));
    this.object.scale.set(0.01, 0.01, 0.01);
    console.log(this.object);
  }

  getObject() {
    return this.object;
  }
}
