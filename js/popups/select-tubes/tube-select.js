class TubeSelect extends BaseObject {
    constructor(scene, x, y, parent, price, type, spriteSheet) {
        super(scene, x, y, spriteSheet);

        this._scene = scene;
        this._text = null;
        this._enableClick = true;
        this._parent = parent;
        this._price = price;
        this._type = type;
        this._wasBought = false;
        this._iconCoins = null;
        this._text = null;

        this.setScale(0.8, 0.8);
        this.initInteractive();
    }

    initInteractive() {
        this._sprite.setInteractive();
        this._sprite.on('pointerdown', this.onClicked.bind(this));
    }

    onClicked() {
        if(!this._enableClick) return;

        if(this._parent) {
            this._parent.selectTube(this);
        }
    }

    enable() {
        this._enableClick = true;
    }

    disable() {
        this._enableClick = false;
    }

    setState(wasBought) {
        wasBought = wasBought || false;

        this._wasBought = wasBought;

        if(wasBought) {
            this.setTransparent(1);
            this.hidePrice();
        }
        else {
            this.setTransparent(0.3);
            this.initPrice();
        }
    }

    initPrice() {
        this._iconCoins = new IconCoins(this._scene, -9999, -9999);
        this._text = this._scene.add.text(140, 40, this._price, { fontFamily: 'molot', fontSize: 30, color: '#61c200'});
    
        this._iconCoins._sprite.setScale(0.3);
        this._iconCoins._sprite.setDepth(3);
        this._text.setDepth(3);
    }

    updatePositionPrice() {
        if(this._iconCoins) {
            this._iconCoins._sprite.x = this._sprite.x - 20;
            this._iconCoins._sprite.y = this._sprite.y + 5;
        }
        if(this._text) {
            this._text.x = this._sprite.x - 0;
            this._text.y = this._sprite.y - 10;
        }
    }

    setWasBought() {
        this._wasBought = true;
        this.setTransparent(1);
    }

    isUnlock() {
        return this._wasBought;
    }

    setTransparent(alpha) {
        this._sprite.alpha = alpha;
    }

    getPrice() {
        return this._price;
    }

    getType() {
        return this._type;
    }

    hidePrice() {
        if(this._iconCoins) this._iconCoins._sprite.destroy();
        if(this._text) this._text.destroy();

        this._iconCoins = null;
        this._text = null;
    }
}