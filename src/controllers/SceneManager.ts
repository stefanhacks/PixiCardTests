import * as PIXI from 'pixi.js';
import MainMenu from '../scenes/MainMenu';
import Cards from '../scenes/Cards';
import Words from '../scenes/Words';
import SWITCH_SCENE from '../scenes/SceneEvents';
import { BUTTONS, Scene } from '../GameConstants';

type SceneConstructor = new (app: PIXI.Application) => PIXI.Container;

export default class SceneManager {
  private app: PIXI.Application;

  private scenes: Record<string, PIXI.Container> = {};

  private currentScene: Scene;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.currentScene = this.addNewScene('MainMenu', MainMenu) as Scene;
    this.currentScene.visible = true;
    this.currentScene.on(SWITCH_SCENE, (target: BUTTONS) => this.switchToScene(target));

    this.addNewScene('Card', Cards);
    this.addNewScene('Word', Words);
  }

  private getScene(key: string): undefined | PIXI.Container {
    return this.scenes[key];
  }

  public addNewScene(key: string, SceneComp: SceneConstructor): false | PIXI.Container {
    if (this.getScene(key) === undefined) {
      const newScene = new SceneComp(this.app);
      this.scenes[key] = newScene;
      this.app.stage.addChild(newScene);
      newScene.visible = false;
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
    this.currentScene = target as Scene;
    this.currentScene.start(this.app);

    return true;
  }
}
