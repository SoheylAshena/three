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
    const whiteGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x141730,
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
    this.element.src = "https://contact.sohyl.me/";
    this.element.id = "iframe";
    if (isMobile()) {
      this.element.width = "600px";
      this.element.height = "700px";
    } else {
      this.element.width = "1000px";
      this.element.height = "700px";
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
