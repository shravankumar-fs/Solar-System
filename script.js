import { SpaceBuilder } from './model/SpaceBuilder.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls';

let scene, renderer, camera;
let raycaster = new THREE.Raycaster();
let pointer = new THREE.Vector2();
pointer.x = pointer.y = -1;
const solarSystemCanvas = document.getElementById('solarSystem');
let solarSystem;
let theta = 0;
let rotAngle = 0.005;
let ADD = 0.01;

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070211);
  scene.fog = new THREE.Fog(0x00dddd, 50, 1000);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(5, 10, 100);

  //create object
  solarSystem = new SpaceBuilder(scene);
  solarSystem.buildSolarSystem();
  //create renderer

  renderer = new THREE.WebGLRenderer({
    canvas: solarSystemCanvas,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
};
init();
render();
const orbitControls = new OrbitControls(camera, renderer.domElement);
let count = solarSystem.sun.geometry.attributes.position.count;
const position_clone = JSON.parse(
  JSON.stringify(solarSystem.sun.geometry.attributes.position.array)
);
const normals_clone = JSON.parse(
  JSON.stringify(solarSystem.sun.geometry.attributes.normal.array)
);
const damping = 0.02;
const sun_pos = solarSystem.sun.position.clone();
let mainLoop = () => {
  solarSystem.getPlanets().forEach((pl) => {
    let p = pl.getPlanet();
    p.rotation.x += rotAngle;
    p.rotation.y += rotAngle;
    p.position.x = pl.x * Math.sin(theta);
    p.position.y = pl.y * Math.cos(theta);
    p.position.z = pl.z * Math.cos(theta);
    if (pl.getRing()) {
      let ring = pl.getRing();
      ring.position.x = pl.x * Math.sin(theta);
      ring.position.y = pl.y * Math.cos(theta);
      ring.position.z = pl.z * Math.cos(theta);
      // ring.rotation.z += rotAngle + 5;
      ring.rotation.z += rotAngle + 1;
    }
  });
  solarSystem.sun.rotation.y += rotAngle / 10;

  const now = Date.now() / 300;
  for (let i = 0; i < count; i++) {
    const ux = solarSystem.sun.geometry.attributes.uv.getX(i) * Math.PI * 16;
    const uy = solarSystem.sun.geometry.attributes.uv.getY(i) * Math.PI * 16;
    //current height of vertextwave
    const xangle = ux + now;
    const xsin = Math.sin(xangle) * 0.05;
    const yangle = uy + now;
    const ycos = Math.cos(yangle) * 0.05;
    //indices
    const ix = i * 3;
    const iy = i * 3 + 1;
    const iz = i * 3 + 2;

    //new pos

    solarSystem.sun.geometry.attributes.position.setX(
      i,
      position_clone[ix] + normals_clone[ix] * (xsin + ycos)
    );
    solarSystem.sun.geometry.attributes.position.setY(
      i,
      position_clone[iy] + normals_clone[iy] * (xsin + ycos)
    );
    solarSystem.sun.geometry.attributes.position.setZ(
      i,
      position_clone[iz] + normals_clone[iz] * (xsin + ycos)
    );
  }
  solarSystem.sun.geometry.computeVertexNormals();
  solarSystem.sun.geometry.attributes.position.needsUpdate = true;

  orbitControls.update();

  theta += ADD;
  render();

  requestAnimationFrame(mainLoop);
};

function render() {
  renderer.render(scene, camera);
}

orbitControls.target.set(0, 0, 0);
orbitControls.maxDistance = 400;
orbitControls.minDistance = 20;
mainLoop();

// solarSystemCanvas.addEventListener("click", (e) => {
//   orbitControls.enabled = false;

//   pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
//   pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

//   raycaster.setFromCamera(pointer, camera);

//   const intersects = raycaster.intersectObject(solarSystem.getPlanets());
//   for (let i = 0; i < intersects.length; i++) {
//     intersects[i].object.material.color.set(0xff0000);
//     console.log(intersects[i]);
//   }
//   orbitControls.enabled = true;
// });

// orbitControls.listenToKeyEvents(document.body);
// orbitControls.keys = {
//   LEFT: "ArrowLeft", //left arrow
//   UP: "ArrowUp", // up arrow
//   RIGHT: "ArrowRight", // right arrow
//   BOTTOM: "ArrowDown", // down arrow
// };
// orbitControls.mouseButtons = {
//   LEFT: THREE.MOUSE.ROTATE,
//   MIDDLE: THREE.MOUSE.DOLLY,
//   RIGHT: THREE.MOUSE.PAN,
// };
// orbitControls.touches = {
//   ONE: THREE.TOUCH.ROTATE,
//   TWO: THREE.TOUCH.DOLLY_PAN,
// };
