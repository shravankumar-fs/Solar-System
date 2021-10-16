import { Planet } from "./Planet.js";
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
    this.sun = null;
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
      let material = new THREE.MeshBasicMaterial(0x123456);
      let p = new THREE.Mesh(geo, material);
      p.position.set(
        Math.random() > 0.5
          ? -800 + 1000 * Math.random()
          : 800 - 1000 * Math.random(),
        Math.random() > 0.5
          ? -800 + 1000 * Math.random()
          : 800 - 1000 * Math.random(),
        Math.random() > 0.5
          ? -800 + 1000 * Math.random()
          : 100 - 1000 * Math.random()
      );
      p.rotation.x += Math.PI / 2;
      this.scene.add(p);
    }
  }
  /**
   * creates Sun
   */
  createSun() {
    let geo = new THREE.SphereGeometry(3, 100, 100);
    let material = new THREE.MeshPhongMaterial({
      color: 0xf5e314,
      shininess: 100,
    });
    this.sun = new THREE.Mesh(geo, material);

    this.scene.add(this.sun);

    let light2 = new THREE.DirectionalLight(0xffffff, 2);
    light2.position.set(5, 5, 5);
    light2.target = this.sun;
    this.scene.add(light2);

    let light3 = new THREE.DirectionalLight(0xffffff, 2);
    light3.position.set(-5, -5, 5);
    light3.target = this.sun;
    this.scene.add(light3);
  }
  /**
   * creates Mercury
   */
  createMercury() {
    let pFac = new Planet(1, 0xfb0d0d, new THREE.Vector3(4, -5, 10));
    this.scene.add(pFac.getPlanet());
    this.planets.push(pFac);
  }

  /**
   * creates Venus
   */
  createVenus() {
    let pFac = new Planet(2, 0xec645d, new THREE.Vector3(-6, -8, -9));
    this.scene.add(pFac.getPlanet());
    this.planets.push(pFac);
  }
  /**
   * creates Earth
   */
  createEarth() {
    let pFac = new Planet(3, 0x3d5dff, new THREE.Vector3(-12, 13, 25));
    this.scene.add(pFac.getPlanet());
    this.planets.push(pFac);
  }
  /**
   * creates Mars
   */
  createMars() {
    let pFac = new Planet(2, 0xdf7a16, new THREE.Vector3(-18, 18, -20));
    this.scene.add(pFac.getPlanet());
    this.planets.push(pFac);
  }

  /**
   * creates Jupiter
   */
  createJupiter() {
    let pFac = new Planet(
      8,
      0xca5f09,
      new THREE.Vector3(-30, 30, -30),
      true,
      10,
      0.09,
      0xf9c14d
    );
    this.scene.add(pFac.getPlanet());
    this.scene.add(pFac.ring);
    this.planets.push(pFac);
  }
  /**
   * creates Saturn
   */
  createSaturn() {
    let pFac = new Planet(
      5,
      0x1f0909,
      new THREE.Vector3(30, -35, 20),
      true,
      12,
      4,
      0x1f0909
    );
    this.scene.add(pFac.getPlanet());
    this.scene.add(pFac.ring);
    this.planets.push(pFac);
  }
  /**
   * creates Uranus
   */
  createUranus() {
    let pFac = new Planet(
      5,
      0xade1ff,
      new THREE.Vector3(-43, 40, 23),
      true,
      8,
      1,
      0xadf1f2
    );
    this.scene.add(pFac.getPlanet());
    this.scene.add(pFac.ring);
    this.planets.push(pFac);
  }
  /**
   * creates Neptune
   */
  createNeptune() {
    let pFac = new Planet(
      5.8,
      0x1234ff,
      new THREE.Vector3(40, -40, 71),
      true,
      8,
      0.4,
      0x1234ff
    );
    this.scene.add(pFac.getPlanet());
    this.scene.add(pFac.ring);
    this.planets.push(pFac);
  }

  /**
   * Builds Solar System
   */
  buildSolarSystem() {
    /*Sun*/
    this.createSun();
    /*Planets*/
    this.createMercury();
    this.createVenus();
    this.createEarth();
    this.createMars();
    this.createJupiter();
    this.createSaturn();
    this.createUranus();
    this.createNeptune();
    /*Starry background*/
    this.createBackground();
  }

  /**
   * get Planet
   */

  getPlanets() {
    return this.planets;
  }

  getSun() {
    return this.sun;
  }
}
