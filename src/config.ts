import { GameScene } from './scenes/game-scene';
import { MainMenuScene } from './scenes/main-menu-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Phaser Clicker Sample',
  version: '0.0.1',
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [ MainMenuScene, GameScene],
  // input: {
  //   keyboard: true
  // },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 300 }
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    // width: '80%',
    // height: '80%'
  },
  backgroundColor: '#d1d6de',
  render: { antialias: true }
};
