class Flame{
  constructor(tempX, tempY, tempZ, tempR, buffer) {
    this.x = tempX;
    this.y = tempY;
    this.z = tempZ;
    this.radius = tempR;
    this.b = buffer;

    // pick a random color
    this.color = color(255);
    let r = random(3);
    if(r < 1){
      this.color = color(255,100,20,50); // orange
    } else if(r >= 1 && r < 2 ){
      this.color = color(255, 200, 10, 50); // yellow
    } else if(r >= 2 ){
      this.color = color(255, 80, 5, 50); // reddish
    }

  }

  show() {
    this.b.push();
    this.b.noStroke();
    this.b.fill(this.color);
    this.b.translate(this.x, this.y, this.z)
    this.b.sphere(this.radius);
    this.b.pop();
  }

  move() {
    this.x += random(-1, 1);
    this.y -= random(0.5, 1);
  }

  shrink(){
   // shrink size over time
   this.radius-=0.06;
  }



}
