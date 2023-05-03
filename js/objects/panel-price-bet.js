class PanelPriceBet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, totalCoin) {
        super(scene, x, y);
     
        this._x = x;
        this._y = y;
        this._scene = scene;
        this._levelAdd = 10;
        this._minPrice = 10;
        this._maxPrice = totalCoin;
        this._priceBet = 50;
        this._enableSet = true;
        this.initItems();
    }

    initItems() {
        this._btnSub = new SubButton(this._scene, this._x - 130, this._y, this);
        this._btnPlus = new PlusButton(this._scene, this._x + 130, this._y, this);
        this._framePrice = new FramePrice(this._scene, this._x, this._y);
        this._priceText = this._scene.add.text(this._x, this._y, this._priceBet, { fontFamily: 'molot', fontSize: 40, color: 'yellow' });
        this._priceText.setOrigin(0.5, 0.5);
    }

    updatePriceText() {
        this._priceText.setText(this._priceBet);
    }

    getPriceBet() {
        return this._priceBet;
    }

    enableSet() {
        this._enableSet = true;
    }

    disableSet() {
        this._enableSet = false;
    }

    onClickPlus() {
        if(!this._enableSet) return;
        if(this._priceBet >= this._maxPrice) return;
        this._priceBet += this._levelAdd;
        this.updatePriceText();
        this.checkCanSpin();
    }

    onClickSub() {
        if(!this._enableSet) return;
        if(this._priceBet <= this._minPrice) return;
        this._priceBet -= this._levelAdd;
        this.updatePriceText();
        this.checkCanSpin();
    }

    checkSelected() {
        if(this._priceBet > 0) return true;
        return false;
    }

    checkCanSpin() {
        if(this._scene) this._scene.checkConditionToSpin();
    }
}