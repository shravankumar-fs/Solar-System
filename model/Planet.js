export class Planet {
  /**
   *
   * @param {number} width
   * @param {String} map
   * @param {Vector} position
   * @param {number} ringWidth
   * @param {number} ringSpaceWidth
   * @param {String} ringMap
   */
  constructor(width, map, position, ringWidth, ringSpaceWidth, ringMap) {
    this.width = width;
    this.map = map;
    this.position = position;
    this.x = position.x;
    this.z = position.z;
    this.y = position.y;
    this.ringWidth = ringWidth;
    this.ringSpaceWidth = ringSpaceWidth;
    this.ringMap = ringMap;
    this.planet = this.initPlanet();
    if (this.ringWidth) {
      this.ring = this.initRing();
    } else this.ring = undefined;
  }
  /**
   * Initialises Planet with
   * passed values.
   * @returns Planet Object
   */

  initPlanet() {
    let geo = new THREE.SphereGeometry(this.width, 100, 100);
    let material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(this.map),
      shininess: 100,
      side: THREE.DoubleSide,
    });
    let p = new THREE.Mesh(geo, material);
    p.position.set(this.position.x, this.position.y, this.position.z);
    return p;
  }
  /**
   * Initialises ring
   * @returns ring Torus
   */
  initRing() {
    let g = new THREE.TorusGeometry(this.ringWidth, this.ringSpaceWidth, 2, 30);
    let m = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(this.ringMap),
      shininess: 100,
      transparent: true,
      opacity: 0.5,
    });
    let r = new THREE.Mesh(g, m);
    r.position.set(this.position.x, this.position.y, this.position.z);
    r.rotation.x += Math.PI / 2.5;
    return r;
  }
  /**
   * gets Planet Object
   * @returns Planet
   */
  getPlanet() {
    return this.planet;
  }
  /**
   * gets Ring Object
   * @returns Ring Torus
   */
  getRing() {
    return this.ring;
  }
}
