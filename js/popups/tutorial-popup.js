class TutorialPopup extends Popup {
    constructor(scene, x, y, parent) {
        super(scene, x, y, parent);

        this._scene = scene;
    }

    initElements() {
        this._panel = new Panel(this._scene, this._x, this._y);
        this._title = this._scene.add.text(this._panel.position().x, this._panel.position().y - 210, 'TUTORIAL', { fontFamily: 'molot', fontSize: 45, color: 'white' });
        this._btnSkip = new SkipButton(this._scene, this._panel._sprite.x, this._panel._sprite.y + 190, this);

        var color = 'white';
        this._content1 = this._scene.add.text(this._panel.position().x, this._panel.position().y - 100, '* Behind the box is a kitten,', { fontFamily: 'molot', fontSize: 30, color: color });
        this._content2 = this._scene.add.text(this._panel.position().x, this._panel.position().y - 60, 'you need to observe the box', { fontFamily: 'molot', fontSize: 30, color: color });
        this._content3 = this._scene.add.text(this._panel.position().x, this._panel.position().y - 20, 'is shuffling and then click on', { fontFamily: 'molot', fontSize: 30, color: color });
        this._content4 = this._scene.add.text(this._panel.position().x, this._panel.position().y + 20, 'the box containing the kitten.', { fontFamily: 'molot', fontSize: 30, color: color });
        this._content5 = this._scene.add.text(this._panel.position().x, this._panel.position().y + 80, '* After that, you win and', { fontFamily: 'molot', fontSize: 30, color: color });
        this._content6 = this._scene.add.text(this._panel.position().x, this._panel.position().y + 120, 'play next level.', { fontFamily: 'molot', fontSize: 30, color: color });

        this._elements.push(this._panel);
        this._elements.push(this._btnSkip);
        this._elements.push(this._title);
        this._elements.push(this._content1);
        this._elements.push(this._content2);
        this._elements.push(this._content3);
        this._elements.push(this._content4);
        this._elements.push(this._content5);
        this._elements.push(this._content6);

        this._title.setOrigin(0.5, 0.5);
        this._content1.setOrigin(0.5, 0.5);
        this._content2.setOrigin(0.5, 0.5);
        this._content3.setOrigin(0.5, 0.5);
        this._content4.setOrigin(0.5, 0.5);
        this._content5.setOrigin(0.5, 0.5);
        this._content6.setOrigin(0.5, 0.5);

        var zIndex = 100;
        this._panel.zIndex(zIndex);
        this._btnSkip.zIndex(zIndex + 1);
        this._title.setDepth(zIndex + 1);
        this._content1.setDepth(zIndex + 1);
        this._content2.setDepth(zIndex + 1);
        this._content3.setDepth(zIndex + 1);
        this._content4.setDepth(zIndex + 1);
        this._content5.setDepth(zIndex + 1);
        this._content6.setDepth(zIndex + 1);

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