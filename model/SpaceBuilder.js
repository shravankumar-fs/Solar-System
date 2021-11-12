import { Planet } from "./Planet.js";
const PATH = "./resources/planetInfo.json";
/**
 * Builds Space
 */
export class SpaceBuilder {
  /**
   * Constructor
   * @param {THREE.Scene} scene
   */
  constructor(scene) {
    this.scene = scene;
    this.planets = [];
    this.planetList = [];
    this.sun = null;
    this.loadPlanetData(PATH);
  }

  async loadPlanetData(url) {
    const res = await fetch(url);
    this.planetList = await res.json();
  }

  /**
   * creates starry Background
   */
  createBackground() {
    for (let i = 0; i < 1000; i++) {
      let geo = new THREE.SphereGeometry(
        2,
        4 + ((i * Math.random()) % 4),
        2,
        3,
        6.3,
        3,
        0.8
      );
      let material = new THREE.MeshBasicMaterial(0xffffff * Math.random());
      let p = new THREE.Mesh(geo, material);
      p.position.set(
        Math.random() > 0.5
          ? -800 + 1000 * Math.random()
          : 800 - 1000 * Math.random(),
        Math.random() > 0.5
          ? -800 + 1000 * Math.random()
          : 800 - 1000 * Math.random(),
        Math.random() > 0.5
          ? -700 + 100 * Math.random()
          : 700 - 100 * Math.random()
      );
      p.rotation.x += Math.PI / 2;
      this.scene.add(p);
    }
  }
  /**
   * creates Sun
   */
  createSun() {
    let geo = new THREE.SphereGeometry(10, 100, 100);
    let material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("resources/maps/sun.jpg"),
    });
    this.sun = new THREE.Mesh(geo, material);

    let light = new THREE.PointLight(0xffffff, 2, 200, 1);
    light.position.set(0, 0, 0);
    this.scene.add(light);
    this.scene.add(this.sun);

    let light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.position.set(0, 0, 200);
    this.scene.add(light2);
    light2.target = this.sun;

    let light3 = new THREE.DirectionalLight(0xffffff, 0.5);
    light3.position.set(0, 0, -200);
    this.scene.add(light3);
    light3.target = this.sun;
  }

  createPlanets() {
    setTimeout(() => {
      for (let planet of this.planetList) {
        let details = planet.details;
        let p = new Planet(
          details.width,
          details.map,
          new THREE.Vector3(
            details.position.x,
            details.position.y,
            details.position.z
          ),
          details.ringWidth,
          details.ringSpaceWidth,
          details.ringMap
        );
        this.scene.add(p.getPlanet());
        if (p.getRing()) this.scene.add(p.getRing());

        this.planets.push(p);
      }
    }, 600);
  }
  /**
   * Builds Solar System
   */
  buildSolarSystem() {
    /*Sun*/
    this.createSun();
    /*Planets*/
    this.createPlanets();

    /*Starry background*/

    this.createBackground();
  }

  /**
   * get Planets
   */
  getPlanets() {
    return this.planets;
  }
  /**
   * get Sun
   * @returns sun Object
   */
  getSun() {
    return this.sun;
  }
}
