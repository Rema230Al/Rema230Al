"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { Planet, PlanetSlug } from "@/data/planets";
import { makeHaloMaterial, makeRimMaterial, makeRingGeometry, makeRingMaterial } from "./shaders";

type Atmo = { color: string; halo: number; haloI: number; rimI: number };

const ATMOS: Record<PlanetSlug, Atmo> = {
  earth: { color: "#4f93ff", halo: 1.085, haloI: 1.25, rimI: 1.1 },
  mars: { color: "#ff9f7a", halo: 1.04, haloI: 0.45, rimI: 0.45 },
  saturn: { color: "#f5e3bb", halo: 1.035, haloI: 0.45, rimI: 0.45 },
  neptune: { color: "#5a86ff", halo: 1.06, haloI: 1.0, rimI: 0.9 },
};

const RING_TEX = "/textures/2k_saturn_ring_alpha.png";
const CLOUD_TEX = "/textures/2k_earth_clouds.jpg";

export type Planet3DProps = ThreeElements["group"] & {
  planet: Planet;
  radius?: number;
  lightDir: THREE.Vector3; // world-space direction TOWARD the light (normalized, may mutate)
  spin?: number; // radians per second
  extraSpin?: MutableRefObject<number>; // scroll-driven additional rotation
  fade?: MutableRefObject<number>; // 0..1 overall opacity
  detail?: number; // sphere segments
  clouds?: boolean; // Earth's cloud layer (skipped on mobile)
};

export default function Planet3D({
  planet,
  radius = 1,
  lightDir,
  spin = 0.05,
  extraSpin,
  fade,
  detail = 96,
  clouds = true,
  ...group
}: Planet3DProps) {
  const hasClouds = planet.slug === "earth" && clouds;
  const isSaturn = planet.slug === "saturn";

  const urls = useMemo(() => {
    const u: Record<string, string> = { map: planet.texture };
    if (hasClouds) u.clouds = CLOUD_TEX;
    if (isSaturn) u.ring = RING_TEX;
    return u;
  }, [planet.texture, hasClouds, isSaturn]);

  const tex = useTexture(urls) as Record<string, THREE.Texture>;

  useEffect(() => {
    Object.entries(tex).forEach(([k, t]) => {
      if (k !== "clouds") t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.needsUpdate = true;
    });
  }, [tex]);

  const a = ATMOS[planet.slug];

  const mats = useMemo(() => {
    const surface = new THREE.MeshStandardMaterial({
      map: tex.map,
      roughness: planet.slug === "earth" ? 0.75 : 0.95,
      metalness: 0,
      transparent: true,
    });
    const cloudMat = hasClouds
      ? new THREE.MeshStandardMaterial({
          color: "#ffffff",
          alphaMap: tex.clouds,
          transparent: true,
          depthWrite: false,
          roughness: 1,
          opacity: 0.9,
        })
      : null;
    const halo = makeHaloMaterial(a.color, a.halo);
    const rim = makeRimMaterial(a.color);
    const ring = isSaturn ? makeRingMaterial(tex.ring, "#f4ead2") : null;
    return { surface, clouds: cloudMat, halo, rim, ring };
  }, [tex, hasClouds, isSaturn, a, planet.slug]);

  const ringGeo = useMemo(() => (isSaturn ? makeRingGeometry(radius * 1.24, radius * 2.27) : null), [isSaturn, radius]);

  useEffect(
    () => () => {
      Object.values(mats).forEach((m) => m?.dispose());
      ringGeo?.dispose();
    },
    [mats, ringGeo],
  );

  const body = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const root = useRef<THREE.Group>(null);
  const spinAcc = useRef(Math.random() * Math.PI * 2);
  const center = useMemo(() => new THREE.Vector3(), []);
  const wscale = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    spinAcc.current += spin * Math.min(dt, 0.1);
    const rot = spinAcc.current + (extraSpin?.current ?? 0);
    if (body.current) body.current.rotation.y = rot;
    if (cloudRef.current) cloudRef.current.rotation.y = rot * 1.12 + 0.4;

    const f = fade ? fade.current : 1;
    mats.surface.opacity = f;
    mats.surface.depthWrite = f > 0.6;
    if (mats.clouds) mats.clouds.opacity = 0.9 * f;
    mats.halo.uniforms.uIntensity.value = a.haloI * f;
    mats.halo.uniforms.uLightDir.value.copy(lightDir);
    mats.rim.uniforms.uIntensity.value = a.rimI * f;
    mats.rim.uniforms.uLightDir.value.copy(lightDir);
    if (mats.ring && root.current) {
      root.current.getWorldPosition(center);
      const s = root.current.getWorldScale(wscale).x;
      mats.ring.uniforms.uCenter.value.copy(center);
      mats.ring.uniforms.uRadius.value = radius * s;
      mats.ring.uniforms.uLightDir.value.copy(lightDir);
      mats.ring.uniforms.uOpacity.value = f;
    }
  });

  const tilt = THREE.MathUtils.degToRad(planet.axialTilt);

  return (
    <group {...group}>
      <group ref={root} rotation={[0, 0, tilt]}>
        <mesh ref={body} material={mats.surface}>
          <sphereGeometry args={[radius, detail, detail / 2]} />
        </mesh>
        {mats.clouds && (
          <mesh ref={cloudRef} material={mats.clouds} scale={1.012}>
            <sphereGeometry args={[radius, detail, detail / 2]} />
          </mesh>
        )}
        <mesh material={mats.rim} scale={1.004} raycast={() => null}>
          <sphereGeometry args={[radius, 64, 32]} />
        </mesh>
        <mesh material={mats.halo} scale={a.halo} raycast={() => null}>
          <sphereGeometry args={[radius, 64, 32]} />
        </mesh>
        {ringGeo && mats.ring && <mesh geometry={ringGeo} material={mats.ring} raycast={() => null} />}
      </group>
    </group>
  );
}
