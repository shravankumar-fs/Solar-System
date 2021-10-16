import { SpaceBuilder } from "./model/SpaceBuilder.js";
let scene, renderer, camera;
let light;

let solarSystem;
let theta = 0;
let ADD = 0.01;

let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070211);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(5, 10, 80);
  light = new THREE.PointLight(0xffffff, 10, 40, 3);
  light.position.set(0, 0, 0);
  scene.add(light);

  //create object
  solarSystem = new SpaceBuilder(scene);
  solarSystem.buildSolarSystem();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  solarSystem.getPlanets().forEach((pl) => {
    let p = pl.getPlanet();
    p.rotation.x += 0.5;
    p.rotation.y += Math.sin(theta);
    p.position.x = pl.x * Math.sin(theta);
    p.position.y = pl.y * Math.cos(theta);
    p.position.z = pl.z * Math.cos(theta);
    if (pl.getRing()) {
      let ring = pl.getRing();
      ring.position.x = pl.x * Math.sin(theta);
      ring.position.y = pl.y * Math.cos(theta);
      ring.position.z = pl.z * Math.cos(theta);
      ring.rotation.z += Math.sin(theta) + 1;
      ring.rotation.y += Math.cos(theta) / 100;
    }
  });

  theta += ADD;

  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
