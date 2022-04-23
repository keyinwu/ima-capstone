"use strict"

let leftBuffer;
let rightBuffer;
let moveBuffer;
let showBuffer;
let textBuffer;
let textBuffer2;
let maskBuffer;
let tB1;
let tB2;

let patternBuffer;

//camera
let cameraLock = false;
let cameraX = 0;
let cameraY = 0;
let cameraZ = 1000;
let startZ = 1000;
let maxX = 200;
let delta_x = 0;
let delta_y = 0;
let xangle = 0;
let yangle = 0;
let cspeed = 5;
let movespeed;
let prevX;
let prevY;
let prevZ;

//paper cutting materials
let large;
let largeBuffer;
let complete;
let completeBuffer;
let lively;
let livelyBuffer;
let rng;
let rngBuffer;
let imagery;
let imageryBuffer;
let folk;
let folkBuffer;
let doll;
let dollBuffer;
let doorgod;
let doorgodBuffer;
let tigers;
let tigersBuffer;
let textures;
let texturesBuffer;
let serrations;
let serrationsBuffer;
let crescents;
let crescentsBuffer;
let maojiao;
let maojiaoBuffer;
let worship;
let worshipBuffer;
let witchcraft;
let witchcraftBuffer;
let zhuyou;
let zhuyouBuffer;
let newyear;
let newyearBuffer;
let wish;
let wishBuffer;
let various;
let variousBuffer;
let language;
let languageBuffer;

let contents;
let idnames;
// let buffers = [completeBuffer,livelyBuffer,rngBuffer,imageryBuffer,folkBuffer,dollBuffer,doorgodBuffer,tigersBuffer,texturesBuffer,serrationsBuffer,crescentsBuffer,maojiaoBuffer,worshipBuffer,witchcraftBuffer,zhuyouBuffer,newyearBuffer,wishBuffer,variousBuffer,languageBuffer]

//leftBuffer
// let cam;
// let flame = [];
// let numflame = 20;
//
// let rot_spd;
// let rot_acc;
// let textimg;
// let textclr;
// let rendered;
// let imgMask;
//
// let originx;
// let originy;
// let fansize;
// let particle;

// let xpos;
// let ypos;
let fand;
let fantheta;

let size;


//animation pattern
let r, d;
let theta;

let bg_r;
let cpairs = [];

let timecheck;
let stopcheck = false;


function preload(){
 // textimg = loadImage('text.png');
 // imgMask = loadImage('mask.png');

 large = loadImage('images/large.jpeg');
 complete = loadImage('images/complete.jpeg');
 lively = loadImage('images/lively.jpg');
 rng = loadImage('images/rng.jpeg');
 imagery = loadImage('images/imagery.jpeg');
 folk = loadImage('images/folk.jpeg');
 doll = loadImage('images/doll.png');
 doorgod = loadImage('images/doorgod.jpeg');
 tigers = loadImage('images/tigers.jpeg');
 textures = loadImage('images/large.jpeg'); //to change
 serrations = loadImage('images/large.jpeg'); //to change
 crescents = loadImage('images/large.jpeg'); //to change
 maojiao = loadImage('images/large.jpeg'); //to change
 worship = loadImage('images/large.jpeg'); //to change
 witchcraft = loadImage('images/large.jpeg'); //to change
 zhuyou = loadImage('images/large.jpeg'); //to change
 newyear = loadImage('images/large.jpeg'); //to change
 wish = loadImage('images/large.jpeg'); //to change
 various = loadImage('images/large.jpeg'); //to change
 language = loadImage('images/large.jpeg'); //to change

 contents = [complete,lively,rng,imagery,folk,doll,doorgod,tigers,textures,serrations,crescents,maojiao,worship,witchcraft,zhuyou,newyear,wish,various,language];
 idnames = ["complete","lively","rng","imagery","folk","doll","doorgod","tigers","textures","serrations","crescents","maojiao","worship","witchcraft","zhuyou","newyear","wish","various","language"];
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    perspective(3*PI/7, width/height, 0.1, (height/2) / tan(PI/6)*10); //width/height?
    cursor('grab');

    for (var i = 0; i < contents.length; i++) { //contents.length
      contents[i].filter(INVERT);
      contents[i].filter(GRAY);
    }

    //pattern
    size = 400;
    patternBuffer = createGraphics(400, 400);
    r = 5;
    d = 25;
    theta = 0;
    bg_r = 180;
    prevX = 0;
    prevZ = startZ;
    cpairs = [[0,0]];
    patternBuffer.background(0);
    patternBuffer.ellipseMode(CENTER);
    patternBuffer.noStroke();
    let rightColor = color(190,10,10);
    // rightColor.setAlpha(128 + 128 * sin(millis() / 1000));
    patternBuffer.fill(rightColor);
    patternBuffer.ellipse(size / 2, size / 2, 2*bg_r, 2*bg_r);


    // tB1 = createGraphics(200, 200);
    // tB2 = createGraphics(200, 200);

    // xpos = 0;
    // ypos = 0;
    //
    // //leftBuffer rotation
    // rot_spd = frameCount * 0.001;
    // rot_acc = 0;
    //
    // //animation

    //
    // originx = 0;
    // originy = 200;
    // fansize = 1600;
    //
    // rightBuffer.background(0);
    // rightBuffer.ellipseMode(CENTER);
    // rightBuffer.noStroke();
    // let rightColor = color(190,10,10);
    // // rightColor.setAlpha(128 + 128 * sin(millis() / 1000));
    // rightBuffer.fill(rightColor);
    // rightBuffer.ellipse(size / 2, size / 2, 2*bg_r, 2*bg_r);


}

function draw() {
    resizeCanvas(windowWidth, windowHeight, WEBGL);
    drawMove();
    drawContents();
    // drawFloor(); to do
    drawPattern();

}

//user perspective
function drawMove() {
  // version 1
  // // let cam = createCamera();
  // delta_x = map(mouseX-width/2, -width/2+100, width/2-100, -750, 750, true);
  // delta_y = map(mouseY-height/2, -height/2+100, height/2-100, -800, 600, true);
  // // let temp_angle = atan2(sqrt(pow(delta_x,2)+pow(delta_y,2)), cameraZ);
  // yangle = atan2(delta_x, cameraZ);
  // if (mouseIsPressed) {
  //   cameraX += cspeed*sin(yangle);
  //   cameraZ -= cspeed*cos(yangle);
  // }
  // camera(cameraX, cameraY, cameraZ, delta_x, delta_y, 0, 0, 1, 0);
  // //size/2/tan(PI/6)

  // version 2
  // console.log(cameraLock);
  if (!cameraLock) {
    // if (delta_x > 0) {
    //   delta_x--;
    // }else if (delta_x < 0) {
    //   delta_x++;
    // }
    // if (delta_y > 0) {
    //   delta_y--;
    // }else if (delta_y < 0) {
    //   delta_y++;
    // }
    delta_x = 0;
    delta_y = 0;
    movespeed = map(abs(mouseX-width/2), 100, width/2-200, 0, 5, true)
    if (mouseX < width/2) {
      cameraX -= movespeed;
    }else{
      cameraX += movespeed;
    }
  }
  if (cameraLock) {
    if (mouseIsPressed) {
      cameraLock = false;
    }
    delta_x = map(mouseX-width/2, -width/2+100, width/2-100, -200, 200, true);
    delta_y = map(mouseY-height/2, -height/2+100, height/2-100, -100, 100, true);
  }
  //camera restriction
  if (cameraX < -maxX) {   // to change
    cameraX = -maxX;
  }
  if (cameraX > maxX) {    // to change
    cameraX = maxX;
  }
  cameraY = 15 * sin(frameCount / 30 + PI)
  if (mouseIsPressed) {
    cameraZ -= cspeed
  }
  camera(cameraX, cameraY, cameraZ, delta_x, delta_y, 0, 0, 1, 0);
}

function drawContents() {
  background(0);
  ambientLight(240);

  // Contents on Display
  if (cameraZ >= 650) {
    if (cameraZ > 700) {
      contentsSetup(contents[0], idnames[0], 0,0,900);
      contentsSetup(contents[1], idnames[1], -100,0,800);
      contentsSetup(contents[2], idnames[2], -80,0,700);
      contentsSetup(contents[3], idnames[3], 80,0,700);
      contentsSetup(contents[4], idnames[4], 100,0,800);
    }
    contentsSetup(contents[5], idnames[5], -90,0,600);
    contentsSetup(contents[6], idnames[6], 0,0,600);
    contentsSetup(contents[7], idnames[7], 90,0,600);

  }
  if (cameraZ < 650 && cameraZ >= 550) {
    contentsSetup(contents[8], idnames[8], -85,0,500);
    contentsSetup(contents[9], idnames[9], -45,0,450);
    contentsSetup(contents[10], idnames[10], 45,0,450);
    contentsSetup(contents[11], idnames[11], 85,0,500);

  }
  if (cameraZ < 550 && cameraZ >= 350) {
    contentsSetup(contents[12], idnames[12], -60,0,400);
    contentsSetup(contents[13], idnames[13], 0,0,400);
    contentsSetup(contents[14], idnames[14], 60,0,400);
    contentsSetup(contents[15], idnames[15], -40,0,300);
    contentsSetup(contents[16], idnames[16], 40,0,300);
  }
  if (cameraZ < 350 && cameraZ >= 150) {
    contentsSetup(contents[17], idnames[17], 0,0,200);
    contentsSetup(contents[18], idnames[18], 0,0,100);
  }

  //show pattern
  if (cameraZ < 150) {
    push();
    translate(0, 0, 80);
    rotateY(frameCount * 0.03)
    rotateX(frameCount * 0.02)
    texture(patternBuffer);
    plane(100);
    pop();
  }


  //flame to guide
  // push();
  // for(let i = flame.length -1; i>= 0; i--){
 	// flame[i].move();
  // flame[i].show();
  // flame[i].shrink();
  //
  // if(flame[i].radius <= 0 ){
  //   //remove the dead ones
  //   flame.splice(i, 1);
  //   }
  // }
  // // make more fire!!!
  // let x = 2*fand*tan(fantheta);
  // let y = 0;
  // let z = size*2+size/2/tan(PI/6)-fand-120;
  // let radius = random(1,2);
  // let b = new Flame(x, 0, z, radius, leftBuffer);
  // flame.push(b);
  // // // console.log(flame);
  // pop();

  // pop();
}

//3D Pattern
function drawPattern() {
  let moved = sqrt(pow(cameraX-prevX,2)+pow(cameraZ-prevZ,2));
  // console.log(moved);
  if (moved < 3 && r < 10){ // to change
    if (!stopcheck) {
      timecheck = frameCount;
      stopcheck = true;
      r += 0.2;
    } else {
      if (frameCount - timecheck > 100) {
        cpairs.push(camtoPatt(cameraX, cameraZ));
        r += 0.5;
      }
    }
  }else if (r < 5){
    stopcheck = false;
    r += 0.5;
  }else{
    stopcheck = false;
    r = 0.5;
  }
  prevX = cameraX;
  prevZ = cameraZ;

  d = map(cameraZ, 0, startZ, 0, bg_r);
  theta = map(atan2(cameraX, cameraZ), -atan2(maxX, startZ), atan2(maxX, startZ), -PI/12, PI/12, true);

  // version 1
  patternBuffer.push();
  patternBuffer.translate(patternBuffer.width / 2, patternBuffer.height / 2);
  patternBuffer.rotate(PI * millis() / 10.0 / 2500); //3.0
  for (let j = 0; j < 12; j++) {
    let x = d * cos(theta+j*PI/6);
    let y = d * sin(theta+j*PI/6);

    patternBuffer.ellipseMode(CENTER);
    patternBuffer.noStroke();
    patternBuffer.fill(0);
    patternBuffer.ellipse(x, y, r, r);
  }
  patternBuffer.pop();

  // version 2 -- recursice， too slow
  // let xy = camtoPatt(cameraX, cameraZ);
  // patternBuffer.push();
  // patternBuffer.translate(patternBuffer.width/2, patternBuffer.height/2)
  // patternBuffer.ellipseMode(CENTER);
  // patternBuffer.noStroke();
  // patternBuffer.fill(0);
  // patternBuffer.rotate(PI * millis() / 10.0 / 2500); //3.0
  // censym([xy], r, cpairs);
  // patternBuffer.pop();
}

function contentsSetup(content, id, cx, cy, cz) {
  push();
  translate(cx, cy, cz);
  translate(0,10,10);
  let newtorus = new Torus(cx, cz+10, cameraX, cameraZ, content, id); //to change
  // newtorus.show();
  newtorus.update();
  cameraLock = cameraLock || newtorus.isLock();
  pop();
}

// camera position mapping to pattern
function camtoPatt(x, z) {
  d = map(z, 0, startZ, 0, bg_r);
  theta = map(atan2(x, z), -atan2(maxX, startZ), atan2(maxX, startZ), -PI/12, PI/12, true);
  let px = d * cos(theta-PI/2);
  let py = d * sin(theta-PI/2);
  return [px, py]
}

function censym(xy, r, cp) {
  if (cp.length == 1) {
    for (let i = 0; i < xy.length; i++) {
      patternBuffer.ellipse(2*cp[0][0]-xy[i][0], 2*cp[0][1]-xy[i][1], r, r);
    }
  }else{
    for (let i = 0; i < xy.length; i++) {
      // console.log(cp);
      // console.log(xy);
      let newx = 2*cp[cp.length-1][0]-xy[i][0];
      let newy = 2*cp[cp.length-1][1]-xy[i][1];
      patternBuffer.ellipse(newx, newy, r, r);
      xy.push([newx, newy]);
    }
    cp.pop();
    censym(xy, r, cp);
  }
}

// function drawRightBuffer() {
//     // rightBuffer.textSize(32);
//     // rightBuffer.text("This is the right buffer!", 50, 50);
//
//     //3D Pattern
//     let moved = sqrt(pow(xpos-last_x,2)+pow(ypos-last_y,2));
//     if (moved < 4 && r < 10){
//       r += 0.3;
//     }else if (r < 2){
//       r += 0.1;
//     }else{
//       r = 0.5;
//     }
//     last_x = xpos;
//     last_y = ypos;
//
//     d = map(sqrt(pow(xpos,2)+pow(ypos,2)), 0, size, 0, bg_r);
//     theta = map(atan2(ypos, xpos), 0, PI/2, 0, PI/6);
//
//     rightBuffer.push();
//     rightBuffer.translate(size / 2, size / 2);
//     rightBuffer.rotate(PI * millis() / 10.0 / 2500); //3.0
//     for (let j = 0; j < 12; j++) {
//       let x = d * cos(theta+j*PI/6);
//       let y = d * sin(theta+j*PI/6);
//
//       rightBuffer.ellipseMode(CENTER);
//       rightBuffer.noStroke();
//       rightBuffer.fill(0);
//       rightBuffer.ellipse(x, y, r, r);
//     }
//     rightBuffer.pop();
//     // rightBuffer.circle(xpos,ypos,10);
// }

// function drawFloor() {
//     push();
//     translate(width/2, height/2-200, 0);
//     rotateY(PI/2);
//     stroke(200);
//     strokeWeight(3);
//     noFill();
//     // arc(0, 0, 800, 800, -PI/12, PI/12, PIE);
//     pop();
//
//     // moveBuffer.background(20);
//     // moveBuffer.stroke(255, 245, 153);
//     // stroke(200);
//     // strokeWeight(3);
//     // noFill();
//     // arc(originx, originy, fansize, fansize, -PI/12, PI/12, PIE);
//     //
//     // //position mapping
//     // fand = sqrt(pow(mouseX-originx,2)+pow((mouseY-size)-originy,2));
//     // fantheta = atan2((mouseY-size)-originy, mouseX-originx); // +- 1/12PI
//     // if (fand < 0){
//     //   fand = 0;
//     // }
//     // if (fand > fansize / 2){
//     //   fand = fansize / 2;
//     // }
//     // if (fantheta < -PI/12){
//     //   fantheta = -PI/12;
//     // }
//     // if (fantheta > PI/12){
//     //   fantheta = PI/12;
//     // }
//     // if (frameCount % 3 == 0){
//     //   particle.update(originx+fand * cos(fantheta), originy+fand * sin(fantheta));
//     // }
//     // particle.show();
//     // // moveBuffer.push();
//     // // moveBuffer.noStroke();
//     // // moveBuffer.fill(255, 245, 153);
//     // // moveBuffer.circle(originx+fand * cos(fantheta), originy+fand * sin(fantheta), 10);
//     // // moveBuffer.pop();
//     // let fand_ = map(fand, 0, fansize/2, 0, size);
//     // let fantheta_ = map(fantheta, -PI/12, PI/12, 0, PI/2);
//     // xpos = fand_ * cos(fantheta_);
//     // ypos = fand_ * sin(fantheta_);
//
// }

// function drawShowBuffer() {
//     showBuffer.background(0);
//     // showBuffer.directionalLight(200, 200, 200, 0, 0, -100);
//     // showBuffer.ambientLight(100);
//     showBuffer.texture(rightBuffer);
//     showBuffer.push();
//     showBuffer.rotateX(frameCount*0.005);
//     showBuffer.rotateZ(frameCount*0.008);
//     showBuffer.translate(0,0,50);
//
//     showBuffer.plane(300, 300);
//     // showBuffer.cylinder(100, 10, 24, 1, true, true);
//     showBuffer.pop();
//
//     // showBuffer.textSize(64);
//     // showBuffer.textAlign(CENTER);
//     // showBuffer.text("Result", size/2, size/2);
// }
