class Popup extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, parent) {
        super(scene, x, y, "");

        this._name = 'popup';
        this._scene = scene;
        this._parent = parent;
        this.initData(x, y);
        this.initElements();
    }

    initData(x, y) {
        // INIT DATA HERE
        this._elements = [];
        this._panel = null;
        this._btnSfx = null;
        this._btnBgm = null;
        this._btnHome = null;
        this._timeEffect = 170;
        this._x = x;
        this._y = y;
    }

    initElements() {

    }

    show(delay) {
        for(var i = 0; i < this._elements.length; i++) {
            var elem = this._elements[i];
            var scale = null;
            if(elem.getScale){
                var scale = elem.getScale();
            }
            
            if(elem._sprite) {
                this._scene.tweens.add({
                    targets: elem._sprite,
                    x: elem._sprite.x,
                    y: elem._sprite.y + 1000,
                    scaleX: scale ? scale.x : 1,
                    scaleY: scale ? scale.y : 1,
                    duration: this._timeEffect,
                    delay: delay,
    
                    onComplete: function() {
                        // console.log('done !!');
                    }
                });
            }
            else {
                this._scene.tweens.add({
                    targets: elem,
                    x: elem.x,
                    y: elem.y + 1000,
                    scaleX: scale ? scale.x : 1,
                    scaleY: scale ? scale.y : 1,
                    duration: this._timeEffect,
                    delay: delay,
    
                    onComplete: function() {
                        // console.log('done !!');
                    }
                });
            }
        }
    }

    hide() {
        for(var i = 0; i < this._elements.length; i++) {
            var elem = this._elements[i];
            if(elem._sprite) {
                this._scene.tweens.add({
                    targets: elem._sprite,
                    x: elem._sprite.x,
                    y: elem._sprite.y - 1000,
                    scaleX: 0.1,
                    scaleY: 0.1,
                    duration: this._timeEffect,
    
                    onComplete: function() {
                        if(0 == arguments[0])
                        {
                            this.remove();
                        }
                    }.bind(this, i)
                });
            }
            else {
                this._scene.tweens.add({
                    targets: elem,
                    x: elem.x,
                    y: elem.y - 1000,
                    scaleX: 0.1,
                    scaleY: 0.1,
                    duration: this._timeEffect,
    
                    onComplete: function() {
                        if(0 == arguments[0])
                        {
                            this.remove();
                        }
                    }.bind(this, i)
                });
            }
        }
    }

    remove() {
        
    }

    setScaleElements(scale) {
        for( var i = 0; i < this._elements.length; i++ ) {
            var elem = this._elements[i];
            if(null != elem) {
                if(elem._sprite) elem._sprite.setScale(scale, scale);
            }
        }
    }
}