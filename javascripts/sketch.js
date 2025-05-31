const {
  int,
  intersect,
  rndInt,
  getAngleBtwTwoPoints,
  Branch,
} = window.__lib;

const gWidth = window.innerWidth;
const gHeight = window.innerHeight;

let branch1 = new Branch({
  x:      int( gWidth  /  2       ),
  y:      int( gHeight -( gHeight / 6 )),
  length: int(gHeight / 2),
  angle:  rndInt(-30, 30),
});

function setup() {
  createCanvas(gWidth, gHeight);
  angleMode(DEGREES);
}

const rebuild = () => {
  branch1.destroy();
  branch1 = new Branch({
    x:      int( gWidth  /  2       ),
    y:      int( gHeight -( gHeight / 6 )),
    length: int(gHeight / 2),
    angle:  rndInt(-30, 30),
  });
};

const rebuildTimout = _ => {
  rebuild()
  setTimeout(rebuildTimout , rndInt(1000, 6000));
}

rebuildTimout();

function draw() {
  background('rgba(200, 200, 200, 0.1)');
  branch1.render();
}
