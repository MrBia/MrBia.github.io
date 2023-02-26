class ShopButton extends BaseButton {
    constructor(scene, x, y, parent) {
        super(scene, x, y, "spritesheet_shopbutton");

        this._parent = parent;
        this.setScale(0.7, 0.7);
    }

    handleClick() {
        if(this._parent) {
            this._parent.onClickShopButton();
        }
    }
}