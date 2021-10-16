export class Planet {
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

  getPlanet() {
    return this.planet;
  }

  getRing() {
    return this.ring;
  }
}

export const hi = "jk";
