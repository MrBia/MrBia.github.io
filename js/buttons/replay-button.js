class ReplayButton extends BaseButton {
    constructor(scene, x, y, parent) {
        super(scene, x, y, "spritesheet_replaybutton");

        this._parent = parent;
        this.setScale(0.5, 0.5);
    }

    handleClick() {
        if(this._parent) {
            this._parent.replayLevel();
        }
    }
}