// Initialisation
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// constants
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// global variables

let page = "home"; // Possible values: "home", "intro", "shuffle", "guess", "win", "loose"
let framesBeforeNextPage = undefined; // undefined means: wait for the user input ; 42 means 42 frames before next page
let level = 1;

let b1 = new Ball();
let c1 = new Cup(50, 200, 300, -20, -20, "red");
let c2 = new Cup(50, 500, 300, +20, -20, "red");
let c3 = new Cup(50, 700, 300, +30, +25, "red");

function animation() {
  if (page === "home") {
    drawHomeScreen();
  }
  else if (page === "win") {
    // TODO
  }
  else if (page === "loose") {
    // TODO
  }
  else {
    drawEverything();
  }

  updateEverything();

  window.requestAnimationFrame(animation);
}

animation();

function drawEverything() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (page === "intro") b1.draw(ctx);

  c1.draw(ctx);
  c2.draw(ctx);
  c3.draw(ctx);
}

function updateEverything() {
  if (Number.isInteger(framesBeforeNextPage)) {
    framesBeforeNextPage--
    if (framesBeforeNextPage === 0) {
      if (page === "intro") {
        page = "shuffle"
        framesBeforeNextPage = 200
      }
      else if (page === "shuffle") {
        page = "guess"
      }
    }
  }
  if (page === "intro") {
    b1.update()
  }


  if (page === "shuffle") {
    c1.update();
    c2.update();
    c3.update();
  }
}

document.onkeydown = event => {
  console.log(event.keyCode);
  // Space
  if (event.keyCode === 32) {
    page = "intro";
    framesBeforeNextPage = 100
  }
  // Enter
  if (event.keyCode === 13) {
    page = "intro";
  }
};

function drawHomeScreen() {
  ctx.save();

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "42px Arial";
  ctx.fillText("Welcome to my Game", 200, 300);

  ctx.restore();
}

function introScreen() {
  ctx.save();

  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
