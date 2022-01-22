export interface Particle {
  isAlive(): boolean;
  update(timeDelta: number): void;
  draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void;
}
