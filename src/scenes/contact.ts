import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { isMobile } from "../utils/isMobile";

export class Contact {
  private contact: THREE.Object3D | null = null;

  create(model: THREE.Object3D) {
    const whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
    });
    const whiteGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
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
