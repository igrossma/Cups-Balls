class Ball {
  constructor(x, y) {
    this.radius = 25;
    this.x = x;
    this.y = y;
    this.vy = 2;
  }
  draw(ctx) {
    ctx.save();

    ctx.fillStyle = "white";
    ctx.strokeStyle = "red";

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
