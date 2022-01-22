import { Particle } from './particles/particle';
import RainParticle from './particles/RainParticle';

const NUM_PARTICLES = 1000;

const canvasStyleCSS = `
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1000;
` as const;

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private lastFrameTime: number;
  private animationFrameRequestId: number | null;

  private particles: Particle[];

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = canvasStyleCSS;
    document.body.append(this.canvas);

    this.context = this.canvas.getContext('2d');
    this.lastFrameTime = 0;
    this.animationFrameRequestId = null;

    this.particles = [];
  }

  private updateAnimationState(): void {
    const timeNow = Date.now();
    const timeDelta = timeNow - this.lastFrameTime;
    this.lastFrameTime = timeNow;

    const updatedParticles: Particle[] = [];
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.update(timeDelta);
      if (particle.isAlive()) {
        updatedParticles.push(particle);
      }
    }
    for (let i = updatedParticles.length; i < NUM_PARTICLES; i++) {
      updatedParticles.push(new RainParticle());
    }
    this.particles = updatedParticles;
  }

  private renderFrame(): void {
    if (this.context == null) {
      return;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Using classic loop intentionally for performance reasons:
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(this.canvas, this.context);
    }
  }

  private animateFrame(): void {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
    this.updateAnimationState();
    this.renderFrame();
    this.animationFrameRequestId = requestAnimationFrame(this.animateFrame.bind(this));
  }

  public startAnimation(): void {
    this.stopAnimation();
    this.lastFrameTime = Date.now();
    this.animateFrame();
  }

  public stopAnimation(): void {
    if (this.animationFrameRequestId != null) {
      cancelAnimationFrame(this.animationFrameRequestId);
    }
  }

  public clear(): void {
    this.particles = [];
  }
}
