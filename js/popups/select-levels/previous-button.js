class PreviousButton extends BaseButton {
    constructor(scene, x, y, parent) {
        super(scene, x, y, "spritesheet_previous_button");

        this._parent = parent;
        this.setScale(0.5, 0.5);
    }

    handleClick() {
        if(this._parent) {
            this._parent.showPrePage();
        }
    }
}