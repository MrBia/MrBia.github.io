class WinPopup extends Popup {
    constructor(scene, x, y, parent) {
        super(scene, x, y, parent);

        this._scene = scene;
    }

    initElements() {
        this._panel = new Panel(this._scene, this._x, this._y);
        this._title = this._scene.add.text(this._panel.position().x - 45 * 2, this._panel.position().y - this._panel.size().y * 0.37, 'Bien joué!', { fontFamily: 'molot', fontSize: 55, color: 'red' });
        this._btnHome = new HomeButton(this._scene, this._panel.position().x, this._panel.position().y + 160, this);
        this._btnNextLevel = new NextLevelButton(this._scene, this._panel.position().x + 110, this._panel.position().y + 160, this);
        this._btnReplay = new ReplayButton(this._scene, this._panel.position().x - 110, this._panel.position().y + 160, this);
        this._iconCoin = new IconCoins(this._scene, this._panel.position().x - 40, this._panel.position().y);
        this._iconCoin.setScale(0.9, 0.9);
        this._textTotalCoin = this._scene.add.text(this._panel.position().x + 15, this._panel.position().y - 40, '+2', { fontFamily: 'molot', fontSize: 80, color: '#135614' });

        this._elements.push(this._panel);
        this._elements.push(this._title);
        this._elements.push(this._btnHome);
        this._elements.push(this._btnNextLevel);
        this._elements.push(this._btnReplay);
        this._elements.push(this._iconCoin);
        this._elements.push(this._textTotalCoin);

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

    nextLevel() {
        this._scene.nextLevel();
    }

    replayLevel() {
        this._scene.replayLevel();
    }
}