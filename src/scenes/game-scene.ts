import { GameObjects } from "phaser";
import { defaultFontStyle, defaultIndent } from "../common";

export class GameScene extends Phaser.Scene {
  private rect: Phaser.GameObjects.Rectangle;
  private counter = 0;
  private txt: GameObjects.Text;
  private countdownTxt: GameObjects.Text

  private gameDuration = 30000 // 30 seconds

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  private timedEvent: Phaser.Time.TimerEvent
  init(): void {

    // Create the text object
    this.txt = this.add.text(defaultIndent, defaultIndent, `you pressed ${this.counter} times`, defaultFontStyle(this.cameras.main.width));

    this.countdownTxt = this.add.text(defaultIndent, this.cameras.main.height - 100, '', defaultFontStyle(this.cameras.main.width))

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

    this.timedEvent = this.time.delayedCall(this.gameDuration, this.timeIsUp, [], this);
  }


  timeIsUp() {
    this.rect.setVisible(false)
  }

  update(): void {
    const seconds = this.gameDuration / 1000 * this.timedEvent.getProgress()
    this.countdownTxt.setText(`seconds: ${seconds.toFixed(2)}`);
    this.updateStatsText()

  }

  private incCounter(): void {
    this.counter++;
  }

  private updateStatsText(): void {
    const seconds = this.gameDuration / 1000 * this.timedEvent.getProgress()
    const speed = this.counter / (seconds)
    this.txt.setText(`you pressed ${this.counter} times\n\nspeed: ${speed.toFixed(2)} clicks per second!`);
  }

  private handlePointerDown(pointer: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]): void {
    // Check if the rectangle is present in the currentlyOver array
    const isOverRect = currentlyOver.some(obj => obj === this.rect);
    if (isOverRect) {
      this.incCounter();
    }
  }

}
