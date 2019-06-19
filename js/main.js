// Initialisation
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Constants
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// Global Variables

let g = new Game();
let $levelName = document.getElementById("levelName");
let $levelNumber = document.getElementById("levelNumber");
let $levelMax = document.getElementById("numberOfLevels");

function animation() {
  drawEverything();
  updateEverything();

  showLevelNumber();
  hideLevelName();
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

function initGame() {
  console.log("BOOM");

  if (g.page === "home" || g.page === "win" || g.isGameOver) {
    g.level = 1;
    g.startGame();
  }
}

document.onkeydown = event => {
  console.log(event.keyCode);

  if (event.keyCode === 32) {
    initGame();
  }
};

// HOMESCREEN

function drawHomeScreen() {
  ctx.save();

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "80px Permanent Marker";
  ctx.textAlign = "center";
  ctx.fillText("Where is the Ironhack ?", CANVAS_WIDTH / 2, 300);
  ctx.fillStyle = "#fd5f00";
  ctx.font = "20px Permanent Marker";
  ctx.fillText("< SPACE >", CANVAS_WIDTH / 2, 400);

  ctx.restore();
}

// INTROSCREEN

function introScreen() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// WIN SCREEN

function drawWinScreen() {
  ctx.save();

  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "40px Permanent Marker";
  ctx.textAlign = "center";
  ctx.fillText(
    "Started from the Bottom now we are here!",
    CANVAS_WIDTH / 2,
    300
  );

  ctx.restore();
}

// MOUSECLICK

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

document.querySelector("canvas").onclick = e => {
  let x = (e.layerX / canvas.clientWidth) * CANVAS_WIDTH;
  let y = (e.layerY / canvas.clientHeight) * CANVAS_HEIGHT;

  initGame()
  g.guess(x, y);
  //g.startGame(1)
};

// DOM

function hideLevelName() {
  if (g.page === "home") {
    $levelName.style.display = "none";
    $levelNumber.style.display = "none";
    $levelMax.style.display = "none";
  } else {
    $levelName.style.display = "inline";
    $levelNumber.style.display = "inline";
    $levelMax.style.display = "inline";
  }
}

function showLevelNumber() {
  if (g.page !== "home") $levelNumber.innerHTML = g.level;
}
