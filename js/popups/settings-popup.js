class SettingsPopup extends Popup {
    constructor(scene, x, y, parent) {
        super(scene, x, y, parent);

        this._scene = scene;
    }

    initElements() {
        this._panel = new Panel(this._scene, this._x, this._y);
        this._btnHome = new HomeButton(this._scene, this._panel._sprite.x, this._panel._sprite.y + 150, this);

        this._elements.push(this._panel);
        this._elements.push(this._btnHome);

        this.setScaleElements(0.1);
    }

    remove() {
        while(this._elements.length > 0) {
            var elem = this._elements.pop();
            elem._sprite.destroy(true);
        }

        this._scene.hideSettingsPopup();
    }
}