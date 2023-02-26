class LoadingScreenController extends Phaser.Scene {
    constructor() {
        super("LoadingScreen");

        this._title = null;
        this._loadingPercent = null;
        this._percent = 0;
    }

    preload() {

    }

    create() {
        this.width = this.game.screenBaseSize.width;
        this.height = this.game.screenBaseSize.height;

        this.background = new Background(this, this.width / 2, this.height / 2);

        this._logo = this.add.sprite(this.width / 2, this.height / 2 - 50, 'spritesheet_title');
        this._logo.setScale(1);

        var textSize = 100;
        var text = this._percent + '%';
        this._loadingPercent = this.add.text(this.width / 2 - 50, this.height / 2 + 100, text, { fontFamily: 'molot', fontSize: textSize, color: '#4383c1' });
        this.add.text(this.width / 2 - 80, this.height / 2 + 200, 'Chargement', { fontFamily: 'molot', fontSize: 50, color: '#4383c1' });
    }

    update(time, delta) {
        this.updateBackground(time, delta);
        this.updatePercent(delta);
    }

    updateBackground(time, delta) {
        var cameraWidth = this.cameras.main.width;
        var cameraHeight = this.cameras.main.height;
        this.background.update(time, delta, cameraWidth, cameraHeight);
    }

    updatePercent(delta) {
        if(Math.floor(this._percent) < 100) {
            this._percent += (delta / 20);
            var text = Math.floor(this._percent) + '%';
            this._loadingPercent.setText(text);
        }
        else {
            this.scene.start('LogoScreen');
        }
    }
}