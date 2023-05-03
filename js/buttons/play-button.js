class PlayButton extends BaseButton {
    constructor(scene, x, y) {
        super(scene, x, y, "spritesheet_playbutton");

        this.setScale(0.6, 0.6);
    }

    handleClick() {
        this._scene.startGamePlay();
    }
}