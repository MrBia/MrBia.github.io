// BALL_TYPES: define in data.js

var BALLTWEEN = {
    distance: 50,

    Idle: 0.27,

    // SCALE BELOW MUST REFS FROM Idle
    TweenUp: {
        scaleX: 0.25,
        scaleY: 0.3
    },

    TweenDown: {
        scaleX: 0.3,
        scaleY: 0.25
    },

    TweenStop: {
        scaleX: 0.27,
        scaleY: 0.27
    }
}

class Ball extends BaseObject {
    constructor(scene, x, y, spriteSheet) {
        super(scene, x, y, spriteSheet);

        this._scene = scene;
        this.initData();
        this.initScale();
    }

    initData() {
        this._isEnableUpdatePosition = true;
        this.setTypeNone();
    }

    initScale() {
        this.setScale(BALLTWEEN.Idle, BALLTWEEN.Idle);
    }

    getType() {
        return this._type;
    }

    getSprite() {
        return this._sprite;
    }

    isSameType(ball) {
        var retVal = false;
        if(this._type == ball.getType()) retVal = true;

        return retVal;
    }

    effect() {
        // TWEEN POSITION
        this.timeEffect = 80;
        this.disableUpdatePosition();
        this._scene.tweens.add({
            targets: this._sprite,
            y: this.position().y - BALLTWEEN.distance,
            scaleX: BALLTWEEN.TweenUp.scaleX,
            scaleY: BALLTWEEN.TweenUp.scaleY,
            duration: this.timeEffect,

            onStart: function() {
                // console.log(this.sprite.y)
            }.bind(this),

            onComplete: function() {
                this._scene.tweens.add({
                    targets: this._sprite,
                    y: this.position().y + BALLTWEEN.distance,
                    scaleX: BALLTWEEN.TweenDown.scaleX,
                    scaleY: BALLTWEEN.TweenDown.scaleY,
                    duration: this.timeEffect,
                    
                    onComplete: function() {
                        this._scene.tweens.add({
                            targets: this._sprite,
                            y: this.position().y - BALLTWEEN.distance * 0.6,
                            scaleX: BALLTWEEN.TweenUp.scaleX,
                            scaleY: BALLTWEEN.TweenUp.scaleY,
                            duration: this.timeEffect,
                            
                            onComplete: function() {
                                this._scene.tweens.add({
                                    targets: this._sprite,
                                    y: this.position().y + BALLTWEEN.distance * 0.6,
                                    scaleX: BALLTWEEN.TweenDown.scaleX,
                                    scaleY: BALLTWEEN.TweenDown.scaleY,
                                    duration: this.timeEffect,
                                    
                                    onComplete: function() {
                                        this._scene.tweens.add({
                                            targets: this._sprite,
                                            y: this.position().y - BALLTWEEN.distance * 0.3,
                                            scaleX: BALLTWEEN.TweenUp.scaleX,
                                            scaleY: BALLTWEEN.TweenUp.scaleY,
                                            duration: this.timeEffect,
                                            
                                            onComplete: function() {
                                                this._scene.tweens.add({
                                                    targets: this._sprite,
                                                    y: this.position().y + BALLTWEEN.distance * 0.3,
                                                    scaleX: BALLTWEEN.TweenStop.scaleX,
                                                    scaleY: BALLTWEEN.TweenStop.scaleY,
                                                    duration: this.timeEffect,
                                                    
                                                    onComplete: function() {
                                                        this.enableUpdatePosition();
                                                        this.effectDone();
                                                    }.bind(this)
                                                });
                                            }.bind(this)
                                        });
                                    }.bind(this)
                                });
                            }.bind(this)
                        });
                    }.bind(this)
                });
            }.bind(this)
        });

        // // TWEEN SCALE
        // this._scene.tweens.add({
        //     targets: this.sprite,
        //     scaleX: 0.4,
        //     scaleY: 0.5,
        //     y: this.sprite.y - 30,
        //     duration: 2000,
        //     repeat: 2,
        //     yoyo: true
        // });
    }

    effectDone() {
        this._scene.moveBallFreeDone();
    }

    enableUpdatePosition() {
        this._isEnableUpdatePosition = true;
    }

    disableUpdatePosition() {
        this._isEnableUpdatePosition = false;
    }

    isCanUpdatePosition() {
        return this._isEnableUpdatePosition;
    }

    setTypeNone() {
        this._type = BALL_TYPES.NONE;
    }

    setTypeYellow() {
        this._type = BALL_TYPES.YELLOW;
    }

    setTypeRed() {
        this._type = BALL_TYPES.RED;
    }

    setTypeGreen() {
        this._type = BALL_TYPES.GREEN;
    }

    setTypeDarkGreen() {
        this._type = BALL_TYPES.DARKGREEN;
    }

    setTypeOrange() {
        this._type = BALL_TYPES.ORANGE;
    }

    setTypePink() {
        this._type = BALL_TYPES.PINK;
    }

    setTypeSeaBlue() {
        this._type = BALL_TYPES.SEABLUE;
    }

    setTypeSkyBlue() {
        this._type = BALL_TYPES.SKYBLUE;
    }

    setTypePurple() {
        this._type = BALL_TYPES.PURPLE;
    }

    setTypeGray() {
        this._type = BALL_TYPES.GRAY;
    }
}