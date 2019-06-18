class Ball {
  constructor() {
    this.radius = 25;
    this.x = CANVAS_WIDTH / 5;
    this.y = 100;
    this.vy = 2;
  }
  draw(ctx) {
    ctx.save();

    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.restore();
  }

  update(ctx) {
    this.y += this.vy;
  }
}
