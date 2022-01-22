import Canvas from './Canvas';

export type AnimationEffect = 'rain' | 'snow';

let canvas: Canvas | null = null;

export function start(effect: AnimationEffect = 'rain'): void {
  if (canvas == null) {
    canvas = new Canvas();
  }
  canvas.startAnimation();
}

export function setSpeed(speed: number): void {
  // TODO
}

export function stop(): void {
  canvas?.stopAnimation();
}

export function clear(): void {
  canvas?.clear();
}
