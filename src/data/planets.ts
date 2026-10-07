export type PlanetSlug = "earth" | "neptune" | "mars" | "saturn";

export interface Planet {
  slug: PlanetSlug;
  texture: string;
  axialTilt: number; // degrees
}

const T = (f: string) => `/textures/${f}`;

export const PLANETS: Planet[] = [
  { slug: "earth", texture: T("2k_earth_daymap.jpg"), axialTilt: 23.4 },
  { slug: "neptune", texture: T("2k_neptune.jpg"), axialTilt: 28.3 },
  { slug: "mars", texture: T("2k_mars.jpg"), axialTilt: 25.2 },
  { slug: "saturn", texture: T("2k_saturn.jpg"), axialTilt: 26.7 },
];
