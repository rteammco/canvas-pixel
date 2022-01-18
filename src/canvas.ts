// const CANVAS_ID = 'canvas-pixel-id-0987654321';

const canvasStyleCSS = `
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1000;
` as const;

interface AnimationState {
  lastFrameTime: number;
  relativeX: number;
  relativeY: number;
  xDirection: number;
  xSpeed: number;
  yDirection: number;
  ySpeed: number;
}

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private animationFrameRequestId: number | null;
  private animationState: AnimationState;

  constructor() {
    this.canvas = document.createElement('canvas');
    // this.canvas.id = CANVAS_ID;
    this.canvas.style.cssText = canvasStyleCSS;
    document.body.append(this.canvas);

    this.context = this.canvas.getContext('2d');
    this.animationFrameRequestId = null;

    this.animationState = {
      lastFrameTime: 0,
      relativeX: 0,
      relativeY: 0,
      xDirection: 1,
      xSpeed: 0.0007,
      yDirection: 1,
      ySpeed: 0.0004,
    };
  }

  private updateAnimationState(): void {
    const timeNow = Date.now();
    const timeDelta = timeNow - this.animationState.lastFrameTime;
    this.animationState.lastFrameTime = timeNow;

    if (this.animationState.relativeX > 1) {
      this.animationState.relativeX = 1;
      this.animationState.xDirection = -1;
    } else if (this.animationState.relativeX < 0) {
      this.animationState.relativeX = 0;
      this.animationState.xDirection = 1;
    }

    if (this.animationState.relativeY > 1) {
      this.animationState.relativeY = 1;
      this.animationState.yDirection = -1;
    } else if (this.animationState.relativeY < 0) {
      this.animationState.relativeY = 0;
      this.animationState.yDirection = 1;
    }

    this.animationState.relativeX +=
      this.animationState.xSpeed * timeDelta * this.animationState.xDirection;
    this.animationState.relativeY +=
      this.animationState.ySpeed * timeDelta * this.animationState.yDirection;
  }

  private renderFrame(): void {
    if (this.context == null) {
      return;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    const pixelX = this.animationState.relativeX * this.canvas.width;
    const pixelY = this.animationState.relativeY * this.canvas.height;
    this.context.arc(pixelX, pixelY, 10, 0, Math.PI * 2);
    this.context.fillStyle = 'green';
    this.context.fill();
  }

  private animateFrame(): void {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
    this.updateAnimationState();
    this.renderFrame();
    this.animationFrameRequestId = requestAnimationFrame(this.animateFrame);
  }

  public startAnimation(): void {
    if (this.animationFrameRequestId != null) {
      cancelAnimationFrame(this.animationFrameRequestId);
    }
    this.animationState.lastFrameTime = Date.now();
    this.animateFrame();
  }
}
