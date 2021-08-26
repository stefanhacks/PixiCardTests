import * as PIXI from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH, Scene, emojis } from '../GameConstants';

export default class Words extends PIXI.Container implements Scene {
  fontSize = 42;

  style = new PIXI.TextStyle({
    fontSize: this.fontSize,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: ['#ffffff', '#dddddd'], // gradient
    stroke: '#0b2247',
    strokeThickness: 9,
    lineJoin: 'round',
  });

  start(app: PIXI.Application): void {
    const text = this.makeText();
    this.setLoop(app, text);
  }

  private makeText(): PIXI.Text {
    const text = new PIXI.Text('Spinning up...', this.style);

    text.anchor.set(0.5, 0.5);
    text.x = GAME_WIDTH / 2;
    text.y = GAME_HEIGHT / 2;

    this.addChild(text);
    return text;
  }

  private setLoop(app: PIXI.Application, text: PIXI.Text): void {
    let timer = 0;

    const textHolder = text;
    const interval = 2 * 60;
    const change = (delta: number) => {
      timer += delta;

      if (timer > interval) {
        timer = 0;

        const a = this.getImageOrText();
        const b = this.getImageOrText();
        const c = this.getImageOrText();

        textHolder.style.fontSize = this.fontSize / 4 + this.fontSize * Math.random() * 2;
        textHolder.text = `${a} ${b} ${c}`;
      }
    };

    app.ticker.add(change);
  }

  private getImageOrText(): String {
    const chance = Math.random();
    if (chance > 0.5) {
      return 'PixiJS';
    }

    return emojis[Math.floor(Math.random() * emojis.length)];
  }
}
