export const MAX_RIPPLES = 32;

export const waterVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const waterFragmentShader = /* glsl */ `
  precision highp float;

  #define MAX_RIPPLES 32

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  // xy = uv position where ripple was emitted (y-up), z = emission time, w = unused
  uniform vec4 uRipples[MAX_RIPPLES];
  uniform int uRippleCount;

  // --- noise helpers ---
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * valueNoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  // constants — tuned for a "Spline follow" trail feel
  const float RIPPLE_SPEED = 0.45;   // how fast each ring expands (UV / sec)
  const float RIPPLE_FREQ  = 82.0;   // spatial frequency of the sine wave
  const float RIPPLE_DECAY = 1.35;   // how fast amplitude fades with age
  const float RIPPLE_LIFE  = 3.0;    // seconds before a ripple is fully dead

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

    // ----- ambient base water -----
    float wave1 = sin(uv.x * 13.0 + uTime * 0.4) * 0.5 + 0.5;
    float wave2 = sin(uv.y * 10.0 - uTime * 0.28) * 0.5 + 0.5;
    float ambient = pow(wave1 * wave2, 1.4);
    float shimmer = fbm(uv * 7.5 + vec2(uTime * 0.05, uTime * 0.04));

    // ----- accumulate ripples (interference = additive sum) -----
    float waveSum = 0.0;   // signed — lets troughs subtract from crests
    float energy  = 0.0;   // unsigned magnitude for deep-color routing

    for (int i = 0; i < MAX_RIPPLES; i++) {
      if (i >= uRippleCount) break;

      vec4 r = uRipples[i];
      float age = uTime - r.z;
      if (age < 0.0 || age > RIPPLE_LIFE) continue;

      vec2 delta = (uv - r.xy) * aspect;
      float dist = length(delta);

      float radius = age * RIPPLE_SPEED;
      // only within ~1.5 wavelengths of the current ring — gives a soft shell
      float ringHalfWidth = 0.28;
      float shell = smoothstep(ringHalfWidth, 0.0, abs(dist - radius));

      // amplitude decays with age (energy spreading out + dissipation)
      float decay = exp(-age * RIPPLE_DECAY);

      // phase — crest front at dist=radius, banded sine behind/ahead
      float phase = sin((dist - radius) * RIPPLE_FREQ - age * 3.0);

      waveSum += shell * phase * decay;
      energy  += shell * decay;
    }

    // clamp so chaotic interference doesn't blow out
    waveSum = clamp(waveSum, -1.2, 1.2);
    energy  = clamp(energy, 0.0, 1.4);

    // ----- palette (DESIGN.md 인디고·페리윙클 5단) -----
    vec3 seolbaek   = vec3(0.988, 0.992, 1.000); // canvas #FCFDFF
    vec3 bingcheong = vec3(0.482, 0.576, 0.957); // sky #7B93F4
    vec3 eunbak     = vec3(0.714, 0.761, 0.969); // soft #B6C2F7 (shimmer)
    vec3 cheongram  = vec3(0.004, 0.259, 0.627); // deep #0142A0

    // base tinted water
    vec3 col = mix(seolbaek, bingcheong, 0.5 + 0.35 * ambient);

    // silver shimmer
    col = mix(col, eunbak, shimmer * 0.55);

    // crest (positive waveSum) — pull toward bingcheong / bright
    col = mix(col, bingcheong, clamp(waveSum, 0.0, 1.0) * 0.75);

    // trough (negative waveSum) — pull toward cheongram / deep
    col = mix(col, cheongram, clamp(-waveSum, 0.0, 1.0) * 0.55);

    // energy concentration — deepen where many rings overlap
    col = mix(col, cheongram, energy * 0.18);

    // gentle vignette for calmer corners
    float vignette = smoothstep(1.3, 0.55, length((uv - 0.5) * vec2(1.2, 1.0)));
    col = mix(mix(seolbaek, bingcheong, 0.3), col, vignette);

    gl_FragColor = vec4(col, 1.0);
  }
`;
