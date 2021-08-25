import * as PIXI from 'pixi.js';
import MainMenu from '../scenes/MainMenu';
import SWITCH_SCENE from '../scenes/SceneEvents';
import { BUTTON_PURPOSE } from '../GameConstants';

export default class SceneManager {
  private app: PIXI.Application;

  private scenes: Record<string, PIXI.Container> = {};

  private currentScene: PIXI.Container;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.currentScene = this.addNewScene('MainMenu', MainMenu) as PIXI.Container;
    this.currentScene.visible = true;

    this.currentScene.on(SWITCH_SCENE, (target: BUTTON_PURPOSE) => this.switchToScene(target));
  }

  private getScene(key: string): undefined | PIXI.Container {
    return this.scenes[key];
  }

  public addNewScene(key: string, Scene: new () => PIXI.Container): false | PIXI.Container {
    if (this.getScene(key) === undefined) {
      const newScene = new Scene();
      this.scenes[key] = newScene;
      this.app.stage.addChild(newScene);
      return newScene;
    }

    return false;
  }

  public switchToScene(key: string): boolean {
    if (this.getScene(key) === undefined) {
      throw new Error(`Scene not found at key: ${key}`);
    }

    this.currentScene.visible = false;

    const target = this.scenes[key];
    target.visible = true;
    this.currentScene = target;

    return true;
  }
}
