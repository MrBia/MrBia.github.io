class LogoScreen extends Phaser.Scene {
    constructor() {
        super("LogoScreen");
        // wrong if this.startShow() here
    }

    create() {
        this._width = this.game.screenBaseSize.width;
        this._height = this.game.screenBaseSize.height;
        this.startShow();
    }

    startShow() {
        this._background = this.add.sprite(this._width / 2, this._height / 2, 'spritesheet_white_bg');
        this._logo = new Logo(this, this._width / 2 + 50, 0);

        this.tweens.add({
            targets: this._logo._sprite,
            x: this._width / 2 + 50,
            y: this._height / 2,
            duration: 400,

            onComplete: function() {
                // only for change the screen
                this.tweens.add({
                    targets: this._logo._sprite,
                    x: this._width / 2 + 50,
                    y: this._height / 2,
                    duration: 1000,
                    onComplete: function() {
                        this.scene.start('MainMenu');
                    }.bind(this)
                });
            }.bind(this)
        });
    }
}