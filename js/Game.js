class Game {
  constructor() {
    this.score = 0;
    this.page = "home"; // Possible values: "home", "intro", "shuffle", "guess", "win", "loose"
    this.framesBeforeNextPage = undefined; // undefined means: wait for the user input ; 42 means 42 frames before next this.page
    this.level = 1;
    this.isGameOver = false;
  }
  startGame() {
    // TODO: do DOM manipulation to change the level

    this.page = "intro";
    this.framesBeforeNextPage = 100;

    if (this.level === 1) {
      this.b1 = new Ball(300, 150);
      this.cups = [
        new Cup(300, 350, "#fd5f00"),
        new Cup(600, 350, "#76b39d"),
        new Cup(900, 350, "#76b39d")
      ];
    }

    if (this.level === 2) {
      this.b1 = new Ball(300, 150);
      this.cups = [
        new Cup(300, 350, "#76b39d"),
        new Cup(600, 350, "#76b39d"),
        new Cup(900, 350, "#76b39d")
      ];
    }

    if (this.level === 3) {
      this.b1 = new Ball(200, 150);
      this.cups = [
        new Cup(200, 350, "#fd5f00"),
        new Cup(466, 350, "#fd5f00"),
        new Cup(730, 350, "#fd5f00"),
        new Cup(1000, 350, "#fd5f00")
      ];
    }

    if (this.level === 4) {
      this.b1 = new Ball(850, 200);
      this.cups = [
        new Cup(850, 400, "#76b39d"),
        new Cup(150, 300, "#76b39d"),
        new Cup(233, 200, "#76b39d"),
        new Cup(466, 300, "#76b39d"),
        new Cup(700, 150, "#76b39d"),
      ];
    }

    if (this.level === 5) {
      this.b1 = new Ball(900, 200);
      this.cups = [
        new Cup(100, 300, "#fd5f00"),
        new Cup(200, 200, "#fd5f00"),
        new Cup(300, 400, "#fd5f00"),
        new Cup(500, 200, "#fd5f00"),
        new Cup(700, 400, "#fd5f00"),
        new Cup(900, 400, "#fd5f00")
      ];
    }
  }

  // DRAW different Screens bTW the GAME

  draw(ctx) {
    if (this.page === "home") {
      drawHomeScreen();
    } else if (this.page === "win") {
      drawWinScreen();
    } else {
      if (this.page === "intro") {
        this.b1.draw(ctx);
      }
      for (let i = 0; i < this.cups.length; i++) {
        this.cups[i].draw(ctx);
      }
    }

    if (this.isGameOver) {
      ctx.save(); // TODO
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "white";
      ctx.font = "80px Arial";
      ctx.fillText("Game over", 10, 100);
      ctx.restore();
    }
  }

  // UPDATE THE GAME

  update() {
    if (Number.isInteger(this.framesBeforeNextPage)) {
      this.framesBeforeNextPage--;
      if (this.framesBeforeNextPage === 0) {
        this.goToNextPage();
      }
    }
    if (this.page === "intro") {
      this.b1.update();
    }
    if (this.page === "shuffle") {
      for (let i = 0; i < this.cups.length; i++) {
        this.cups[i].update();
      }
    }
  }

  // SWITCH BTW THE DIFFERENT STATES

  goToNextPage() {
    if (this.page === "intro") {
      this.page = "shuffle";
      this.framesBeforeNextPage = 200;
    } else if (this.page === "shuffle") {
      this.page = "guess";
      this.framesBeforeNextPage = undefined; // The user has to trigger the event to go to the next page
    } else if (this.page === "guess") {
      this.page = "show-winner";
      this.framesBeforeNextPage = 200;
    } else if (this.page === "show-winner") {
      this.level++;
      this.startGame();
    }
  }

  guess(x, y) {
    if (this.page === "guess") {
      // TODO: find the index of the closest cup (you can use the function distance)
      let iClosestCup = 0;

       // IF click of client is on a rect from  X and Y of iClosestCup + radius/2 than go 

      // TEST
      this.cups[iClosestCup].color = "green";

      // If the user has selected the right cup
      if (iClosestCup === 0) {
        this.goToNextPage();
      } else {
        this.isGameOver = true;
      }
    }
  }
}
