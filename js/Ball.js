class Ball {
  constructor(x, y) {
    this.radius = 25;
    this.x = x;
    this.y = y;
    this.vy = 2;
    this.img = new Image();
    this.img.src = "/Cups-Balls/images/55085_logo-ironhack copy.png" 

  }
  draw(ctx) {
    ctx.save();

    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    // Picture

    ctx.translate(this.x, this.y);
    let size = 3 * this.radius;
    ctx.drawImage(this.img, -size / 2, -size / 2, size, size);


    ctx.restore();
  }

  update(ctx) {
    this.y += this.vy;
  }
}
