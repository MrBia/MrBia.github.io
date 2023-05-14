class PauseButton extends BaseButton {
    constructor(scene, x, y) {
        super(scene, x, y, "spritesheet_pausebutton");

        this.setScale(0.7, 0.7);
    }

    handleClick() {
        this._scene.initPausePopup();
    }
}