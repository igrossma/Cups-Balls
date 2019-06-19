class Game {
  constructor() {
    this.score = 0;
    this.page = "home"; // Possible values: "home", "intro", "shuffle", "guess", "win", "loose"
    this.framesBeforeNextPage = undefined; // undefined means: wait for the user input ; 42 means 42 frames before next this.page
    this.level = 1;
    this.isGameOver = false;
  }
  startGame() {
    this.isGameOver = false;
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
        new Cup(700, 150, "#76b39d")
      ];
    }

    if (this.level === 5) {
      this.b1 = new Ball(900, 200);
      this.cups = [
        new Cup(900, 400, "#fd5f00"),
        new Cup(100, 300, "#fd5f00"),
        new Cup(200, 200, "#fd5f00"),
        new Cup(300, 400, "#fd5f00"),
        new Cup(500, 200, "#fd5f00"),
        new Cup(700, 400, "#fd5f00")
      ];
    }

    if (this.level === 6) {
      this.b1 = new Ball(900, 200);
      this.cups = [
        new Cup(900, 400, "#76b39d"),
        new Cup(100, 300, "#76b39d"),
        new Cup(200, 200, "#76b39d"),
        new Cup(400, 400, "#76b39d"),
        new Cup(400, 400, "#76b39d"),
        new Cup(600, 400, "#76b39d"),
        new Cup(600, 400, "#76b39d"),
        new Cup(600, 400, "#76b39d"),
        new Cup(600, 400, "#76b39d")
      ];
    }

    if (this.level === 7) {
      this.b1 = new Ball(700, 200);
      this.cups = [
        new Cup(700, 400, "#fd5f00"),
        new Cup(600, 300, "#fd5f00"),
        new Cup(600, 400, "#fd5f00"),
        new Cup(600, 400, "#fd5f00"),
        new Cup(600, 400, "#fd5f00"),
        new Cup(600, 400, "#fd5f00"),
        new Cup(600, 400, "#fd5f00"),
        new Cup(600, 400, "#fd5f00"),
        new Cup(600, 500, "#fd5f00"),
        new Cup(600, 500, "#fd5f00"),
        new Cup(600, 500, "#fd5f00"),
        new Cup(600, 500, "#fd5f00")
      ];
    }

    if (this.level === 8) {
      this.b1 = new Ball(700, 200);
      this.cups = [
        new Cup(700, 400, "#76b39d"),
        new Cup(100, 300, "#76b39d"),
        new Cup(200, 200, "#76b39d"),
        new Cup(400, 400, "#76b39d"),
        new Cup(400, 400, "#76b39d"),
        new Cup(600, 400, "#76b39d"),
        new Cup(600, 400, "#76b39d"),
        new Cup(600, 400, "#76b39d"),
        new Cup(600, 500, "#76b39d"),
        new Cup(500, 500, "#76b39d"),
        new Cup(500, 500, "#76b39d"),
        new Cup(500, 500, "#76b39d"),
        new Cup(600, 400, "#76b39d"),
        new Cup(600, 500, "#76b39d"),
        new Cup(500, 500, "#76b39d"),
        new Cup(500, 500, "#76b39d"),
        new Cup(500, 500, "#76b39d")
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
      ctx.save();

      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "white";
      ctx.font = "120px Permanent Marker";
      ctx.textAlign = "center";
      ctx.fillText("Game over", CANVAS_WIDTH / 2, 300);
      ctx.fillStyle = "green";
      ctx.font = "40px Permanent Marker";
      ctx.textAlign = "center";
      ctx.fillText("try again", CANVAS_WIDTH / 2, 400);
      ctx.fillStyle = "#fd5f00";
      ctx.font = "20px Permanent Marker";
      ctx.textAlign = "center";
      ctx.fillText("< space >", CANVAS_WIDTH / 2, 500);

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
    // if (this.isGameOver)
    //   this.page === "home"
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
      this.framesBeforeNextPage = 100;
      // play sound
    } else if (this.page === "show-winner") {
      if (this.level < 8) {
        this.level++;
        this.startGame();
      }
      else {
        this.page = "win";
      }
    }
    //else if (this.isGameOver)
    //this.framesBeforeNextPage = undefined;
  }

  guess(x, y) {
    if (this.page === "guess") {
      let click = {
        x: x,
        y: y
      };
      let iClosestCup = 0;
      let distMin = Infinity;

      for (let i = 0; i < this.cups.length; i++) {
        let curDist = distance(click, this.cups[i]);
        console.log(i, curDist);
        
        if (distMin > curDist) {
          distMin = curDist
          iClosestCup = i
        }

        // WHAT IS THE INDEX of the CUP WITH THE SHORTEST DISTANCE

        // distance(this.cups[i], MouseEvent) <

        // this.cup[i].x
        // this.cup[i].y

        // mouseclick.x
        // mouseclick.y

        console.log(this.cups[i]);

      }
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
