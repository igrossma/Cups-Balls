class Game {
  constructor() {
    this.score = 0;
    this.page = "home"; // Possible values: "home", "intro", "shuffle", "guess", "win", "loose"
    this.framesBeforeNextPage = undefined; // undefined means: wait for the user input ; 42 means 42 frames before next this.page
    this.level = 1;
    this.isGameOver = false;
  }
  startGame() {
    $body.style.backgroundColor = "black";
    this.isGameOver = false;
    this.page = "intro";
    this.framesBeforeNextPage = 100;

    if (this.level === 1) {
      this.b1 = new Ball(300, 150, 0, 2);
      this.cups = [
        new Cup(300, 350, "#ff5722"),
        new Cup(600, 350, "#004d61"),
        new Cup(900, 350, "#eeeeee")
      ];
    }

    if (this.level === 2) {
      this.b1 = new Ball(300, 150, 0, 2);
      this.cups = [
        new Cup(300, 350, "#eeeeee"),
        new Cup(600, 350, "#eeeeee"),
        new Cup(900, 350, "#eeeeee")
      ];
    }

    if (this.level === 3) {
      this.b1 = new Ball(200, 550, 0, -2);
      this.cups = [
        new Cup(200, 350, "#ff5722"),
        new Cup(466, 350, "#ff5722"),
        new Cup(730, 350, "#ff5722"),
        new Cup(1000, 350, "#ff5722")
      ];
    }

    if (this.level === 4) {
      this.b1 = new Ball(850, 150, 0 , 2);
      this.cups = [
        new Cup(850, 350, "#eeeeee"),
        new Cup(600, 350, "#eeeeee"),
        new Cup(350, 350, "#eeeeee"),
        new Cup(600, 175, "#eeeeee"),
        new Cup(600, 525, "#eeeeee")
      ];
    }

    if (this.level === 5) {
      this.b1 = new Ball(1050, 260, -2, 0);
      this.cups = [
        new Cup(850, 260, "#fd5f00"),
        new Cup(600, 260, "#fd5f00"),
        new Cup(350, 260, "#fd5f00"),
        new Cup(850, 435, "#fd5f00"),
        new Cup(600, 435, "#fd5f00"),
        new Cup(350, 435, "#fd5f00")
      ];
    }

    if (this.level === 6) {
      this.b1 = new Ball(1100, 175, -2, 0);
      this.cups = [
        new Cup(900, 175, "#76b39d"),
        new Cup(300, 175, "#76b39d"),
        new Cup(300, 175, "#76b39d"),
        new Cup(300, 175, "#76b39d"),
        new Cup(300, 525, "#76b39d"),
        new Cup(300, 525, "#76b39d"),
        new Cup(300, 525, "#76b39d"),
        new Cup(900, 525, "#76b39d"),
        new Cup(900, 525, "#76b39d"),
        new Cup(900, 525, "#76b39d")
      ];
    }

    if (this.level === 7) {
      this.b1 = new Ball(900, 400, -2, 0);
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

    // if (this.level === 8) {
    //   this.b1 = new Ball(700, 200);
    //   this.cups = [
    //     new Cup(700, 400, "#76b39d"),
    //     new Cup(100, 300, "#76b39d"),
    //     new Cup(200, 200, "#76b39d"),
    //     new Cup(400, 400, "#76b39d"),
    //     new Cup(400, 400, "#76b39d"),
    //     new Cup(600, 400, "#76b39d"),
    //     new Cup(600, 400, "#76b39d"),
    //     new Cup(600, 400, "#76b39d"),
    //     new Cup(600, 500, "#76b39d"),
    //     new Cup(500, 500, "#76b39d"),
    //     new Cup(500, 500, "#76b39d"),
    //     new Cup(500, 500, "#76b39d"),
    //     new Cup(600, 400, "#76b39d"),
    //     new Cup(600, 500, "#76b39d"),
    //     new Cup(500, 500, "#76b39d"),
    //     new Cup(500, 500, "#76b39d"),
    //     new Cup(500, 500, "#76b39d")
    //   ];
    // }
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

      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#eeeeee";
      ctx.font = "120px Permanent Marker";
      ctx.textAlign = "center";
      ctx.fillText("Game over", CANVAS_WIDTH / 2, 275);
      ctx.fillStyle = "#94fc13";
      ctx.font = "30px Permanent Marker";
      ctx.textAlign = "center";
      ctx.fillText("You lost him, I know it is hard, but", CANVAS_WIDTH / 2, 350)
      ctx.fillText("come on, You can do better!", CANVAS_WIDTH / 2, 400);
      ctx.fillStyle = "#ff5722";
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
      this.framesBeforeNextPage = 150;
      // play sound
    } else if (this.page === "show-winner") {
      if (this.level < 7) {
        this.level++;
        this.startGame();
      }
      else {
        this.page = "win";
      }
    }
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
      }
      

      // If the user has selected the right cup
      if (iClosestCup === 0) {
        this.goToNextPage();
        this.cups[iClosestCup].color = "#94fc13";
      } else {
        this.cups[iClosestCup].color = "red";
        this.cups[0].color = "#94fc13";
        this.isGameOver = true;

      }
    }
  }
}
