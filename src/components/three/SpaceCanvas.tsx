"use client";

import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PLANETS, type Planet } from "@/data/planets";
import { stage } from "@/lib/stage";
import { useIsMobile, useReducedMotion } from "@/lib/hooks";
import Planet3D from "./Planet3D";

const LIGHT_DIR = new THREE.Vector3(-1, 0.3, 0.65).normalize();
const ORIGIN = new THREE.Vector3();

/** One planet, placed every frame from its `stage` entry (as SOL's detail Rig does); mounted only while near. */
function Body({ planet, mobile, reduced }: { planet: Planet; mobile: boolean; reduced: boolean }) {
  const { viewport, camera } = useThree();
  const holder = useRef<THREE.Group>(null);
  const fade = useRef(0);
  const spin = useRef(0);
  const mouse = useRef(new THREE.Vector2());
  const [near, setNear] = useState(false);

  useFrame((state, dt) => {
    const s = stage[planet.slug];
    if (s.near !== near) setNear(s.near); // load / free the planet as its section approaches / leaves
    const g = holder.current;
    if (!g) return;
    g.visible = s.opacity > 0.01;
    if (!g.visible) return;
    fade.current = s.opacity;
    spin.current = s.spin;
    if (!reduced) mouse.current.lerp(state.pointer, 1 - Math.exp(-dt * 2));
    const vp = viewport.getCurrentViewport(camera, ORIGIN);
    const ringFactor = planet.slug === "saturn" ? 0.55 : 1;
    g.scale.setScalar((vp.height * s.size * ringFactor) / 2);
    g.position.set(
      s.x * (vp.width / 2) + mouse.current.x * 0.08,
      s.y * (vp.height / 2) + mouse.current.y * 0.06,
      0,
    );
    g.rotation.x = -mouse.current.y * 0.06;
  });

  return (
    <group ref={holder} visible={false}>
      {near && (
        <Suspense fallback={null}>
          <Planet3D
            planet={planet}
            lightDir={LIGHT_DIR}
            spin={reduced ? 0 : 0.07}
            extraSpin={spin}
            fade={fade}
            detail={mobile ? 48 : 96}
            clouds={!mobile}
          />
        </Suspense>
      )}
    </group>
  );
}

/** A single fixed WebGL scene behind the page; sections move its planets through `stage`. */
export default function SpaceCanvas() {
  const mobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
      <Canvas
        dpr={mobile ? [1, 1.5] : [1, 1.75]}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
        camera={{ fov: 30, position: [0, 0, 12], near: 0.1, far: 100 }}
        eventSource={document.body}
      >
        <ambientLight intensity={0.04} />
        <directionalLight position={[LIGHT_DIR.x * 50, LIGHT_DIR.y * 50, LIGHT_DIR.z * 50]} intensity={2.7} />
        {PLANETS.map((p) => (
          <Body key={p.slug} planet={p} mobile={mobile} reduced={reduced} />
        ))}
      </Canvas>
    </div>
  );
}
