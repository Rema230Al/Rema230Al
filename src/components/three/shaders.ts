import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Atmosphere: an outer halo (BackSide) + inner limb glow (FrontSide)  */
/* ------------------------------------------------------------------ */

const atmoVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDirW;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDirW = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const haloFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLightDir;
  uniform float uIntensity;
  uniform float uEdge; // cosine at which the planet limb sits
  varying vec3 vNormalW;
  varying vec3 vViewDirW;
  void main() {
    // back faces: -dot is 0 at the outer silhouette, grows toward the planet limb
    float d = clamp(-dot(normalize(vNormalW), normalize(vViewDirW)) / uEdge, 0.0, 1.0);
    float glow = pow(d, 2.6);
    float lit = smoothstep(-0.45, 0.6, dot(normalize(vNormalW), uLightDir));
    float a = glow * (0.12 + 0.88 * lit) * uIntensity;
    gl_FragColor = vec4(uColor * a, a);
  }
`;

const rimFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLightDir;
  uniform float uIntensity;
  varying vec3 vNormalW;
  varying vec3 vViewDirW;
  void main() {
    vec3 n = normalize(vNormalW);
    float fres = pow(1.0 - clamp(dot(n, normalize(vViewDirW)), 0.0, 1.0), 3.2);
    float lit = smoothstep(-0.25, 0.6, dot(n, uLightDir));
    float a = fres * lit * uIntensity;
    gl_FragColor = vec4(uColor * a, a);
  }
`;

export function makeHaloMaterial(color: string, scale: number) {
  // cosine of the angle where rays graze the planet, seen from outside a shell of radius `scale`
  const edge = Math.sqrt(1 - 1 / (scale * scale));
  return new THREE.ShaderMaterial({
    vertexShader: atmoVertex,
    fragmentShader: haloFragment,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uLightDir: { value: new THREE.Vector3(-1, 0.3, 0.6).normalize() },
      uIntensity: { value: 1 },
      uEdge: { value: edge },
    },
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
}

export function makeRimMaterial(color: string) {
  return new THREE.ShaderMaterial({
    vertexShader: atmoVertex,
    fragmentShader: rimFragment,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uLightDir: { value: new THREE.Vector3(-1, 0.3, 0.6).normalize() },
      uIntensity: { value: 1 },
    },
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
}

/* ------------------------------------------------------------------ */
/* Rings: radial texture + analytic planet shadow                      */
/* ------------------------------------------------------------------ */

export function makeRingMaterial(map: THREE.Texture | null, tint = "#ffffff") {
  return new THREE.ShaderMaterial({
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vWorld;
      varying vec3 vNormalW;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uMap;
      uniform bool uHasMap;
      uniform vec3 uTint;
      uniform vec3 uLightDir;
      uniform vec3 uCenter;
      uniform float uRadius;
      uniform float uOpacity;
      varying vec2 vUv;
      varying vec3 vWorld;
      varying vec3 vNormalW;
      void main() {
        vec4 tex;
        if (uHasMap) {
          tex = texture2D(uMap, vec2(vUv.x, 0.5));
        } else {
          // faint narrow bands (Uranus)
          float x = vUv.x;
          float b = smoothstep(0.012, 0.0, abs(x - 0.18)) * 0.5
                  + smoothstep(0.010, 0.0, abs(x - 0.46)) * 0.35
                  + smoothstep(0.022, 0.0, abs(x - 0.9)) * 0.9; // epsilon ring
          tex = vec4(vec3(0.7, 0.82, 0.88), b);
        }
        // planet shadow cast onto the ring plane
        vec3 toC = uCenter - vWorld;
        float t = dot(toC, uLightDir);
        float dist = length(toC - uLightDir * t);
        float shadow = t > 0.0 ? smoothstep(uRadius * 0.96, uRadius * 1.04, dist) : 1.0;
        float lit = 0.35 + 0.65 * abs(dot(normalize(vNormalW), uLightDir));
        vec3 col = tex.rgb * uTint * lit * mix(0.06, 1.0, shadow);
        gl_FragColor = vec4(col, tex.a * uOpacity);
      }
    `,
    uniforms: {
      uMap: { value: map },
      uHasMap: { value: !!map },
      uTint: { value: new THREE.Color(tint) },
      uLightDir: { value: new THREE.Vector3(-1, 0.3, 0.6).normalize() },
      uCenter: { value: new THREE.Vector3() },
      uRadius: { value: 1 },
      uOpacity: { value: 1 },
    },
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
  });
}

/** RingGeometry with UV.x running radially from inner (0) to outer (1) edge. */
export function makeRingGeometry(inner: number, outer: number, segments = 160) {
  const geo = new THREE.RingGeometry(inner, outer, segments, 1);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    uv.setXY(i, (v.length() - inner) / (outer - inner), 0.5);
  }
  geo.rotateX(-Math.PI / 2); // lie in the equatorial (XZ) plane
  return geo;
}
