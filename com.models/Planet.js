export class Planet {
  /**
   *
   * @param {number} width
   * @param {Hexadecimal} color
   * @param {number} position
   * @param {any|boolean} ring
   * @param {number} ringWidth
   * @param {number} ringSpaceWidth
   * @param {Hexadecimal} ringColor
   */
  constructor(
    width,
    color,
    position,
    ring,
    ringWidth,
    ringSpaceWidth,
    ringColor
  ) {
    this.width = width;
    this.color = color;
    this.position = position;
    this.x = position.x;
    this.z = position.z;
    this.y = position.y;
    this.ring = ring | undefined;
    this.ringWidth = ringWidth;
    this.ringSpaceWidth = ringSpaceWidth;
    this.ringColor = ringColor;

    this.planet = this.initPlanet();
    if (this.ring) {
      this.ring = this.initRing();
    }
  }
  /**
   * Initialises Planet with
   * passed values.
   * @returns Planet Object
   */

  initPlanet() {
    let geo = new THREE.SphereGeometry(this.width, 100, 100);
    let material = new THREE.MeshPhongMaterial({
      color: this.color,
      shininess: 100,
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
      color: this.ringColor,
      shininess: 100,
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
