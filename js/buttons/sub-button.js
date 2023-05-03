class SubButton extends BaseButton {
    constructor(scene, x, y, parent) {
        super(scene, x, y, "spritesheet_sub_button");

        this._parent = parent;
        this.setScale(0.3, 0.3);
    }

    handleClick() {
        if(this._parent) {
            this._parent.onClickSub();
        }
    }
}