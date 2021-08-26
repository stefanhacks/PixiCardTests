import * as PIXI from 'pixi.js';
import MainMenu from '../scenes/MainMenu';
import Cards from '../scenes/Cards';
import Words from '../scenes/Words';
import Fire from '../scenes/Fire';
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
    this.addNewScene('Fire', Fire);
  }

  /**
   * Given key, returns a PIXI.Container from inner map. Could reach undefined.
   * @param key String provided to map scene to.
   * @returns Requested PIXI.Container, or undefined.
   */
  private getScene(key: string): undefined | PIXI.Container {
    return this.scenes[key];
  }

  /**
   * Given key and PIXI.Container custom constructor, instantiates and adds it to memory.
   * @param key String provided to map scene to.
   * @param SceneComp Constructor in a PIXI.Container that accepts PIXI.Application as arg.
   * @returns false if scene already exists in memory, the instantiated Container otherwise.
   */
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

  /**
   * Hides current scene and switches/starts requested one. Throws error if key isn't found.
   * @param key String provided to map to scene.
   * @returns true if scene is switched.
   */
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
