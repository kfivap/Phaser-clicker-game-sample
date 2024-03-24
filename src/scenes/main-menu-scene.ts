import { defaultFontStyle, defaultIndent } from "../common";

export class MainMenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private startGameKey: keyof typeof Phaser.Input.Keyboard.KeyCodes = 'SPACE';
  private rect: Phaser.GameObjects.Rectangle;

  constructor() {
    super({
      key: 'MainMenuScene'
    });
  }

  create(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes[this.startGameKey]
    );
    this.startKey.isDown = false;

    this.add.text(defaultIndent, defaultIndent, 'Press as many times as you can on red square in 30 seconds', defaultFontStyle(this.cameras.main.width));

    // Center the rectangle relative to the entire canvas
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    const rectSize = this.cameras.main.height / 100 * 40

    // Create the rectangle with dynamic position
    this.rect = new Phaser.GameObjects.Rectangle(this, centerX, centerY, rectSize, rectSize, 0xff0000); // Color: Red
    this.add.existing(this.rect);

    // Make the rectangle interactive
    this.rect.setInteractive();

    // Listen for pointer events on the rectangle
    this.input.on('pointerdown', this.handlePointerDown, this);
  }


  private handlePointerDown(pointer: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]): void {
    // Check if the rectangle is present in the currentlyOver array
    const isOverRect = currentlyOver.some(obj => obj === this.rect);
    if (isOverRect) {
      this.scene.start('GameScene')
    }
  }

}
