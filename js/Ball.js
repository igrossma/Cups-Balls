class Ball {
  constructor() {
    this.radius = 30;
    this.x = CANVAS_WIDTH / 5;
    this.y = 200;
    this.vy = 1;
  }
  draw(ctx) {
    ctx.save();

    ctx.fillStyle = "beige";

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
