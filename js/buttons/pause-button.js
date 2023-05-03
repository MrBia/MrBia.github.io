class PauseButton extends BaseButton {
    constructor(scene, x, y) {
        super(scene, x, y, "spritesheet_pausebutton");

        this.setScale(0.4, 0.4);
    }

    handleClick() {
        this._scene.initPausePopup();
    }
}