class Particle {

  constructor(x, y, buffer) {
    this.x = x;
    this.y = y;
    this.b = buffer;
    this.moved = 0;
    this.history = [];
    this.collection = [];
  }

  update(newx, newy) {
    this.moved = sqrt(pow(newx-this.x,2)+pow(newy-this.y,2));
    this.x = lerp(this.x, newx, 0.1);
    this.y = lerp(this.y, newy, 0.1);

    let v = createVector(this.x, this.y);

    this.history.push(v);
    //console.log(this.history.length);

    if (this.history.length > 5) {
      this.history.splice(0, 1);
    }
  }

  collect(newx, newy){
    let v = createVector(this.x, this.y);
    this.collection.push(v);
    // console.log(this.collection);
  }

  //trace animation
  show() {
    this.b.stroke(255);
    // this.b.beginShape();
    this.b.push();
    this.b.noStroke();
    this.b.fill(240);
    this.b.drawingContext.shadowBlur = 8;
    this.b.drawingContext.shadowColor = color(200);
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      // this.b.fill(255, 245, 153);
      this.b.ellipse(pos.x, pos.y, 2*i/3, 2*i/3);
    }
    for (var i = 0; i < this.collection.length; i++) {
      let pos = this.collection[i];
      this.b.fill(255, 245, 153);
      this.b.ellipse(pos.x, pos.y, 10, 10);
    }
    this.b.ellipse(this.x, this.y, 10, 10);
    this.b.pop();
  }
}
