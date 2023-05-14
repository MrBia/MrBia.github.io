class SkipButton extends BaseButton {
    constructor(scene, x, y, parent) {
        super(scene, x, y, "spritesheet_nextlevelbutton");

        this._parent = parent;
        this.setScale(0.3, 0.3);
    }

    handleClick() {
        if(this._parent) {
            this._parent.onClickSkip();
        }
    }
}