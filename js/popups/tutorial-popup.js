class TutorialPopup extends Popup {
    constructor(scene, x, y, parent) {
        super(scene, x, y, parent);

        this._scene = scene;
    }

    initElements() {
        this._panel = new Panel(this._scene, this._x, this._y);
        this._title = this._scene.add.text(this._panel.position().x - 80, this._panel.position().y - this._panel.size().y * 0.37, 'Didacticiel', { fontFamily: 'molot', fontSize: 45, color: '#ff0000' });
        this._btnSkip = new SkipButton(this._scene, this._panel._sprite.x, this._panel._sprite.y + 165, this);

        this._content1 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y - this._panel.size().y * 0.25, '   * Cliquez sur le tube pour', { fontFamily: 'molot', fontSize: 30, color: '#61c200' });
        this._content1_1 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y - this._panel.size().y * 0.18, '       obtenir la balle', { fontFamily: 'molot', fontSize: 30, color: '#61c200' });
        this._content2 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y - this._panel.size().y * 0.1, '   * Seules les boules de la même', { fontFamily: 'molot', fontSize: 30, color: '#61c200' });
        this._content2_1 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y - this._panel.size().y * 0.03, '       couleur peuvent être placées', { fontFamily: 'molot', fontSize: 30, color: '#61c200' });
        this._content2_2 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y + this._panel.size().y * 0.03, '       les unes sur les autres', { fontFamily: 'molot', fontSize: 30, color: '#61c200' });
        this._content3 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y + this._panel.size().y * 0.11, '   * Triez toutes les balles', { fontFamily: 'molot', fontSize: 30, color: '#61c200' });
        this._content3_1 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y + this._panel.size().y * 0.17, '       pour gagner', { fontFamily: 'molot', fontSize: 30, color: '#61c200' });

        this._elements.push(this._panel);
        this._elements.push(this._btnSkip);
        this._elements.push(this._title);
        this._elements.push(this._content1);
        this._elements.push(this._content1_1);
        this._elements.push(this._content2);
        this._elements.push(this._content2_1);
        this._elements.push(this._content2_2);
        this._elements.push(this._content3);
        this._elements.push(this._content3_1);

        this.setScaleElements(0.1);
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
    }

    onClickSkip() {
        if(this._scene) {
            this._scene.hideTutorial();
        }
    }
}