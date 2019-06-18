// Initialisation
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Constants
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// Global Variables
let g = new Game();

function animation() {
  drawEverything();
  updateEverything();

  window.requestAnimationFrame(animation);
}

animation();

// DRAW 

function drawEverything() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  g.draw(ctx);
}

// UPDATE

function updateEverything() {
  g.update();
}


// EVENTLISTENER

document.onkeydown = event => {
  console.log(event.keyCode);
  // TODO: when a key between 1 and 9 is pressed, load a level and start the game
  // Space
  if (event.keyCode === 32) {
    g.startGame(1);
  }
};

// HOMESCREEN

function drawHomeScreen() {
  ctx.save();

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "80px Permanent Marker";
  ctx.textAlign = "center";
  ctx.fillText("FIND THE BALL", CANVAS_WIDTH / 2, 300);
  ctx.fillStyle = "yellow";
  ctx.font = "20px Permanent Marker";
  ctx.fillText("< Enter >", CANVAS_WIDTH/2, 400)


  ctx.restore();
}

// INTROSCREEN

function introScreen() {
  ctx.save();

  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// MOUSECLICK


function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

document.querySelector("canvas").onclick = e => {
  let x = (e.layerX / canvas.clientWidth) * CANVAS_WIDTH;
  let y = (e.layerY / canvas.clientHeight) * CANVAS_HEIGHT;

  g.guess(x, y);
};
