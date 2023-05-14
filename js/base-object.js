/**
 * This is base object
 * All object in game must be extend from this
 */

class BaseObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, spriteSheet) {
        super(scene, x, y);

        this.initData();

        this._sprite = scene.add.sprite(x, y, spriteSheet);
        this._scene = scene;
    }

    initData() {
        this._scaleX = 1;
        this._scaleY = 1;
        this._sprite = null;
        this._childObject = [];
        this._id = null;
    }

    getScale() {
        return {
            x: this._scaleX,
            y: this._scaleY
        };
    }

    setScale(scaleX, scaleY) {
        this._scaleX = scaleX;
        this._scaleY = scaleY;

        if(this._sprite) {
            this._sprite.setScale(scaleX, scaleY);
        }
    }

    position() {
        if(!this._sprite) return null;

        return {
            x: this._sprite.x,
            y: this._sprite.y    
        }
    }

    setPosition(posX, posY) {
        if(this._sprite) {
            this._sprite.x = posX;
            this._sprite.y = posY;
        }
    }

    size() {
        if(!this._sprite) return null;

        return {
            x: this._sprite.width * this._scaleX,
            y: this._sprite.height * this._scaleY
        }
    }

    addChild(object) {
        this._childObject.push(object)
    }

    zIndex(zIndex) {
        if(this._sprite) {
            this._sprite.setDepth(zIndex);
        }
    }

    kill() {
        if(this._childObject) {
            while(this._childObject.length > 0) {
                var obj = this._childObject.pop();
                if(obj._sprite) {
                    obj._sprite.destroy();
                }
                else {
                    obj.destroy();
                }
            }
        }

        if(this._sprite) {
            this._sprite.destroy();
        }
    }
}