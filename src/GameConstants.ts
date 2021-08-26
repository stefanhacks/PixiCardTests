import * as PIXI from 'pixi.js';

export const GAME_WIDTH = 750;

export const GAME_HEIGHT = 1334;

export enum BUTTONS {
  CARD = 'Card',
  WORD = 'Word',
  FIRE = 'Fire',
}

export interface Scene extends PIXI.Container {
  start(app: PIXI.Application): void;
}
