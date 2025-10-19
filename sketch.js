let frameImage;
let canvas;
let baseImage = [];
let overlayOne = [];
let overlayTwo = [];
let overlayThree = [];
let imageIndex = 0;
let layerIndex = 0;
let state = "standard";
let glitchAmount = 0;

// states to use = "title", "standard", "info", "data"];

// filter testing
let sampleFilter;

function preload() {
  frameImage = loadImage("omni-data-test-2.png");
  for (let i = 0; i < 15; i++) {
    baseImage[i] = loadImage("assets/" + i + "a.png");
    overlayOne[i] = loadImage("assets/" + i + "b.png");
    //overlayTwo[i] = loadImage("test-assets/t" + i + "2.png");
    //overlayThree[i] = loadImage("test-assets/t" + i + "3.png");
  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowWidth*0.5625, WEBGL);
  rectMode(CENTER);
  sampleFilter = createFilterShader(fip.glitch);

  glitchAmount = int(random(-30,30));
  glitchAmount = glitchAmount/10;
  console.log(glitchAmount);
}

function draw() {
  background(0);

  imageRender();
  //Filter image portion
  filter(sampleFilter);
  
  //glitch settings
  sampleFilter.setUniform('glitchIntensity', glitchAmount);
  
  //crt settings
  //sampleFilter.setUniform('time', millis() * 0.0001);

  //device frame
  image(frameImage, -width/2, -height/2, width, height);

  //title overlay
  if(state == "title") {

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
}

function mousePressed() {
  //button row 1 - focus - / focus + / print
  if (mouseY >= height * 0.055 && mouseY <= height * 0.11) {

    //focus - 
    if (mouseX >= width * 0.625 && mouseX <= width * 0.6875) {
      glitchAmount = glitchAmount-0.1;
      console.log(glitchAmount);
    }

    //focus +
    if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
      glitchAmount = glitchAmount+0.1;
      console.log(glitchAmount);
    }

    //print
    if (mouseX >= width * 0.875 && mouseX <= width * 0.9375) {
      printImg = canvas.get(width*0.0625,height*0.11,width*0.4375,width*0.4375);
      printImg.save('consensus-print', 'png');
   }
  }


  //button row 2 - layer up
  if (mouseY >= height * 0.22 && mouseY <= height * 0.33) {
    //layer up
    if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
      layerIndex++;
      if (layerIndex >= baseImage.length - 1) {
        layerIndex = baseImage.length - 1;
      }
      console.log(layerIndex);
    }
  }

  //button row 3 - back and forward
  if (mouseY >= height * 0.38 && mouseY <= height * 0.5) {
    //forward
    if (mouseX >= width * 0.84375 && mouseX <= width * 0.90625) {
      imageIndex++;
      if (imageIndex >= baseImage.length) {
        imageIndex = 0;
      }
      layerIndex = 0;
    }
    
    //back
    if (mouseX >= width * 0.65625 && mouseX <= width * 0.71875) {
      imageIndex--;
      console.log("test");
      if (imageIndex < 0) {
        imageIndex = baseImage.length-1;
      }
      layerIndex = 0;
    }
  }

  //button row 4 - layer down
  if (mouseY >= height * 0.55 && mouseY <= height * 0.66) {
    //layer down
    if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
      layerIndex--;
      if (layerIndex <= 0) {
        layerIndex = 0;
      }
      console.log(layerIndex);
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


function windowResized() {
  resizeCanvas(windowWidth, windowWidth*0.5625);
}