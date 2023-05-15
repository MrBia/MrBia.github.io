class Box extends BaseObject {
    constructor(scene, x, y, index) {
        super(scene, x, y, "spritesheet_box");

        this.index = index;
        this.initInteractive();
        this._enableClick = true;
    }

    initInteractive() {
        this._sprite.setInteractive();
        this._sprite.on('pointerdown', this.onClicked.bind(this));
    }

    enableBox() {
        this._enableClick = true;
    }

    disableBox() {
        this._enableClick = false;
    }

    onClicked() {
        if(!this._enableClick) return;
        console.log('onclick');
        this.shakeCount = 0;
        SoundHandler.getInstance().playClickBox();
        this.shakeBox();
    }

    shakeBox()
    {
        var nextAngle = 15;
        var time = 80;
        this._scene.tweens.add({
            targets: this._sprite,
            angle: nextAngle,
            duration: time,
            
            onComplete: function() {
                var nextAngle = -15;
                this._scene.tweens.add({
                    targets: this._sprite,
                    angle: nextAngle,
                    duration: time,
                    
                    onComplete: function() {
                        this.shakeCount++;
                        if(this.shakeCount < 3)
                        {
                            this.shakeBox();
                        }
                        else {
                            this._scene.tweens.add({
                                targets: this._sprite,
                                angle: 0,
                                duration: time,
                                
                                onComplete: function() {
                                    this.shaking = false;
                                    this._scene.onChoseBox(this);
                                }.bind(this)
                            });
                        }
                    }.bind(this)
                });
            }.bind(this)
        });
    }
}