class Torus {

  constructor(x, z, camX, camZ, content, id) {
    this.x = x;
    this.z = z;
    this.r = 18;
    this.tuber = 3;
    this.camX = camX;
    this.camZ = camZ;
    this.buffer = createGraphics(200, 200); //to change
    this.content = content;
    this.id = id;
    this.cameraL = false;
  }

  update() {
    let dis = sqrt(pow(this.camX-this.x,2)+pow(this.camZ-this.z,2));
    //trigger flame
    // if (dis < 90 && this.camZ - this.z > 60) {
    if (this.camX-this.x < 40 && this.camX-this.x > -40 && this.camZ - this.z < 90 && this.camZ - this.z > 60) {
      this.cameraL = true;
      // push();
      // texture(this.buffer);
      // fill(200, 10, 10);
      // sphere(this.r/5, 24, 24); //change after adjusting camera
      // pop();
      document.getElementById(this.id).style.display = "block"; // to normalize
      this.view(this.buffer);
      // console.log("yes!");
    }
    else{
      this.show();
      this.cameraL = false;
      document.getElementById(this.id).style.display = "none"; // to normalize
    }
  }

  show() {
    push();
    // drawingContext.shadowBlur = 32;
    // drawingContext.shadowColor = color(200);
    // fill(250);
    noStroke();
    specularMaterial(255);
    // shininess(10);
    torus(this.r, this.tuber); //change after adjusting camera , 30, 16
    pop();
  }

  isLock() {
    return this.cameraL;
  }

  view(cbuffer) {
    cbuffer.push();
    cbuffer.background(0);
    cbuffer.blendMode(ADD);
    cbuffer.tint(255, 0, 0, 200); // to change
    // cbuffer.tint(255, 0, 0, -cameraZ*2+2010);  // change with camera position
    cbuffer.image(this.content, 0, 0, cbuffer.width, cbuffer.height);
    cbuffer.pop();

    push();
    translate(0,-10,-10);
    texture(cbuffer);
    plane(100, 100); // to change
    pop();
  }

}
