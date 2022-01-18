import { Particle } from './particle';

export default class RainParticle implements Particle {
  private speed: number;
  private dropletSize: number;
  private xPos: number;
  private yPos: number;

  constructor() {
    this.speed = 0.001 + 0.001 * Math.random();
    this.dropletSize = 0.5 + 3 * Math.random();
    this.xPos = Math.random();
    this.yPos = 0;
  }

  public isAlive(): boolean {
    return this.yPos <= 1;
  }

  public update(timeDelta: number): void {
    this.yPos += this.speed * timeDelta;
  }

  public draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
    context.beginPath();
    const pixelX = this.xPos * canvas.width;
    const pixelY = this.yPos * canvas.height;
    context.arc(pixelX, pixelY, this.dropletSize, 0, Math.PI * 2);
    context.fillStyle = 'rgba(0, 0, 255, 0.4)';
    context.fill();
  }
}
