"use strict";
//
// Sprite Object
//
function Sprite(imgPath, frames, frameRate, r, g, b) {
  const spriteImage = new Image();
  const image = new Image();

  spriteImage.onload = function() {
    const spriteCanvas = document.createElement("canvas");
    const spriteContext = spriteCanvas.getContext("2d");

    spriteCanvas.width = spriteImage.width;
    spriteCanvas.height = spriteImage.height;

    spriteContext.drawImage(
      spriteImage,
      0,
      0,
      spriteImage.width,
      spriteImage.height,
      0,
      0,
      spriteCanvas.width,
      spriteCanvas.height
    );

    const sourceData = spriteContext.getImageData(
      0,
      0,
      spriteImage.width,
      spriteImage.height
    );

    const data = sourceData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      // Leave the alpha channel alone
    }
    spriteContext.putImageData(sourceData, 0, 0);

    image.src = spriteCanvas.toDataURL("image/png");
  };

  spriteImage.src = imgPath;

  this.frames = frames;
  this.frameRate = frameRate;
  this.timer = 0;
  this.currentFrame = 0;
  this.image = image;
}

Sprite.prototype.update = function(dt) {
  this.timer += dt;
  if (this.timer > 1 / this.frameRate) {
    this.timer = 0;

    this.currentFrame = (this.currentFrame + 1) % this.frames;
  }
};
export default Sprite;
