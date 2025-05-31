'use strict';
(function () {
  if(!window.__lib) window.__lib = {};
  const {
    getCoordsByAngle,
  } = window.__lib;

  class Leaf {

    x      = 0;
    y      = 0;
    length = 0;
    #angle  = 0;

    leafs = [];

    static leafs= [];

    constructor(options) {
      const {
        angle  = 0,
        length = 0,
        x      = 0,
        y      = 0,
      } = options;

      this.x      = x;
      this.y      = y;
      this.length = length;
      this.#angle  = angle;
      this.color = this.getColor();
      Leaf.leafs.push(this);
    }

    destroy () { }
    getColor() {
      const r = rndInt(0, 127);
      const g = rndInt(127, 255);
      const b = rndInt(0, 127);
      return `rgb(${r}, ${g}, ${b})`;
    }

    render () {
      // line(this.x, this.y, this.x2, this.y2);
      fill(this.color);
      const q = val => val * 0.5;
      bezier(
        this.x, this.y,
        this.x2 - q(10),  this.y2 - q(15),
        this.x2 + q(20), this.y2 - q(15),
        this.x, this.y,
      );
    }

    set angle(angle) { this.#angle = ( angle % 360 ); }
    get angle() { return this.#angle; }
    get x2() { return getCoordsByAngle(this.x, this.y, this.angle, this.length).x; }
    get y2() { return getCoordsByAngle(this.x, this.y, this.angle, this.length).y; }

  };
  window.__lib.Leaf = Leaf;

})();
