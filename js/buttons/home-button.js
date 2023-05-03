class HomeButton extends BaseButton {
    constructor(scene, x, y, parent) {
        super(scene, x, y, "spritesheet_homebutton");

        this._parent = parent;
        this.setScale(0.4, 0.4);
    }

    handleClick() {
        if(this._parent) {
            this._parent.onClickHomeButton();
        }
    }
}