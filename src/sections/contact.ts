import type { Mesh } from "three";
import { assets } from "../globalData";
import { degToRad } from "../utils/degToRad";

export const createContactSection = () => {
  const contactScreen = assets.objects.screen.clone(true);
  contactScreen.position.set(0, 0, 10);
  contactScreen.rotation.set(0, degToRad(180), 0);
  contactScreen.scale.set(0.3, 0.3, 0.3);

  contactScreen.traverse((child) => {
    if ((child as Mesh).isMesh) {
      (child as Mesh).material = [
        assets.materials.silver,
        assets.materials.whiteGlow,
        assets.materials.silver,
      ];
    }
  });

  return contactScreen;
};
