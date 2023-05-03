class SpinButton extends BaseButton {
    constructor(scene, x, y, parent) {
        super(scene, x, y, "spritesheet_spin_button");

        this._parent = parent;
        this._enableSpin = true;
        this.setScale(0.5, 0.5);
        this.disableSpin();
    }

    handleClick() {
        if(!this._enableSpin) return;
        if(this._parent) {
            this._parent.onClickSpin();
        }
    }

    enableSpin() {
        this.setAlpha(1);
        this._enableSpin = true;
    }

    disableSpin() {
        this.setAlpha(0.8);
        this._enableSpin = false;
    }
}