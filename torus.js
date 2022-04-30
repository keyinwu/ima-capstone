class Torus {

  constructor(content, id, model) {
    this.x = 0;
    this.z = 0;
    this.r = 18;
    this.tuber = 3;
    this.camX = 0;
    this.camZ = 0;
    this.buffer = createGraphics(200, 200); //to change
    this.content = content;
    this.id = id;
    this.model = model;
    this.alpha = 0;
    this.opacity = 0;
    this.cameraL = false;
  }

  update(x, z, camX, camZ) {
    this.x = x;
    this.z = z;
    this.camX = camX;
    this.camZ = camZ;
    let dis = sqrt(pow(this.camX-this.x,2)+pow(this.camZ-this.z,2));
    //trigger flame
    // if (dis < 90 && this.camZ - this.z > 60) {
    if (this.camX-this.x < 40 && this.camX-this.x > -40 && this.camZ - this.z < 90 && this.camZ - this.z > 60) {
      // console.log("yes");
      this.cameraL = true;
      // push();
      // texture(this.buffer);
      // fill(200, 10, 10);
      // sphere(this.r/5, 24, 24); //change after adjusting camera
      // pop();
      // document.getElementById(this.id).style.display = "block"; // to normalize
      // console.log(document.getElementById(this.id).style.opacity);
      this.fadein(this.id);
      if (this.alpha < 255) {
        this.alpha += 20;
      }
      // console.log(this.alpha);
      this.view(this.buffer, this.alpha);
      // console.log("yes!");
    }
    else{
      this.alpha = 0;
      this.cameraL = false;
      this.fadeout(this.id);
      this.show();
      // document.getElementById(this.id).style.display = "none"; // to normalize
    }
  }

  show() {
    push();
    // drawingContext.shadowBlur = 32;
    // drawingContext.shadowColor = color(200);
    // fill(250);
    // noStroke();
    // specularMaterial(255);
    rotateZ(PI);
    normalMaterial();
    texture(symtex);
    model(this.model);
    // shininess(10);
    // torus(this.r, this.tuber); //change after adjusting camera , 30, 16
    pop();
  }

  isLock() {
    return this.cameraL;
  }

  view(cbuffer, alpha) {
    cbuffer.push();
    cbuffer.background(0);
    cbuffer.blendMode(ADD);
    cbuffer.tint(255, 0, 0, alpha);
    // cbuffer.tint(255, 0, 0, -cameraZ*2+2010);  // change with camera position
    cbuffer.image(this.content, 0, 0, cbuffer.width, cbuffer.height);
    cbuffer.pop();

    push();
    translate(0,-10,-10);
    texture(cbuffer);
    plane(120, 120); // to change
    pop();
  }

  fadein(id){
    document.getElementById(id).style.display = "block";
    if (this.opacity < 1) {
      this.opacity += 0.1;
    }
    document.getElementById(id).style.opacity = this.opacity;
  }

  fadeout(id){
    if (this.opacity > 0) {
      this.opacity -= 0.1;
    }
    document.getElementById(id).style.opacity = this.opacity;
    document.getElementById(id).style.display = "none";
  }

  logging(){
    console.log(this.camX-this.x, this.camZ - this.z);
  }

}
