// Initialisation
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// constants
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// global variables
let g = new Game();

function animation() {
  drawEverything();
  updateEverything();

  window.requestAnimationFrame(animation);
}

animation();

function drawEverything() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  g.draw(ctx);
}

function updateEverything() {
  g.update();
}

document.onkeydown = event => {
  console.log(event.keyCode);
  // TODO: when a key between 1 and 9 is pressed, load a level and start the game
  // Space
  if (event.keyCode === 32) {
    g.startGame(1);
  }
};

function drawHomeScreen() {
  ctx.save();

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "42px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Welcome to my Game", CANVAS_WIDTH / 2, 300);

  ctx.restore();
}

function introScreen() {
  ctx.save();

  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

document.querySelector("canvas").onclick = e => {
  let x = (e.layerX / canvas.clientWidth) * CANVAS_WIDTH;
  let y = (e.layerY / canvas.clientHeight) * CANVAS_HEIGHT;

  g.guess(x, y);
};
