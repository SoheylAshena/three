import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { assets } from "../globalData";

export const createMaterials = () => {
  const whiteGlow = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
  });
  const silver = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0,
  });
  const TSMat = new THREE.MeshStandardMaterial({
    emissive: 0xffffff,
    emissiveMap: assets.textures.typescript,
  });
  const HTMLMat = new THREE.MeshStandardMaterial({
    map: assets.textures.html,
    emissive: 0xffffff,
    emissiveMap: assets.textures.html,
  });
  const CSSMat = new THREE.MeshStandardMaterial({
    map: assets.textures.css,
    emissive: 0xffffff,
    emissiveMap: assets.textures.css,
  });
  const JSMat = new THREE.MeshStandardMaterial({
    map: assets.textures.js,
    emissive: 0xffffff,
    emissiveMap: assets.textures.js,
  });
  const ReactMat = new THREE.MeshStandardMaterial({
    map: assets.textures.react,
    emissive: 0xffffff,
    emissiveMap: assets.textures.react,
  });

  const whitePlastic = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });

  const starsMaterial = new THREE.PointsMaterial({ size: 0.3, sizeAttenuation: true, vertexColors: true });

  const cloudMaterial = new THREE.MeshStandardMaterial({
    map: assets.textures.cloud,
    emissive: 0x180138,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  assets.materials = {
    ...assets.materials,
    whiteGlow,
    silver,
    TSMat,
    HTMLMat,
    CSSMat,
    JSMat,
    ReactMat,
    whitePlastic,
    starsMaterial,
    cloudMaterial,
  };
};

export const createGeometries = () => {
  const starsGeometry = new THREE.BufferGeometry();
  const starsCount = 60000;
  const positions = new Float32Array(starsCount * 3);
  const colors = new Float32Array(starsCount * 3); // Array for RGB colors
  const minRadius = 50; // Inner radius for thickness
  const maxRadius = 200; // Outer radius for thickness

  for (let i = 0; i < starsCount; i++) {
    // Random spherical coordinates for uniform distribution
    const theta = Math.random() * 2 * Math.PI; // Azimuthal angle
    const phi = Math.acos(2 * Math.random() - 1); // Polar angle

    // Random radius within the thickness range
    const radius = minRadius + Math.random() * (maxRadius - minRadius);

    // Convert to Cartesian coordinates
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    let r, g, b;
    const colorType = Math.random();
    if (colorType < 0.3) {
      // 30% chance: Blueish stars (hot stars) - more saturated
      r = 0.3 + Math.random() * 0.3;
      g = 0.3 + Math.random() * 0.3;
      b = 0.7 + Math.random() * 0.3;
    } else if (colorType < 0.6) {
      // 30% chance: White stars - slight tint variation
      r = 0.8 + Math.random() * 0.2;
      g = 0.8 + Math.random() * 0.2;
      b = 0.8 + Math.random() * 0.2;
    } else if (colorType < 0.9) {
      // 30% chance: Yellowish stars - more golden
      r = 0.8 + Math.random() * 0.2;
      g = 0.6 + Math.random() * 0.2;
      b = 0.2 + Math.random() * 0.2;
    } else {
      // 10% chance: Reddish stars (cool stars) - deeper red
      r = 0.7 + Math.random() * 0.3;
      g = 0.2 + Math.random() * 0.2;
      b = 0.2 + Math.random() * 0.2;
    }
    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }

  starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  starsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const textGeo = (text: string) =>
    new TextGeometry(text, {
      font: assets.fonts.simple,
      depth: 0.1,
      size: 0.5,
    });

  const cloudGeo = new THREE.PlaneGeometry(500, 500);
  const helloGeo = textGeo("Hello");
  const introGeo = textGeo("I'm Soheyl");
  const aboutGeo = textGeo("About");
  const skillsGeo = textGeo("Skills");
  const projGeo = textGeo("Projects");
  const contactGeo = textGeo("Contact");
  const sphereGeo = new THREE.SphereGeometry(2, 30, 30);

  assets.geometries = {
    ...assets.geometries,
    helloGeo,
    introGeo,
    aboutGeo,
    skillsGeo,
    projGeo,
    contactGeo,
    sphereGeo,
    starsGeometry,
    cloudGeo,
  };
};

export const createLights = () => {
  const orange = new THREE.PointLight(0xff5e00, 0.3, 0.5);
  assets.lights = { ...assets.lights, orange };

  const yellow = new THREE.PointLight(0xffff00, 0.3, 0.5);
  assets.lights = { ...assets.lights, yellow };

  const blue = new THREE.PointLight(0x0044cc, 0.3, 0.5);
  assets.lights = { ...assets.lights, blue };
};

export const create3DObjects = () => {
  const geometries = assets.geometries;
  const materials = assets.materials;

  const hello = new THREE.Mesh(geometries.helloGeo, materials.whiteGlow);
  const introduction = new THREE.Mesh(geometries.introGeo, materials.whiteGlow);
  const aboutMe = new THREE.Mesh(geometries.aboutGeo, materials.whiteGlow);
  const skills = new THREE.Mesh(geometries.skillsGeo, materials.whiteGlow);
  const projects = new THREE.Mesh(geometries.projGeo, materials.whiteGlow);
  const contact = new THREE.Mesh(geometries.contactGeo, materials.whiteGlow);
  const sphere = new THREE.Mesh(geometries.sphereGeo, materials.whiteGlow);
  const starField = new THREE.Points(geometries.starsGeometry, materials.starsMaterial);
  const cloud = new THREE.Mesh(assets.geometries.cloudGeo, assets.materials.cloudMaterial);

  assets.objects = {
    ...assets.objects,
    hello,
    introduction,
    aboutMe,
    skills,
    projects,
    contact,
    sphere,
    starField,
    cloud,
  };
};
