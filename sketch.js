let frameImage;
let canvas;
let baseImage = [];
let overlayOne = [];
let overlayTwo = [];
let overlayThree = [];
let imageIndex = 0;
let layerIndex = 0;
let state = "title";
let glitchAmount = 0;
let dataImage;
let infoImage;
let titleImage;
let printHover;
let printPress;
let focminHover;
let focminPress;
let focmaxHover;
let focmaxPress;
let lupHover;
let lupPress;
let ldownHover;
let ldownPress;
let forwardHover;
let forwardPress;
let backHover;
let backPress;
let dataHover;
let dataPress;
let infoHover;
let infoPress;

//states to use = "title", "standard", "info", "data"];

//filter image
let imageFilter;
let screenFilter;

function preload() {
  frameImage = loadImage("assets/frame/omni-frame.png");
  printHover = loadImage("assets/frame/print-hover.png");
  focminHover = loadImage("assets/frame/focmin-hover.png");
  focmaxHover = loadImage("assets/frame/focmax-hover.png");
  lupHover = loadImage("assets/frame/lup-hover.png");
  ldownHover = loadImage("assets/frame/ldown-hover.png");
  backHover = loadImage("assets/frame/back-hover.png");
  forwardHover = loadImage("assets/frame/forward-hover.png");
  dataHover = loadImage("assets/frame/data-hover.png");
  infoHover = loadImage("assets/frame/info-hover.png");

  printPress = loadImage("assets/frame/print-press.png");
  focminPress = loadImage("assets/frame/focmin-press.png");
  focmaxPress = loadImage("assets/frame/focmax-press.png");
  lupPress = loadImage("assets/frame/lup-press.png");
  ldownPress = loadImage("assets/frame/ldown-press.png");
  backPress = loadImage("assets/frame/back-press.png");
  forwardPress = loadImage("assets/frame/forward-press.png");
  dataPress = loadImage("assets/frame/data-press.png");
  infoPress = loadImage("assets/frame/info-press.png");

  for (let i = 0; i < 15; i++) {
    baseImage[i] = loadImage("assets/" + i + "a.png");
    overlayOne[i] = loadImage("assets/" + i + "b.png");
    //overlayTwo[i] = loadImage("test-assets/t" + i + "2.png");
    //overlayThree[i] = loadImage("test-assets/t" + i + "3.png");
  }
  dataImage = loadImage("assets/omni-screen-data-3.png");
  infoImage = loadImage("assets/omni-screen-info-4.png");
  titleImage = loadImage("assets/omni-data-title.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowWidth*0.5625, WEBGL);
  rectMode(CENTER);
  imageFilter = createFilterShader(fip.glitch);
  screenFilter = createFilterShader(fip.solarize);

  glitchAmount = int(random(-30,30));
  glitchAmount = glitchAmount/10;
  console.log(glitchAmount);
  imageIndex = int(random(baseImage.length));
}

function draw() {
  background(0);

  //Main Image
  imageRender();
  
  //Machine Screens
  machineScreens();

  //device frame
  image(frameImage, -width/2, -height/2, width, height);

  //title overlay
  if(state == "title") {
    image(titleImage, -width/2, -height/2, width, height);
  } else {
    hoverGraphics();
  }

  if(mouseIsPressed) {
    pressGraphics();
  }

}

// for images displayed on "screen"
function imageRender() {
  image(
    baseImage[imageIndex],
    -width * 0.45,
    -height * 0.4,
    width * 0.45,
    width * 0.45
  );

  if (layerIndex == 1) {
    image(
      overlayOne[imageIndex],
      -width * 0.45,
      -height * 0.4,
      width * 0.45,
      width * 0.45
    );
  } else if (layerIndex == 2) {
    //remove for more layers and uncomment image
    layerIndex = 1;
    // image(
    //   overlayTwo[imageIndex],
    //   -width * 0.45,
    //   -height * 0.4,
    //   width * 0.45,
    //   width * 0.45
    // );
  } else if (layerIndex == 3) {
    image(
      overlayThree[imageIndex],
      -width * 0.45,
      -height * 0.4,
      width * 0.45,
      width * 0.45
    );
  }

  //Filter image portion
  filter(imageFilter);
  
  //Filter settings
  imageFilter.setUniform('glitchIntensity', glitchAmount);
}

function machineScreens() {
  if(state == "data") {
    image(
    dataImage,
    -width * 0.45,
    -height * 0.4,
    width * 0.45,
    width * 0.45
  );

  } else if(state == "info") {
    image(
    infoImage,
    -width * 0.45,
    -height * 0.4,
    width * 0.45,
    width * 0.45
  );
  }
}

function mousePressed() {

  if(state == "title") {
    state = "standard";
  } else {
    //button row 1 - focus - / focus + / print
    if (mouseY >= height * 0.055 && mouseY <= height * 0.11) {

      //focus - 
      if (mouseX >= width * 0.625 && mouseX <= width * 0.6875) {
        if(state != "standard") {
          state = "standard";
          console.log(state);
        } else {
          glitchAmount = glitchAmount-0.1;
          console.log(glitchAmount);
        }
        
      }

      //focus +
      if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
        if(state != "standard") {
          state = "standard";
          console.log(state);
        } else {
          glitchAmount = glitchAmount+0.1;
          console.log(glitchAmount); 
        }
      }

      //print
      if (mouseX >= width * 0.875 && mouseX <= width * 0.9375) {
        if(state != "standard") {
          state = "standard";
          console.log(state);
        } else {
          printImg = canvas.get(width*0.0625,height*0.11,width*0.4375,width*0.4375);
          printImg.save('omni-output', 'png');
        }
      }
    }


    //button row 2 - layer up
    if (mouseY >= height * 0.22 && mouseY <= height * 0.33) {
      //layer up
      if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
        if(state != "standard") {
          state = "standard";
          console.log(state);
        } else {
          layerIndex++;
          if (layerIndex >= baseImage.length - 1) {
            layerIndex = baseImage.length - 1;
          }
          console.log(layerIndex);
        }
      }
    }

    //button row 3 - back and forward
    if (mouseY >= height * 0.38 && mouseY <= height * 0.5) {
      //forward
      if (mouseX >= width * 0.84375 && mouseX <= width * 0.90625) {
        if(state != "standard") {
          state = "standard";
          console.log(state);
        } else {
          imageIndex++;
          if (imageIndex >= baseImage.length) {
            imageIndex = 0;
          }
          layerIndex = 0;
        }
      }
      
      //back
      if (mouseX >= width * 0.65625 && mouseX <= width * 0.71875) {
        if(state != "standard") {
          state = "standard";
          console.log(state);
        } else {
          imageIndex--;
          console.log("test");
          if (imageIndex < 0) {
            imageIndex = baseImage.length-1;
          }
          layerIndex = 0;
        }
      }
    }

    //button row 4 - layer down
    if (mouseY >= height * 0.55 && mouseY <= height * 0.66) {
      //layer down
      if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
        if(state != "standard") {
          state = "standard";
          console.log(state);
        } else {
          layerIndex--;
          if (layerIndex <= 0) {
            layerIndex = 0;
          }
          console.log(layerIndex);
        }
      }
    }

    //button row 5 - info / data

    if (mouseY >= height * 0.722 && mouseY <= height * 0.77) {

      //data 
      if (mouseX >= width * 0.625 && mouseX <= width * 0.6875) {
        if(state == "data") {
          state ="standard"
        } else {
          state = "data";
        }
        console.log(state);
      }

      //info
      if (mouseX >= width * 0.875 && mouseX <= width * 0.9375) {
        if(state == "info") {
          state ="standard"
        } else {
          state = "info";
        }
        console.log(state);
    }
    }
  }
}

function hoverGraphics() {
  if (mouseY >= height * 0.055 && mouseY <= height * 0.11) {

      //focus - 
      if (mouseX >= width * 0.625 && mouseX <= width * 0.6875) {
        image(focminHover, -width/2, -height/2, width, height);
      }

      //focus +
      if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
        image(focmaxHover, -width/2, -height/2, width, height);
      }

      //print
      if (mouseX >= width * 0.875 && mouseX <= width * 0.9375) {
        image(printHover, -width/2, -height/2, width, height);
      }
    }


    //button row 2 - layer up
    if (mouseY >= height * 0.22 && mouseY <= height * 0.33) {
      //layer up
      if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
        image(lupHover, -width/2, -height/2, width, height);
      }
    }

    //button row 3 - back and forward
    if (mouseY >= height * 0.38 && mouseY <= height * 0.5) {
      //forward
      if (mouseX >= width * 0.84375 && mouseX <= width * 0.90625) {
        image(forwardHover, -width/2, -height/2, width, height);
      }
      
      //back
      if (mouseX >= width * 0.65625 && mouseX <= width * 0.71875) {
        image(backHover, -width/2, -height/2, width, height);
      }
    }

    //button row 4 - layer down
    if (mouseY >= height * 0.55 && mouseY <= height * 0.66) {
      //layer down
      if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
        image(ldownHover, -width/2, -height/2, width, height);
      }
    }

    //button row 5 - info / data

    if (mouseY >= height * 0.722 && mouseY <= height * 0.77) {

      //data 
      if (mouseX >= width * 0.625 && mouseX <= width * 0.6875) {
        image(dataHover, -width/2, -height/2, width, height);
      }

      //info
      if (mouseX >= width * 0.875 && mouseX <= width * 0.9375) {
        image(infoHover, -width/2, -height/2, width, height);
      }
    }
  
}

function pressGraphics() {
  if (mouseY >= height * 0.055 && mouseY <= height * 0.11) {

      //focus - 
      if (mouseX >= width * 0.625 && mouseX <= width * 0.6875) {
        image(focminPress, -width/2, -height/2, width, height);
      }

      //focus +
      if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
        image(focmaxPress, -width/2, -height/2, width, height);
      }

      //print
      if (mouseX >= width * 0.875 && mouseX <= width * 0.9375) {
        image(printPress, -width/2, -height/2, width, height);
      }
    }


    //button row 2 - layer up
    if (mouseY >= height * 0.22 && mouseY <= height * 0.33) {
      //layer up
      if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
        image(lupPress, -width/2, -height/2, width, height);
      }
    }

    //button row 3 - back and forward
    if (mouseY >= height * 0.38 && mouseY <= height * 0.5) {
      //forward
      if (mouseX >= width * 0.84375 && mouseX <= width * 0.90625) {
        image(forwardPress, -width/2, -height/2, width, height);
      }
      
      //back
      if (mouseX >= width * 0.65625 && mouseX <= width * 0.71875) {
        image(backPress, -width/2, -height/2, width, height);
      }
    }

    //button row 4 - layer down
    if (mouseY >= height * 0.55 && mouseY <= height * 0.66) {
      //layer down
      if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
        image(ldownPress, -width/2, -height/2, width, height);
      }
    }

    //button row 5 - info / data

    if (mouseY >= height * 0.722 && mouseY <= height * 0.77) {

      //data 
      if (mouseX >= width * 0.625 && mouseX <= width * 0.6875) {
        image(dataPress, -width/2, -height/2, width, height);
      }

      //info
      if (mouseX >= width * 0.875 && mouseX <= width * 0.9375) {
        image(infoPress, -width/2, -height/2, width, height);
      }
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth*0.5625);
}