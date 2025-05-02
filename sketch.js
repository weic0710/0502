let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide();
  overlayGraphics = createGraphics(capture.width, capture.height);
}

function draw() {
  background('#0077b6');
  push();
  translate(width / 2, height / 2);
  scale(-1, 1); // 左右翻轉
  image(capture, -capture.width / 2, -capture.height / 2);
  drawOverlayGraphics(); // 繪製 overlayGraphics
  image(overlayGraphics, -capture.width / 2, -capture.height / 2);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  overlayGraphics.resizeCanvas(capture.width, capture.height);
}

function drawOverlayGraphics() {
  overlayGraphics.background(0); // 黑色背景
  overlayGraphics.noStroke();
  capture.loadPixels();
  for (let x = 0; x < overlayGraphics.width; x += 20) {
    for (let y = 0; y < overlayGraphics.height; y += 20) {
      const index = ((y * capture.width) + x) * 4; // 計算像素索引
      const r = capture.pixels[index];
      const g = capture.pixels[index + 1];
      const b = capture.pixels[index + 2];
      overlayGraphics.fill(r, g, b); // 使用相對位置的顏色
      overlayGraphics.ellipse(x + 10, y + 10, 15, 15); // 繪製圓
    }
  }
}
