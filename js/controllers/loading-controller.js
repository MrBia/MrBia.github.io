class LoadingScreenController extends Phaser.Scene {
    constructor() {
        super("LoadingScreen");

        this._title = null;
        this._loadingPercent = null;
        this._time = 2.5;
    }

    preload() {

    }

    create() {
        this.width = this.game.screenBaseSize.width;
        this.height = this.game.screenBaseSize.height;

        this.background = new Background(this, this.width / 2, this.height / 2);

        this._logo = this.add.sprite(this.width / 2, this.height / 2 - 50, 'spritesheet_title');

        var position = 150;
        var frame = this.add.image(this.width / 2, this.height / 2 + position, 'image_countdownframe');
        frame.setOrigin(0.5, 0.5);
        this._bar = this.add.image(this.width / 2, this.height / 2 + position, 'image_countdownbar');
        this._bar.setOrigin(0.5, 0.5);
        frame.setScale(0.5, 0.5);
        this._bar.setScale(0.5, 0.5);
        this._widthBar = this._bar.width;
        this._heightBar = this._bar.height;
        this._currentWidth = 0;
        this._bar.setCrop(0, 0, this._currentWidth, this._heightBar);

        var loadingText = this.add.text(this.width / 2, this.height / 2 + 200, 'LOADING', { fontFamily: 'molot', fontSize: 50, color: 'yellow' });
        loadingText.setOrigin(0.5, 0.5)
    }

    update(time, delta) {
        this.updateBackground(time, delta);
        this.updateCountDown();
    }

    updateBackground(time, delta) {
        var cameraWidth = this.cameras.main.width;
        var cameraHeight = this.cameras.main.height;
        this.background.update(time, delta, cameraWidth, cameraHeight);
    }

    updateCountDown() {
        this._currentWidth += (this._widthBar / (this._time * 10));
        this._bar.setCrop(0, 0, this._currentWidth, this._heightBar);

        if(this._currentWidth > this._widthBar) {
            this.scene.start('MainMenu');
        }
    }
}