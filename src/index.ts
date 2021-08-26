import * as PIXI from 'pixi.js';
import SceneManager from './controllers/SceneManager';
import { GAME_HEIGHT, GAME_WIDTH } from './GameConstants';
import './style.css';

const app = new PIXI.Application({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
});

async function loadGameAssets(): Promise<void> {
  return new Promise((resolve, reject) => {
    const loader = PIXI.Loader.shared;
    loader.add('card', './assets/card.png');
    loader.add('particle', './assets/particle.png');

    loader.onComplete.once(() => resolve());
    loader.onError.once(() => reject());
    loader.load();
  });
}

function resizeCanvas(): void {
  const resize = () => {
    const { innerHeight } = window;
    const scale = innerHeight / GAME_HEIGHT;
    const width = GAME_WIDTH * scale;

    app.renderer.resize(width, innerHeight);
    app.stage.scale.x = width / GAME_WIDTH;
    app.stage.scale.y = innerHeight / GAME_HEIGHT;
  };

  resize();
  window.addEventListener('resize', resize);
}

window.onload = async (): Promise<void> => {
  await loadGameAssets();

  app.view.style.display = 'block';
  app.view.style.margin = '0 auto';
  document.body.appendChild(app.view);

  resizeCanvas();

  new SceneManager(app);
};
