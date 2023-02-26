class NextLevelButton extends BaseButton {
    constructor(scene, x, y, parent) {
        super(scene, x, y, "spritesheet_nextlevelbutton");

        this._parent = parent;
        this.setScale(0.5, 0.5);
    }

    handleClick() {
        if(this._parent) {
            this._parent.nextLevel();
        }
    }
}