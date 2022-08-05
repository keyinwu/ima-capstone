class Particle {

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.history = [];
  }

  update(newx, newy, newz) {
    // this.x = this.x + random(-5, 5);
    // this.y = this.y + random(-5, 5);
    this.x = newx;
    this.z = newz;

    let v = createVector(this.x, newy, this.z);

    this.history.push(v);
    //console.log(this.history.length);

    if (this.history.length > 25) {
      this.history.splice(0, 1);
    }
  }

  //trace animation
  show() {

    // drawingContext.shadowBlur = 32;
    // drawingContext.shadowColor = color(200);
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      // this.b.vertex(pos.x, pos.y);
      // this.b.fill(255, 245, 153);
      push();
      noStroke();
      fill(220);
      translate(pos.x, pos.y, pos.z);
      sphere(i/15);
      pop();
      // this.b.endShape();
    }
    push();
    noStroke();
    fill(220);
    translate(this.x, this.y, this.z);
    sphere(1);
    pop();
  }
}
