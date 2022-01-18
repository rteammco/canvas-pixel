import Canvas from './canvas';

export type AnimationEffect = 'rain' | 'snow';

let canvas: Canvas | null = null;

export function start(effect: AnimationEffect = 'rain'): void {
  canvas = new Canvas();
  canvas.startAnimation();
}

export function setSpeed(speed: number): void {
  // TODO
}

export function stop(): void {
  // TODO
}

export function clear(): void {
  // TODO
}
