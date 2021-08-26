import * as PIXI from 'pixi.js';
import { GAME_WIDTH, Scene } from '../GameConstants';

export default class Cards extends PIXI.Container implements Scene {
  app?: PIXI.Application;

  cards: Array<PIXI.Sprite> = [];

  totalCards = 144;

  constructor() {
    super();
    this.sortableChildren = true;
  }

  public start(app: PIXI.Application): void {
    this.app = app;
    this.makeCards();
  }

  /**
   * Makes all cards on the deck.
   */
  private makeCards(): void {
    if (this.app === null) return;

    for (let i = 0; i < this.totalCards; i += 1) {
      this.cards.push(this.makeSingleCard(i));
    }
  }

  /**
   * Makes a single card and readies it for animation.
   * @param i Number of the card in question. Used for timing.
   * @returns PIXI.Sprite, which is the instantiated card.
   */
  private makeSingleCard(i: number): PIXI.Sprite {
    const card = PIXI.Sprite.from('card');
    const originX = GAME_WIDTH / 2 - 200;
    const originY = 250 + i / 4;

    const app = this.app as PIXI.Application;

    card.anchor.set(0.5);
    card.x = originX;
    card.y = originY;

    let timer = 0;
    const delay = 60 + 60 * (this.totalCards - i);

    const move = (delta: number) => {
      timer += delta;

      if (timer > delay + 120) {
        card.zIndex = i - this.totalCards;
        app.ticker.remove(move);
      }

      if (timer > delay) {
        card.x = originX + Math.min((200 * (timer - delay)) / 60, 400);
        card.y = originY + Math.min((400 * (timer - delay)) / 60, 800);
      }
    };

    app.ticker.add(move);

    this.addChild(card);
    return card;
  }
}
