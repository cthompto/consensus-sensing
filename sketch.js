let frameImage;
let canvas;
let baseImage = [];
let overlayOne = [];
let overlayTwo = [];
let overlayThree = [];
let imageIndex = 0;
let layerIndex = 0;
let state = "standard";

// states to use = "title", "standard", "info", "data"];

// filter testing
let sampleFilter;

function preload() {
  frameImage = loadImage("omni-data-test.png");
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
  sampleFilter = createFilterShader(fip.crt);
}

function draw() {
  background(0);

  imageRender();
  //Filter image portion
  //filter(sampleFilter);
  
  //glitch settings
  //sampleFilter.setUniform('glitchIntensity', 0.0);
  
  //crt settings
  //sampleFilter.setUniform('time', millis() * 0.0001);



  image(frameImage, -width/2, -height/2, width, height);
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
  //button row 1 - power / reset / print

  //button row 2 - layer up
  if (mouseY >= height * 0.22 && mouseY <= height * 0.33) {
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
    if (mouseX >= width * 0.84375 && mouseX <= width * 0.90625) {
      imageIndex++;
      if (imageIndex >= baseImage.length) {
        imageIndex = 0;
      }
      layerIndex = 0;
    } else if (mouseX >= width * 0.65625 && mouseX <= width * 0.71875) {
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
    if (mouseX >= width * 0.75 && mouseX <= width * 0.8125) {
      layerIndex--;
      if (layerIndex <= 0) {
        layerIndex = 0;
      }
      console.log(layerIndex);
    }
  }

  //button row 5 - info / data
}


function windowResized() {
  resizeCanvas(windowWidth, windowWidth*0.5625);
}