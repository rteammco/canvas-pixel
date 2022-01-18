import * as yooo from '../build_web/pixel-canvas.js';
// import { start } from '../dist/bundle.js';
console.log(yooo, yooo.start);
console.log(pixelCanvas);

const CANVAS_ID = 'canvas-pixel-id-0987654321';

const canvasStyleCSS = `
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const animationState = {
  lastAnimationTime: 0,
  relativeX: 0,
  relativeY: 0,
  xDirection: 1,
  xSpeed: 0.0007,
  yDirection: 1,
  ySpeed: 0.0004,
};

function updateAnimationState() {
  const timeNow = Date.now();
  const timeDelta = timeNow - animationState.lastAnimationTime;
  animationState.lastAnimationTime = timeNow;

  if (animationState.relativeX > 1) {
    animationState.relativeX = 1;
    animationState.xDirection = -1;
  } else if (animationState.relativeX < 0) {
    animationState.relativeX = 0;
    animationState.xDirection = 1;
  }

  if (animationState.relativeY > 1) {
    animationState.relativeY = 1;
    animationState.yDirection = -1;
  } else if (animationState.relativeY < 0) {
    animationState.relativeY = 0;
    animationState.yDirection = 1;
  }

  animationState.relativeX += animationState.xSpeed * timeDelta * animationState.xDirection;
  animationState.relativeY += animationState.ySpeed * timeDelta * animationState.yDirection;
}

function drawCircle(context, canvasWidth, canvasHeight) {
  context.beginPath();
  const pixelX = animationState.relativeX * canvasWidth;
  const pixelY = animationState.relativeY * canvasHeight;
  context.arc(pixelX, pixelY, 10, 0, Math.PI * 2);
  context.fillStyle = 'red';
  context.fill();
}

function animateFrame() {
  const canvas = document.getElementById(CANVAS_ID);
  const context = canvas.getContext('2d');

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  updateAnimationState();
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle(context, canvas.width, canvas.height);

  requestAnimationFrame(animateFrame);
}

function initializeCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = CANVAS_ID;
  canvas.style.cssText = canvasStyleCSS;
  document.body.append(canvas);

  animationState.lastAnimationTime = Date.now();
  requestAnimationFrame(animateFrame);
}

window.onload = initializeCanvas;
