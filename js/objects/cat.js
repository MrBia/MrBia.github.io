class Cat extends BaseObject {
    constructor(scene, x, y) {
        super(scene, x, y, "spritesheet_cat");

        this.showPos = this.position().y;
    }

    moveToPosition(item) {
        // ig.game.inProgress = true;
        // ig.soundHandler.sfxPlayer.play('hide');
        this._scene.tweens.add({
            targets: this._sprite,
            x: item.position().x,
            y: item.position().y - 20,
            duration: 500,
            
            onComplete: function() {
                this._sprite.alpha = 0;
                this._scene.startGameplay();
            }.bind(this)
        });
    }

    showCat() {
        this._sprite.alpha = 1;

        this._scene.tweens.add({
            targets: this._sprite,
            x: this.position().x,
            y: this.position().y,
            duration: 500,

            onComplete: function() {
                this._sprite.alpha = 1;
            }.bind(this)
        });

        this._scene.tweens.add({
            targets: this._sprite,
            x: this.position().x,
            y: this.showPos,
            duration: 500,

            onComplete: function() {
                this._sprite.alpha = 1;
                
                if(this._scene.isCorrect) {
                    this._scene.nextRound();
                }
            }.bind(this)
        });
    }

    forceToPosition(item) {
        this.setPosition(item.position().x, item.position().y - 20);
    }
}