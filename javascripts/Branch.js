'use strict';
(function () {
  if(!window.__lib) window.__lib = {};
  const {
    getCoordsByAngle,
    intersect,
    Leaf,
    rndInt,
    rndFromArray,
  } = window.__lib;

  class Branch {

    x      = 0;
    y      = 0;
    length = 0;
    #angle  = 0;

    branches = [];
    leafs = [];
    parent = null;
    dist = null;

    static branches = [];

    constructor(options) {
      const {
        angle  = 0,
        length = 0,
        parent = null,
        x      = 0,
        y      = 0,
        dist   = 0,
      } = options;

      this.x      = x;
      this.y      = y;
      this.length = length;
      this.#angle  = angle;
      if(parent) this.parent = parent;
      if(dist) this.dist = dist;
      for (let index = 0; index < rndInt(1, 3); index++) {
        if(this.branches.length < 3 && !this.parent?.parent?.parent?.parent?.parent) {
          this.initChilds(); 
        }
      }
      this.initLeafs();
      Branch.branches.push(this);
    }

    destroy () {
      delete this.branches;
      if(this.parent) delete this.parent;
      Branch.branches = [];
    }

    render () {
      line(this.x, this.y, this.x2, this.y2);
      this.renderChilds();
      this.renderInersect();
      this.renderLeafs();
    }
    renderPoint (x, y) {
      fill('white');
      circle(x, y, 5); 
    }

    renderLeafs() {
      this.leafs.forEach(leaf => leaf.render());
    }

    renderInersect () {
      for (const branch of Branch.branches) {
        if(branch === this) continue;
        const { x, y } = getCoordsByAngle(this.x, this.y, this.angle, this.length);
        const rIntersect = intersect(this.x, this.y, this.x2, this.y2, branch.x, branch.y, branch.x2, branch.y2);
        if(rIntersect ) {
          const { x: x2, y: y2 } = rIntersect;
          branch.renderPoint(x2, y2);
        }
      }
    }

    initLeafs() {
      for (let index = 0; index < rndInt(5, 20); index++) {
        const {x, y} = getCoordsByAngle(this.x, this.y, this.angle, rndInt(this.length / 6, this.length - (this.length / 10)));
        const leaf = new Leaf({
          x: x,
          y: y,
          angle: ( this.angle - rndInt(-60, 60) ) - 90 * rndFromArray([1, -1]),
          length: (this.length / 30),
        })
        this.leafs.push(leaf);
      }
      const leafEnd1 = new Leaf({
        x: this.x2,
        y: this.y2,
        angle: ( this.angle - rndInt(-60, 60) ) - 90 * rndFromArray([1, -1]),
        length: (this.length / 30),
      });
      const leafEnd2 = new Leaf({
        x: this.x2,
        y: this.y2,
        angle: leafEnd1.angle * -1 ,
        length: (this.length / 30),
      });
      this.leafs.push(leafEnd1);
      this.leafs.push(leafEnd2);
    }

    initChilds () {
      const dist = rndInt(this.length / 5, this.length - (this.length / 5));
      const {x, y} = getCoordsByAngle(this.x, this.y, this.angle, dist);
      this.branches.push(new Branch({
        angle: this.angle + rndInt(-90, 90),
        length: this.length - (this.length / rndInt(2,4)),
        parent: this,
        x,
        y,
        dist,
      }));
    }

    renderChilds () {
      for (const branch of this.branches) {
        branch.render(); 
        // const {x, y} = getCoordsByAngle(this.x, this.y, this.angle, branch.dist);
        // // branch.x = x;
        // // branch.y = y;
      }
    }

    set angle(angle) { this.#angle = ( angle % 360 ); }
    get angle() { return this.#angle; }
    get x2() { return getCoordsByAngle(this.x, this.y, this.angle, this.length).x; }
    get y2() { return getCoordsByAngle(this.x, this.y, this.angle, this.length).y; }

  };

  window.__lib.Branch = Branch;

})();
