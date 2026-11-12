// Concept illustration, not a CAD model or a simulation of the physical robot.
import * as THREE from './assets/prototypes/minimal/vendor/three.module.min.js';
import { RoundedBoxGeometry } from './assets/prototypes/minimal/vendor/RoundedBoxGeometry.js';

const stage = document.querySelector('#a2-stage');
const status = document.querySelector('#robot-state');
const pauseButton = document.querySelector('#pause-button');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-3, 3, 1.55, -1.55, .1, 30);
camera.position.set(-3.9, 2.65, 5.2);
camera.lookAt(0, .94, 0);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.domElement.setAttribute('aria-hidden', 'true');
stage.append(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff, 0xa2a5aa, 2.5));
for (const [x, y, z, intensity] of [[-3, 6, 5, 3.2], [4, 3, -4, 2.0], [1, 1, 5, .8]]) {
  const light = new THREE.DirectionalLight(0xffffff, intensity);
  light.position.set(x, y, z);
  scene.add(light);
}
const material = (color, metalness = .25, roughness = .48) => new THREE.MeshStandardMaterial({ color, metalness, roughness });
const silver = material('#aeb5bd', .45);
const paleSilver = material('#d0d5d8', .4);
const graphite = material('#4a515a', .2, .56);
const dark = material('#20252b', .1, .64);
const rubber = material('#171c20', 0, .87);
const glass = material('#14212b', .6, .18);

function box(parent, size, position, surface, radius = .04) {
  const mesh = new THREE.Mesh(new RoundedBoxGeometry(...size, 2, radius), surface);
  mesh.position.set(...position);
  parent.add(mesh);
  return mesh;
}
function cylinder(parent, radius, length, position, surface, axis = 'z') {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 28), surface);
  if (axis === 'z') mesh.rotation.x = Math.PI / 2;
  if (axis === 'x') mesh.rotation.z = Math.PI / 2;
  mesh.position.set(...position);
  parent.add(mesh);
  return mesh;
}
function tube(parent, points, surface, radius = .025) {
  const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 36, radius, 8, false), surface);
  parent.add(mesh);
}

const robot = new THREE.Group();
const body = new THREE.Group();
robot.add(body);
scene.add(robot);
box(body, [2.38, .40, .79], [0, .04, 0], silver, .12);
box(body, [2.46, .17, .76], [0, .29, 0], graphite, .07);
box(body, [1.72, .055, .56], [.12, .39, 0], graphite, .025);
const nose = box(body, [.49, .28, .69], [-1.19, .19, 0], silver, .08);
nose.rotation.z = -.12;
box(body, [.42, .22, .69], [1.18, .18, 0], paleSilver, .06);
cylinder(body, .187, .16, [-1.44, .09, 0], dark, 'x');
cylinder(body, .137, .012, [-1.529, .09, 0], glass, 'x');
cylinder(body, .088, .015, [-1.54, .09, 0], dark, 'x');
for (const side of [-1, 1]) {
  cylinder(body, .042, .015, [-1.442, .19, side * .24], dark, 'x');
  box(body, [1.33, .40, .15], [.03, -.055, side * .465], graphite, .05);
  for (const x of [-.31, .36]) {
    box(body, [.30, .205, .025], [x, -.07, side * .55], silver, .022);
    box(body, [.20, .115, .03], [x, -.055, side * .568], dark, .015);
    for (let led = 0; led < 3; led++) {
      box(body, [.019, .012, .012], [x + led * .033 - .033, -.18, side * .57], paleSilver, .004);
    }
  }
  box(body, [.025, .34, .017], [.025, -.05, side * .55], dark, .004);
}
tube(body, [[-1.35, .28, -.29], [-1.53, .31, -.29], [-1.56, .31, .29], [-1.35, .28, .29]], dark);
tube(body, [[.76, .33, -.23], [1.09, .60, -.23], [1.39, .60, -.23], [1.39, .60, .23], [1.09, .60, .23], [.76, .33, .23]], silver, .032);

const legs = [];
const upperLength = .70;
const lowerLength = .85;
for (const x of [-.96, .96]) {
  for (const side of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(x, 0, side * .59);
    body.add(hip);
    cylinder(hip, .215, .30, [0, 0, 0], silver);
    cylinder(hip, .182, .025, [0, 0, side * .163], paleSilver);
    cylinder(hip, .102, .032, [0, 0, side * .181], graphite);
    box(hip, [.245, .62, .205], [0, -.32, side * .025], silver, .07);
    box(hip, [.105, .47, .218], [-.034, -.32, 0], graphite, .025);
    const knee = new THREE.Group();
    knee.position.y = -upperLength;
    hip.add(knee);
    cylinder(knee, .136, .19, [0, 0, 0], graphite);
    cylinder(knee, .073, .206, [0, 0, 0], paleSilver);
    box(knee, [.115, .76, .105], [0, -.39, 0], paleSilver, .025);
    box(knee, [.047, .66, .11], [.022, -.40, -.009], silver, .015);
    const foot = new THREE.Group();
    foot.position.y = -lowerLength;
    knee.add(foot);
    const shoe = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12), rubber);
    shoe.scale.set(.123, .075, .112);
    foot.add(shoe);
    legs.push({ hip, knee, foot, x, side, phase: (x < 0) === (side < 0) ? 0 : Math.PI });
  }
}

const labelCanvas = document.createElement('canvas');
labelCanvas.width = 256;
labelCanvas.height = 128;
const labelContext = labelCanvas.getContext('2d');
labelContext.fillStyle = '#e5e9ec';
labelContext.font = 'bold 72px Arial';
labelContext.textAlign = 'center';
labelContext.fillText('A2', 128, 94);
const labelTexture = new THREE.CanvasTexture(labelCanvas);
labelTexture.colorSpace = THREE.SRGBColorSpace;
const label = new THREE.Mesh(new THREE.PlaneGeometry(.32, .16), new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true, depthWrite: false }));
label.position.set(-.72, .29, .394);
body.add(label);

const shadowCanvas = document.createElement('canvas');
shadowCanvas.width = shadowCanvas.height = 128;
const shadowContext = shadowCanvas.getContext('2d');
const gradient = shadowContext.createRadialGradient(64, 64, 5, 64, 64, 64);
gradient.addColorStop(0, 'rgba(25,30,35,.23)');
gradient.addColorStop(.45, 'rgba(25,30,35,.13)');
gradient.addColorStop(1, 'rgba(25,30,35,0)');
shadowContext.fillStyle = gradient;
shadowContext.fillRect(0, 0, 128, 128);
const shadow = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 2.5), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }));
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = .002;
scene.add(shadow);

const ease = value => value * value * (3 - 2 * value);
let elapsed = 0;
let lastTime = 0;
let lastDraw = 0;
let playing = !reducedMotion.matches;
let inView = true;
let pointerX = 0;
let pointerTarget = 0;
const inverseBody = new THREE.Matrix4();
const footTarget = new THREE.Vector3();

function pose(time) {
  const t = time % 22;
  let x = 0;
  let yaw = 0;
  let walk = 0;
  let look = t < 4 ? Math.sin(t / 4 * Math.PI) : 0;
  let name = t < 4 ? 'Looking up' : 'Looking around';
  if (t >= 4 && t < 7) {
    const progress = (t - 4) / 3;
    x = -.44 * ease(progress);
    walk = Math.sin(progress * Math.PI);
    name = 'A few steps to the left';
  } else if (t >= 7 && t < 9) {
    x = -.44;
    yaw = Math.PI * ease(Math.max(0, t - 8));
    look = Math.sin((t - 7) / 2 * Math.PI) * .55;
  } else if (t >= 9 && t < 14) {
    const progress = (t - 9) / 5;
    x = -.44 + .88 * ease(progress);
    yaw = Math.PI;
    walk = Math.sin(progress * Math.PI);
    name = 'A few steps to the right';
  } else if (t >= 14 && t < 16) {
    x = .44;
    yaw = Math.PI + Math.PI * ease(Math.max(0, t - 15));
    look = Math.sin((t - 14) / 2 * Math.PI) * .55;
  } else if (t >= 16 && t < 19) {
    const progress = (t - 16) / 3;
    x = .44 * (1 - ease(progress));
    yaw = Math.PI * 2;
    walk = Math.sin(progress * Math.PI);
    name = 'Heading back';
  }
  return { x, yaw, walk, look, name };
}

function draw(time) {
  const state = pose(time);
  pointerX += (pointerTarget - pointerX) * .06;
  robot.position.x = state.x;
  robot.rotation.y = state.yaw + Math.sin(time * .65) * .035 + pointerX * .12;
  body.position.y = 1.32 + Math.sin(time * 1.8) * .009 + Math.sin(time * 12) * state.walk * .012;
  body.rotation.z = -state.look * .13 + Math.sin(time * 1.4) * .007;
  body.updateMatrix();
  inverseBody.copy(body.matrix).invert();
  for (const leg of legs) {
    const phase = time * 6.3 + leg.phase;
    const step = Math.sin(phase) * .24 * state.walk;
    const lift = Math.max(0, Math.cos(phase)) * .13 * state.walk;
    footTarget.set(leg.x + step, .075 + lift, leg.side * .59).applyMatrix4(inverseBody).sub(leg.hip.position);
    const cosine = (footTarget.x ** 2 + footTarget.y ** 2 - upperLength ** 2 - lowerLength ** 2) / (2 * upperLength * lowerLength);
    const knee = -Math.acos(THREE.MathUtils.clamp(cosine, -1, 1));
    const hip = Math.atan2(footTarget.x, -footTarget.y) - Math.atan2(lowerLength * Math.sin(knee), upperLength + lowerLength * Math.cos(knee));
    leg.hip.rotation.z = hip;
    leg.knee.rotation.z = knee;
    leg.foot.rotation.z = -hip - knee;
  }
  shadow.position.x = state.x;
  shadow.rotation.z = -state.yaw;
  const stateText = playing ? state.name : 'Taking a little pause';
  if (status.textContent !== stateText) {
    status.textContent = stateText;
    stage.dataset.motion = playing ? state.name : 'Paused';
  }
  renderer.render(scene, camera);
}

function resize() {
  const { width, height } = stage.getBoundingClientRect();
  const aspect = width / height;
  const span = Math.max(3.1, 4.25 / aspect);
  camera.left = -span * aspect / 2;
  camera.right = span * aspect / 2;
  camera.top = span / 2;
  camera.bottom = -span / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  draw(elapsed);
}
function setPlaying(value) {
  playing = value;
  lastTime = 0;
  pauseButton.setAttribute('aria-pressed', String(!playing));
  pauseButton.setAttribute('aria-label', playing ? 'Pause robot animation' : 'Play robot animation');
  pauseButton.firstElementChild.textContent = playing ? 'Ⅱ' : '▷';
  draw(elapsed);
}
document.querySelector('#look-button').addEventListener('click', () => { elapsed = 0; setPlaying(true); });
document.querySelector('#walk-button').addEventListener('click', () => { elapsed = 4; setPlaying(true); });
pauseButton.addEventListener('click', () => setPlaying(!playing));
stage.addEventListener('pointermove', event => { const rect = stage.getBoundingClientRect(); pointerTarget = (event.clientX - rect.left) / rect.width - .5; });
stage.addEventListener('pointerleave', () => { pointerTarget = 0; });
reducedMotion.addEventListener('change', event => setPlaying(!event.matches));
new ResizeObserver(resize).observe(stage);
new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; lastTime = 0; }).observe(stage);
document.addEventListener('visibilitychange', () => { lastTime = 0; });
renderer.setAnimationLoop(now => {
  if (!lastTime) lastTime = now;
  const delta = (now - lastTime) / 1000;
  lastTime = now;
  if (!playing || !inView || document.hidden) return;
  elapsed += delta;
  if (now - lastDraw < 1000 / 30) return;
  lastDraw = now;
  draw(elapsed);
});
resize();
setPlaying(playing);
stage.classList.add('ready');
