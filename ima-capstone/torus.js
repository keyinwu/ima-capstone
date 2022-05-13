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
    this.scroll = false;
    this.enter = false;
    this.preenter = false;
  }

  update(x, z, camX, camZ, prevZ) {
    this.x = x;
    this.z = z;
    this.camX = camX;
    this.camZ = camZ;
    let dis = sqrt(pow(this.camX-this.x,2)+pow(this.camZ-this.z,2));
    // if (dis < 90 && this.camZ - this.z > 60) {
    if (this.camX-this.x < 40 && this.camX-this.x > -40 && this.camZ - this.z < 90 && this.camZ - this.z > 60) {
      if ((camZ-prevZ < 0) || (this.scroll == true)) {
        this.enter = true;
        if (this.alpha < 255 || this.opacity < 1) {
          this.enterin();
        }
        this.view(this.buffer, this.alpha);
      }
    }
    else{
      this.enter = false;
      this.show();
    }

    //only excute when the status changes
    if (this.enter != this.preenter) {
      if (this.enter) {
        this.enterin();
      }
      else {
        this.leaveaway();
      }
    }
    this.preenter = this.enter;
  }

  enterin(){
    // console.log("yes");
    this.cameraL = true;
    this.scroll = true;
    if (this.alpha < 255) {
      this.alpha += 20;
    }
    if (this.opacity < 1) {
      this.opacity += 0.05;
    }
    document.getElementById(this.id).style.display = "block";
    document.getElementById(this.id).style.opacity = this.opacity;
    document.getElementById("m_scroll").style.display = "block";
  }

  leaveaway(){
    this.alpha = 0;
    this.cameraL = false;
    this.scroll = false;
    // if (this.opacity > 0) {
    //   this.opacity -= 0.1;
    // }
    document.getElementById(this.id).style.opacity = 0;
    // if (this.opacity <= 1) {
    document.getElementById(this.id).style.display = "none";
    // }
    document.getElementById(this.id+"-1").style.display = "none";
    document.getElementById(this.id+"-2").style.display = "none";
    // this.fadeout("m_scroll");
    // if (this.alpha > 0) {
    //   this.alpha -= 2;
    //   this.view(this.buffer, this.alpha);
    // }

    // document.getElementById(this.id).style.display = "none"; // to normalize
  }

  show() {
    push();
    // drawingContext.shadowBlur = 32;
    // drawingContext.shadowColor = color(200);
    // specularMaterial(255);
    rotateZ(PI);
    // normalMaterial();
    if (this.camX-this.x < 60 && this.camX-this.x > -60 && this.camZ - this.z < 130 && this.camZ - this.z >= 90) {
      texture(symtex2);
    }
    else {
      texture(symtex);
    }

    model(this.model);
    // shininess(10);
    // torus(this.r, this.tuber); //change after adjusting camera , 30, 16
    pop();
  }

  isLock() {
    return this.cameraL;
  }

  isScroll() {
    if (this.scroll) {
      return this.id;
    }else {
      return null;
    }
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


  logging(){
    console.log(this.camX-this.x, this.camZ - this.z);
  }

}
