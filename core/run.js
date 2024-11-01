import { Decode } from './decode.js'

export class Runner {
  constructor(Sakana) {
    this.Sakana = Sakana;
    // Game properties
    this.framerate = 30; // FPS
    this.data = {};
    this.paused = false;
    this.loading = true;
  }
  _drawTextScreen(text) {
    // Blank out the screen
    this.Sakana.ctx.fillStyle = 'black';
    this.Sakana.ctx.fillRect(0, 0, this.Sakana.width, this.Sakana.height);
    // Write name
    this.Sakana.ctx.fillStyle = 'white';
    this.Sakana.ctx.font = '48px Arial';
    this.Sakana.ctx.textAlign = 'center';
    this.Sakana.ctx.textBaseline = 'middle';
    this.Sakana.ctx.fillText('Sakana', this.Sakana.width / 2, this.Sakana.height / 2 - 24);
    // Write text
    this.Sakana.ctx.fillStyle = 'white';
    this.Sakana.ctx.font = '24px Arial';
    this.Sakana.ctx.textAlign = 'center';
    this.Sakana.ctx.textBaseline = 'middle';
    this.Sakana.ctx.fillText(text, this.Sakana.width / 2, this.Sakana.height / 2 + 24);
  }
  run(file, keys) {
    console.log('[Sakana] Loading file: '+file.name)
    const mspf = 1000 / this.framerate; // Convert from FPS to MsPF (Miliseconds per Frame)
    const _this = this;
    setInterval(function(){
      if (_this.loading) {
        _this._drawTextScreen('Loading.' + '.'.repeat(Math.floor(Date.now() / 1000) % 3));
      } else if (_this.paused) {
        _this._drawTextScreen('Paused');
      } else {
        // game
      }
    }, mspf)

    // Decode file
    Decode(file, keys)
      .then(data => {
        this.data = data;
        this.loading = false;
      })
      .catch(err => {
        console.error('[Sakana] Error while decoding, error: '+err)
      })
  }
  pause() { this.paused = true }
  resume() { this.paused = false }
  fullscreen() { this.Sakana.root.requestFullscreen() }
}
