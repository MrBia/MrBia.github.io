class SettingsButton extends BaseButton {
    constructor(scene, x, y) {
        super(scene, x, y, "spritesheet_settingsbutton");

    }

    handleClick() {
        this._scene.initSettingsPopup();
    }
}