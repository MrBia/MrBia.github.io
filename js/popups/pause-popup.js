class PausePopup extends Popup {
    constructor(scene, x, y, parent) {
        super(scene, x, y, parent);

        this._name = 'pause-popup';
        this._scene = scene;
    }

    initElements() {
        this._panel = new Panel(this._scene, this._x, this._y);
        this._title = this._scene.add.text(this._panel.position().x - 45, this._panel.position().y - this._panel.size().y * 0.37, 'PAUSE', { fontFamily: 'molot', fontSize: 55, color: '#ff0000' });
        this._btnHome = new HomeButton(this._scene, this._panel.position().x, this._panel.position().y + 160, this);
        this._sound = new SoundButton(this._scene, this._panel._sprite.x, this._panel._sprite.y, this);
        this._continue = new ContinueButton(this._scene, this._panel.position().x + 110, this._panel.position().y + 160, this);
        this._replay = new ReplayButton(this._scene, this._panel.position().x - 110, this._panel.position().y + 160, this);

        this._elements.push(this._panel);
        this._elements.push(this._title);
        this._elements.push(this._btnHome);
        this._elements.push(this._sound);
        this._elements.push(this._continue);
        this._elements.push(this._replay);

        this.setScaleElements(0.1);
    }

    replayLevel() {
        if(this._scene) {
            this._scene.pauseAndReplayLevel();
        }
    }

    onClickHomeButton() {
        this.hide();
        this._scene.sceneStopped = true;
        this._scene.scene.start('MainMenu');
    }

    remove() {
        while(this._elements.length > 0) {
            var elem = this._elements.pop();
            if(elem._sprite) {
                elem._sprite.destroy(true);
            }
            else {
                elem.destroy(true);
            }
        }

        this._scene.hidePausePopup();
    }
}