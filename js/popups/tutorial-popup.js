class TutorialPopup extends Popup {
    constructor(scene, x, y, parent, zIndex) {
        super(scene, x, y, parent);

        this._zIndex = zIndex;
        this._scene = scene;
        this.initZindex();
    }

    initElements() {
        var colorTitle = 'yellow';
        var colorContent = 'red';
        this._panel = new Panel(this._scene, this._x, this._y);
        this._title = this._scene.add.text(this._panel.position().x - 50, this._panel.position().y - 280, TUTORIAL.Title, { fontFamily: 'molot', fontSize: 45, color: colorTitle });
        this._btnSkip = new SkipButton(this._scene, this._panel._sprite.x, this._panel._sprite.y + 230, this);

        this._content1 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y - 160, TUTORIAL.Tu1, { fontFamily: 'molot', fontSize: 30, color: colorContent });
        this._content2 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y - 120, TUTORIAL.Tu1_1, { fontFamily: 'molot', fontSize: 30, color: colorContent });
        this._content3 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y - 80, TUTORIAL.Tu2, { fontFamily: 'molot', fontSize: 30, color: colorContent });
        this._content4 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y - 40, TUTORIAL.Tu2_1, { fontFamily: 'molot', fontSize: 30, color: colorContent });
        this._content5 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y + 0, TUTORIAL.Tu3, { fontFamily: 'molot', fontSize: 30, color: colorContent });
        this._content6 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y + 40, TUTORIAL.Tu3_1, { fontFamily: 'molot', fontSize: 30, color: colorContent });
        this._content7 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y + 80, TUTORIAL.Tu4, { fontFamily: 'molot', fontSize: 30, color: colorContent });
        this._content8 = this._scene.add.text(this._panel.position().x - 165, this._panel.position().y + 120, TUTORIAL.Tu4_1, { fontFamily: 'molot', fontSize: 30, color: colorContent });

        this._elements.push(this._panel);
        this._elements.push(this._btnSkip);
        this._elements.push(this._title);
        this._elements.push(this._content1);
        this._elements.push(this._content2);
        this._elements.push(this._content3);
        this._elements.push(this._content4);
        this._elements.push(this._content5);
        this._elements.push(this._content6);
        this._elements.push(this._content7);
        this._elements.push(this._content8);

        this.setScaleElements(0.1);
    }

    initZindex() {
        this._panel.zIndex(this._zIndex);
        this._title.setDepth(this._zIndex + 1);
        this._btnSkip.zIndex(this._zIndex + 1);
        this._content1.setDepth(this._zIndex + 1);
        this._content2.setDepth(this._zIndex + 1);
        this._content3.setDepth(this._zIndex + 1);
        this._content4.setDepth(this._zIndex + 1);
        this._content5.setDepth(this._zIndex + 1);
        this._content6.setDepth(this._zIndex + 1);
        this._content7.setDepth(this._zIndex + 1);
        this._content8.setDepth(this._zIndex + 1);
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