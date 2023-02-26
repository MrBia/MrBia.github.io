class BaseButton extends BaseObject {
    constructor(scene, x, y, spriteSheet) {
        super(scene, x, y, spriteSheet);
        this._scene = scene;
        
        this._wasClicked = false;
        this._enableClick = true;

        this.initInteractive();
    }

    initInteractive() {
        this._sprite.setInteractive();
        this._sprite.on('pointerdown', this.onClicked.bind(this));
    }

    onClicked() {
        if(!this._enableClick) return;
        if(this._wasClicked) return;

        this._scene.tweens.add({
            targets: this._sprite,
            scaleX: this.getScale().x - 0.1,
            scaleY: this.getScale().y - 0.1,
            yoyo: true,
            duration: 100,

            onStart: function() {
                this._wasClicked = true;
            }.bind(this),

            onComplete: function() {
                this.handleClick();
                this._wasClicked = false;
            }.bind(this)
        });

        SoundHandler.getInstance().playButton();
    }

    enable() {
        this._enableClick = true;
    }

    disable() {
        this._enableClick = false;
    }
}