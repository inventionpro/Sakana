import { Runner } from './run.js'

export class Sakana {
  constructor(id) {
    console.log('[Sakana] Starting Sakana')
    this.root = document.getElementById(id);
    // Game canvas
    const canvas = document.createElement('canvas');
    this.canvas = canvas;
    this.width = 1280;
    this.height = 720;
    canvas.width = 1280;
    canvas.height = 720;
    this.root.appendChild(canvas);

    this.ctx = canvas.getContext('2d');
    this.game = null;
  }
  load(file, keys) {
    let runner = new Runner(this);
    this.game = runner;
    runner.run(file, keys)
  }
}