class Game {
  constructor() {
    this.score = 0;
    this.page = "home"; // Possible values: "home", "intro", "shuffle", "guess", "win", "loose"
    this.framesBeforeNextPage = undefined; // undefined means: wait for the user input ; 42 means 42 frames before next this.page
  }
  startGame(level) {
    if (level === 1) {
      this.b1 = new Ball();
      this.cups = [
        new Cup(50, 200, 300, -20, -20, "red"),
        new Cup(50, 500, 300, +20, -20, "red"),
        new Cup(50, 700, 300, +30, +25, "red")
      ];
    }
    this.page = "intro";
    this.framesBeforeNextPage = 100;
  }
  draw(ctx) {
    if (this.page === "home") {
      drawHomeScreen();
    } else if (this.page === "win") {
      // TODO
    } else if (this.page === "loose") {
      // TODO
    } else {
      if (this.page === "intro") {
        this.b1.draw(ctx);
      }

      for (let i = 0; i < this.cups.length; i++) {
        this.cups[i].draw(ctx);
      }
    }
  }
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
  goToNextPage() {
    if (this.page === "intro") {
      this.page = "shuffle";
      this.framesBeforeNextPage = 300;
    } else if (this.page === "shuffle") {
      this.page = "guess";
      this.framesBeforeNextPage = undefined;
    }
  }
  guess(x, y) {
    if (this.page === "guess") {
      // TODO: find the index of the closest cup (you can use the function distance)
      let iClosestCup = 0;

      // TEST
      this.cups[iClosestCup].color = "green";
    }
  }
}
