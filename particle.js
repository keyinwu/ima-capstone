class Particle {

  constructor(x, y, buffer) {
    this.x = x;
    this.y = y;
    this.b = buffer;
    this.history = [];
  }

  update(newx, newy) {
    // this.x = this.x + random(-5, 5);
    // this.y = this.y + random(-5, 5);
    this.x = newx;
    this.y = newy;

    let v = createVector(this.x, this.y);

    this.history.push(v);
    //console.log(this.history.length);

    if (this.history.length > 15) {
      this.history.splice(0, 1);
    }
  }

  //trace animation
  show() {
    this.b.stroke(255);
    // this.b.beginShape();
    this.b.push();
    this.b.noStroke();
    this.b.fill(220);
    this.b.drawingContext.shadowBlur = 32;
    this.b.drawingContext.shadowColor = color(200);
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      // this.b.vertex(pos.x, pos.y);
      // this.b.fill(255, 245, 153);
      this.b.ellipse(pos.x, pos.y, 2*i, 2*i);
      // this.b.endShape();
    }
    this.b.ellipse(this.x, this.y, 20, 20);
    this.b.pop();
  }
}
