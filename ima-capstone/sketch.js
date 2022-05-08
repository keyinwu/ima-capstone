"use strict"

let loading = true;
let loadCounter = 0;
let scene = 0;

let myFont;

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
let cspeed = 2;
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
let animism;
let animismBuffer;
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

let contents=[];
let idnames= ["large","complete","lively","animism","imagery","doll","doorgod","tigers","textures","serrations","crescents","maojiao","worship","witchcraft","zhuyou","newyear","wish","various","language"];

// let buffers = [completeBuffer,livelyBuffer,animismBuffer,imageryBuffer,folkBuffer,dollBuffer,doorgodBuffer,tigersBuffer,texturesBuffer,serrationsBuffer,crescentsBuffer,maojiaoBuffer,worshipBuffer,witchcraftBuffer,zhuyouBuffer,newyearBuffer,wishBuffer,variousBuffer,languageBuffer]

let symbols=[];

// to finish
let symtex;
let completeM,model1,model2,model3,model5,model6;
let models=[];

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
let particle;
let floorBuffer;

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

let colorChange = false;

let timecheck;
let stopcheck = false;

let totalAssets = 26;
let assetArray = [];

function updateLoadingBar(asset) {
  assetArray.push(asset);
  console.log(assetArray.length);

  let bar = document.getElementById("loadingbar");
  bar.style.width = floor(100 * assetArray.length / totalAssets) + "%";

  if (assetArray.length == totalAssets) {
    let barContainer = document.getElementById("loadingbar-container");
    barContainer.style.display = "none";
  }
}

function preload(){
  // to change
  large = loadImage('images/large.jpeg', updateLoadingBar);
  complete = loadImage('images/complete.jpeg', updateLoadingBar);
  lively = loadImage('images/lively.jpeg', updateLoadingBar);
  animism = loadImage('images/animism.jpeg', updateLoadingBar);
  imagery = loadImage('images/imagery.jpeg', updateLoadingBar);
  // folk = loadImage('images/folk.jpeg', updateLoadingBar);
  doll = loadImage('images/doll.jpeg', updateLoadingBar);
  doorgod = loadImage('images/doorgod.jpeg', updateLoadingBar);
  tigers = loadImage('images/tigers.jpeg', updateLoadingBar);
  textures = loadImage('images/textures.jpeg', updateLoadingBar);
  serrations = loadImage('images/serrations.png', updateLoadingBar);
  crescents = loadImage('images/crescents.jpeg', updateLoadingBar);
  maojiao = loadImage('images/maojiao.png', updateLoadingBar);
  worship = loadImage('images/worship.jpeg', updateLoadingBar);
  witchcraft = loadImage('images/witchcraft.jpeg', updateLoadingBar);
  zhuyou = loadImage('images/zhuyou.jpeg', updateLoadingBar);
  newyear = loadImage('images/newyear.jpeg', updateLoadingBar);
  wish = loadImage('images/wish.jpeg', updateLoadingBar);
  various = loadImage('images/various.jpeg', updateLoadingBar);
  language = loadImage('images/language.jpeg', updateLoadingBar);

  //folk removed
  contents = [large, complete, lively, animism, imagery, doll, doorgod, tigers, textures, serrations, crescents, maojiao, worship, witchcraft, zhuyou, newyear, wish, various, language];
  idnames = ["large", "complete", "lively", "animism", "imagery", "doll", "doorgod", "tigers", "textures", "serrations", "crescents", "maojiao", "worship", "witchcraft", "zhuyou", "newyear", "wish", "various", "language"];

  // to change
  symtex = loadImage('images/texture4.jpeg', updateLoadingBar);
  completeM = loadModel('assets/lively.obj', updateLoadingBar);
  model1 = loadModel('assets/complete.obj', updateLoadingBar);
  model2 = loadModel('assets/lively.obj', updateLoadingBar);
  model3 = loadModel('assets/crescents.obj', updateLoadingBar);
  model5 = loadModel('assets/wish.obj', updateLoadingBar);
  model6 = loadModel('assets/language.obj', updateLoadingBar);

  models = [completeM, model1, model2, model3, model6, model5, model6, completeM, model2, model1, completeM, completeM, completeM, completeM, completeM, completeM, completeM, completeM, completeM];

  // symtex = loadImage('images/texture4.jpeg');
  // myFont = loadFont('fonts/Inconsolata-Medium.ttf');
 }

function imageLoading(index, filename) {
  loadImage(filename, imageLoaded);
  function imageLoaded(img){
    img.filter(INVERT);
    img.filter(GRAY);
    contents[index] = img;
    loadCounter++;
    // console.log(loadCounter, index, filename);
    if (loadCounter == 19) {
      console.log("loading models...");
      startModelLoading();
    }
  }
}

function startModelLoading(){
  modelLoading(0, 'assets/complete.obj');
  modelLoading(1, 'assets/complete.obj');
  modelLoading(2, 'assets/lively.obj');
  modelLoading(3, 'assets/complete.obj');
  modelLoading(4, 'assets/complete.obj');
  modelLoading(5, 'assets/complete.obj');
  modelLoading(6, 'assets/complete.obj');
  modelLoading(7, 'assets/complete.obj');
  modelLoading(8, 'assets/complete.obj');
  modelLoading(9, 'assets/complete.obj');
  modelLoading(10, 'assets/crescents.obj');
  modelLoading(11, 'assets/maojiao.obj');
  modelLoading(12, 'assets/complete.obj');
  modelLoading(13, 'assets/complete.obj');
  modelLoading(14, 'assets/complete.obj');
  modelLoading(15, 'assets/newyear.obj');
  modelLoading(16, 'assets/wish.obj');
  modelLoading(17, 'assets/various.obj');
  modelLoading(18, 'assets/language.obj');
}


function modelLoading(index, filename) {
  loadModel(filename, modelLoaded);
  function modelLoaded(model){
    models[index] = model; // ---
    symbols[index] = new Torus(contents[index], idnames[index], model);
    loadCounter++;
    // console.log(loadCounter, index);
    if (loadCounter == 57) { // why not 38? / why setup running twice?
      loading = false;
    }
  }
}

function setup() {
    // imageLoading(0, 'images/large.jpeg');
    // imageLoading(1, 'images/complete.jpeg');
    // imageLoading(2, 'images/lively.jpeg');
    // imageLoading(3, 'images/animism.jpeg');
    // imageLoading(4, 'images/imagery.jpeg');
    // imageLoading(5, 'images/doll.jpeg');
    // imageLoading(6, 'images/doorgod.jpeg');
    // imageLoading(7, 'images/tigers.jpeg');
    // imageLoading(8, 'images/textures.jpeg');
    // imageLoading(9, 'images/serrations.png');
    // imageLoading(10, 'images/crescents.jpeg');
    // imageLoading(11, 'images/maojiao.png');
    // imageLoading(12, 'images/worship.jpeg');
    // imageLoading(13, 'images/witchcraft.jpeg');
    // imageLoading(14, 'images/zhuyou.jpeg');
    // imageLoading(15, 'images/newyear.jpeg');
    // imageLoading(16, 'images/wish.jpeg');
    // imageLoading(17, 'images/various.jpeg');
    // imageLoading(18, 'images/language.jpeg');

    createCanvas(windowWidth, windowHeight, WEBGL);
    floorBuffer = createGraphics(1000, 1000);
    perspective(3*PI/7, width/height, 0.1, (height/2) / tan(PI/6)*10); //width/height?
    cursor('grab');

    // to change
    for (var i = 0; i < contents.length; i++) { //contents.length
      contents[i].filter(INVERT);
      contents[i].filter(GRAY);
    }

    //pattern
    size = 400;
    patternBuffer = createGraphics(400, 400);
    r = 2;
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

    // to change
    for (var i = 0; i < contents.length; i++) {
    let newsym = new Torus(contents[i], idnames[i], models[i]); //to change
    symbols.push(newsym)
    }

    particle = new Particle(cameraZ, 500-cameraX, floorBuffer);
    console.log("setup running");
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
    // if (loading) {
    //   drawLoading();
    // }else if (scene == 0) {
    //   let x = map(mouseX-width/2, -width/2+100, width/2-100, -200, 200, true);
    //   let y = map(mouseY-height/2, -height/2+100, height/2-100, -100, 100, true);
    //   camera(cameraX, cameraY, cameraZ, x, y, 0, 0, 1, 0);
    //   drawIntro();
    // }else if (scene == 1){
      resizeCanvas(windowWidth, windowHeight, WEBGL);
      drawMove();
      drawContents();
      drawFloor(); //to do
      drawPattern();
    // }

}

function drawLoading(){
  background(220);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont(myFont);
  text("Loading...", 0, 0);
}

function drawIntro(){ // to change, add a button
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(64);
  textFont(myFont);
  text("Press enter to start (temporary version)", 0, 0);
}

// function keyPressed(){
//   if (keyCode===ENTER) {
//     scene = 1;
//   }
// }

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
    movespeed = map(abs(mouseX-width/2), 100, width/2-200, 0.1, 3, true)
    if (mouseX < width/2) {
      cameraX -= 0.5*movespeed;
    }else{
      cameraX += 0.5*movespeed;
    }
    if (mouseY > 4*height/5) {
      delta_y = map(mouseY-4*height/5, 0, height/5, 0, cameraZ*2, true);
    }
  }
  if (cameraLock) {
    if (mouseIsPressed || keyIsPressed) {
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
  cameraY = 8 * sin(frameCount / 30 + PI)
  // if (mouseIsPressed) {
  //   cameraZ -= cspeed
  // }
  // if (keyIsPressed) {  // to change into zoom in/out
  //   cameraZ += cspeed
  // }
  camera(cameraX, cameraY, cameraZ, delta_x, delta_y, -150, 0, 1, 0);
}

function mouseWheel(event) {
  //console.log(event.delta);

  // M:
  // adjust the value.
  // feel free to flip the direction!
  let speed = event.delta * -0.1;
  cameraZ += speed;
}

function drawContents() {
  background(0);
  ambientLight(200);
  // directionalLight(255, 255, 255, 0, 0, 1);

  // Contents on Display
  if (cameraZ >= 650) {
    if (cameraZ > 700) {
      contentsSetup(symbols[0], 0,0,900);
      contentsSetup(symbols[1], -100,0,800);
      contentsSetup(symbols[3], -80,0,700);
      contentsSetup(symbols[4], 80,0,700);
      contentsSetup(symbols[2], 100,0,800);
    }
    contentsSetup(symbols[5], -90,0,600);
    contentsSetup(symbols[6], 0,0,600);
    contentsSetup(symbols[7], 90,0,600);

  }
  if (cameraZ < 650 && cameraZ >= 450) {
    contentsSetup(symbols[8], -85,0,500);
    contentsSetup(symbols[9], -45,0,400);
    contentsSetup(symbols[10], 45,0,400);
    contentsSetup(symbols[11], 85,0,500);

  }
  if (cameraZ < 450 && cameraZ >= 250) {
    contentsSetup(symbols[12], -60,0,300);
    contentsSetup(symbols[13], 0,0,300);
    contentsSetup(symbols[14], 60,0,300);
    contentsSetup(symbols[15], -40,0,200);
    contentsSetup(symbols[16], 40,0,200);
  }
  if (cameraZ < 250 && cameraZ >= 50) {
    contentsSetup(symbols[17], 0,0,100);
    contentsSetup(symbols[18], 0,0,0);
  }

  //show pattern
  if (cameraZ < 50) {
    push();
    translate(0, 0, -100);
    // rotateZ(frameCount * 0.03)
    // rotateX(frameCount * 0.02)
    texture(patternBuffer);
    plane(130);
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
  if (moved < 1 && r < 12){ // to change
    if (!stopcheck) {
      timecheck = frameCount;
      stopcheck = true;
      r += 0.01;
    } else {
      if (frameCount - timecheck > 80) {
        // cpairs.push(camtoPatt(cameraX, cameraZ));
        r += 0.05;
        particle.collect(cameraZ, cameraX);
        colorChange = !colorChange;
        stopcheck = false;
      }else {
        r += 0.01;
      }
    }
  }else if (r < 6){
    stopcheck = false;
    r += 0.08;
  }else{
    stopcheck = false;
    r = 1;
  }
  prevX = cameraX;
  prevZ = cameraZ;

  d = map(cameraZ, 0, startZ, 0, bg_r);
  theta = map(atan2(cameraX, cameraZ), -atan2(maxX, startZ), atan2(maxX, startZ), -PI/12, PI/12, true);

  // version 1
  patternBuffer.push();
  patternBuffer.translate(patternBuffer.width / 2, patternBuffer.height / 2);
  patternBuffer.rotate(PI * millis() / 3.0 / 2500); //3.0
  for (let j = 0; j < 12; j++) {
    let x = d * cos(theta+j*PI/6);
    let y = d * sin(theta+j*PI/6);

    patternBuffer.ellipseMode(CENTER);
    patternBuffer.noStroke();
    if (!colorChange) {
      patternBuffer.fill(0);
    }else{
      patternBuffer.fill(190,10,10);
    }
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

function contentsSetup(symbol, cx, cy, cz, logging=false) {
  push();
  translate(cx, cy, cz);
  translate(0,10,10);
  symbol.update(cx, cz+10, cameraX, cameraZ);
  if (logging) { // for debug
    symbol.logging();
  }
  cameraLock = cameraLock || symbol.isLock();
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

function drawFloor() {
    floorBuffer.push();
    floorBuffer.background(0);
    floorBuffer.translate(0, 500);
    floorBuffer.stroke(255, 169, 56);
    floorBuffer.strokeWeight(5);
    floorBuffer.noFill();
    floorBuffer.arc(0, 0, 1800, 1800, -PI/6, PI/6, PIE); // 2000
    floorBuffer.pop();

    // if (requestAnimationFrame(drawFloor) % 3 == 0) {
      particle.update(cameraZ-25, 500-cameraX);
    // }
    particle.show();

    push();
    translate(0, 80, 500);
    rotateY(-PI/2);
    rotateX(PI/2);
    texture(floorBuffer);
    plane(1000);

    pop();

    // push();
    // translate(0, 50, -60);
    // rotateY(-PI/2);
    // rotateX(PI/2);
    // stroke(255, 169, 56);
    // strokeWeight(1);
    // noFill();
    // arc(0, 0, 1900, 1900, -PI/6, PI/6, PIE);
    // pop();

}

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
