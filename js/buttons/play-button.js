class PlayButton extends BaseButton {
    constructor(scene, x, y) {
        super(scene, x, y, "spritesheet_playbutton");

    }

    handleClick() {
        this._scene.startGamePlay();
    }
}