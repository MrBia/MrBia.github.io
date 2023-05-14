class LosePopup extends Popup {
    constructor(scene, x, y, parent) {
        super(scene, x, y, parent);

        this._scene = scene;
    }

    initElements() {
        this._panel = new Panel(this._scene, this._x, this._y);
        this._title = this._scene.add.text(this._panel.position().x, this._panel.position().y - 210, 'Try Again!', { fontFamily: 'molot', fontSize: 55, color: 'white' });
        this._content = this._scene.add.text(this._panel.position().x, this._panel.position().y, 'Do you want to try again!', { fontFamily: 'molot', fontSize: 35, color: 'green' });
        this._btnHome = new HomeButton(this._scene, this._panel.position().x + 80, this._panel.position().y + 180, this);
        this._btnReplay = new ReplayButton(this._scene, this._panel.position().x - 80, this._panel.position().y + 180, this);
        
        this._title.setOrigin(0.5, 0.5);
        this._content.setOrigin(0.5, 0.5);
        this._btnHome.setScale(0.35, 0.35);
        this._btnReplay.setScale(0.35, 0.35);

        this._elements.push(this._panel);
        this._elements.push(this._title);
        this._elements.push(this._content);
        this._elements.push(this._btnHome);
        this._elements.push(this._btnReplay);

        var zIndex = 150;
        this._panel.zIndex(zIndex);
        this._title.setDepth(zIndex + 1);
        this._content.setDepth(zIndex + 1);
        this._btnHome.zIndex(zIndex + 1);
        this._btnReplay.zIndex(zIndex + 1);

        this.setScaleElements(0.1);
    }

    remove() {
        while(this._elements.length > 0) {
            var elem = this._elements.pop();
            if(elem._sprite) {
                elem._sprite.destroy(true);
            }
            else {
                elem.destroy();
            }
        }
    }

    onClickHomeButton() {
        this.hide();
        this._scene.scene.start('MainMenu');
    }

    replayLevel() {
        this._scene.scene.start('GamePlay');
    }
}