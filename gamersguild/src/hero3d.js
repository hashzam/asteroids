import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

/**
 * Synthwave-style WebGL hero: an infinite neon grid, floating wireframe
 * polyhedra, a particle field and a bloom pass. Reacts to the pointer.
 */
export function initHero3D(canvas) {
  if (!canvas) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return; // no WebGL — the CSS gradient veil still looks fine on its own
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x06070f, 0.034);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
  camera.position.set(0, 3.2, 15);

  const CYAN = 0x2af5ff;
  const MAGENTA = 0xff2bd6;
  const VIOLET = 0x7b5cff;

  /* ---- lights ---- */
  scene.add(new THREE.AmbientLight(0x404060, 1.4));
  const key = new THREE.PointLight(CYAN, 90, 60);
  key.position.set(-8, 9, 6);
  scene.add(key);
  const rim = new THREE.PointLight(MAGENTA, 70, 60);
  rim.position.set(10, 4, -4);
  scene.add(rim);

  /* ---- infinite neon grid (two leap-frogging tiles) ---- */
  const GRID_SIZE = 60;
  const grids = [0, 1].map((i) => {
    const g = new THREE.GridHelper(GRID_SIZE, 30, CYAN, VIOLET);
    g.material.transparent = true;
    g.material.opacity = 0.4;
    g.position.set(0, -3.5, i * GRID_SIZE);
    scene.add(g);
    return g;
  });

  /* ---- floating wireframe shapes ---- */
  const geoms = [
    new THREE.IcosahedronGeometry(1.4, 0),
    new THREE.OctahedronGeometry(1.5, 0),
    new THREE.DodecahedronGeometry(1.3, 0),
    new THREE.TorusGeometry(1.1, 0.4, 10, 24),
    new THREE.TetrahedronGeometry(1.6, 0),
  ];
  const palette = [CYAN, MAGENTA, VIOLET, 0xb6ff3c];
  const shapes = [];
  const SHAPE_COUNT = 9;

  for (let i = 0; i < SHAPE_COUNT; i++) {
    const color = palette[i % palette.length];
    const geo = geoms[i % geoms.length];
    const group = new THREE.Group();

    const solid = new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        color: 0x0b0d1c,
        emissive: color,
        emissiveIntensity: 0.22,
        roughness: 0.4,
        metalness: 0.6,
        transparent: true,
        opacity: 0.55,
      })
    );
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 })
    );
    group.add(solid, wire);

    const s = 0.5 + Math.random() * 0.9;
    group.scale.setScalar(s);
    group.position.set(
      (Math.random() - 0.5) * 22,
      Math.random() * 8 - 1,
      (Math.random() - 0.5) * 18 - 4
    );
    group.userData = {
      rx: (Math.random() - 0.5) * 0.4,
      ry: (Math.random() - 0.5) * 0.4,
      bob: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      baseY: group.position.y,
    };
    scene.add(group);
    shapes.push(group);
  }

  /* ---- particle field ---- */
  const PARTICLES = 1300;
  const pos = new Float32Array(PARTICLES * 3);
  for (let i = 0; i < PARTICLES; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 70;
    pos[i * 3 + 1] = Math.random() * 40 - 6;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 70;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({
      color: 0x9fd8ff,
      size: 0.07,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  scene.add(particles);

  /* ---- bloom post-processing ---- */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.95, 0.55, 0.05);
  composer.addPass(bloom);

  /* ---- sizing ---- */
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  /* ---- pointer parallax ---- */
  const pointer = { x: 0, y: 0 };
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  /* ---- render loop ---- */
  const clock = new THREE.Clock();
  let running = true;
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) {
      clock.getDelta();
      animate();
    }
  });

  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);

    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const speed = reduced ? 0 : 1;

    // scroll grid toward camera, wrap each tile
    for (const g of grids) {
      g.position.z -= dt * 6 * speed;
      if (g.position.z < -GRID_SIZE) g.position.z += GRID_SIZE * 2;
    }

    // tumble + bob shapes
    for (const sh of shapes) {
      const u = sh.userData;
      sh.rotation.x += u.rx * dt * speed;
      sh.rotation.y += u.ry * dt * speed;
      sh.position.y = u.baseY + Math.sin(t * 0.6 + u.phase) * u.bob;
    }

    particles.rotation.y += dt * 0.02 * speed;

    // ease camera toward pointer
    camera.position.x += (pointer.x * 2.4 - camera.position.x) * 0.04;
    camera.position.y += (3.2 - pointer.y * 1.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 1.5, 0);

    composer.render();
  }
  animate();
}
